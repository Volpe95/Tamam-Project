import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentCommunication } from '../../shared/ComponentCommunication.service';
import {sendPercentage} from '../calculate-percentages.interface';
import {serverOptions} from '../../shared/server.option';
import { utils } from 'src/utils/utils.service';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
  selector: 'app-percentage-records',
  templateUrl: './percentage-records.component.html',
  styleUrls: ['./percentage-records.component.css'],
})
export class PercentageRecordsComponent implements OnInit, OnDestroy {
  subscribtion: Subscription;
  percentageRecords : any[] = [] ;
  sendPercentageInfo: sendPercentage;
  constructor(
    private sendMsg: ComponentCommunication,
    private http: HttpClient,
    private utils: utils,
  ) {}

  fonts = {
    Amiri:{
      normal: "Amiri-Regular.ttf",
    }
  };

  convertEnToAr = this.utils.convertEnToAr;
  ngOnInit(): void {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.subscribtion = this.sendMsg.CalculatePercentageMsg.subscribe(
      (message) => {
        // receive the year and percentage from  calculateComponent
        if (!message) {
          // if the message is empty (just intiated the Comp.)
          return;
        }
        this.sendPercentageInfo = message ;
        console.log(message);
        this.http.get(serverOptions.serverUrl + '/' + 'calculatePercentage', {
          responseType: 'json',
          observe: 'response',
          params:{
            year:this.sendPercentageInfo.year,
            percentage: this.sendPercentageInfo.percentage,
          },
        }).subscribe(res => {
          var tmp : any = res.body;
          this.percentageRecords = tmp;
          this.percentageRecords = this.percentageRecords.sort((a , b) => {
            return (a.percentage < b.percentage? 1: -1);
          });
          console.log(this.percentageRecords);
          var tmpPercentageRecords = {} , studentIDs = [] ;
          for(let i = 0 ; i < this.percentageRecords.length; i++){

            if(!tmpPercentageRecords[this.percentageRecords[i].studentID]){
              tmpPercentageRecords[this.percentageRecords[i].studentID] = [] ;
              studentIDs.push(this.percentageRecords[i].studentID);
            }
            tmpPercentageRecords[this.percentageRecords[i].studentID].push(this.percentageRecords[i]);
          }

          this.percentageRecords = [] ;
          console.log(tmpPercentageRecords);
          for(let i = 0 ; i < studentIDs.length; i++){
            for(let j = 0 ; j < tmpPercentageRecords[studentIDs[i]].length; j++){
              this.percentageRecords.push(tmpPercentageRecords[studentIDs[i]][j]);
            }
          }
          console.log(this.percentageRecords);
          console.log(res);
        });
        this.sendMsg.SendCalculatePercentageMsg(null); // make the value empty again to avoid resending when re-intiating the Comp.
      }
    );

    /* TODO
      Use the data you have received to send GET request to the server to fetch students with the sent percentges
      after receiving the server response send display them in the HTML table Good luck with that :)
    */
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

  printResults(){
    console.log('Hello');
    console.log('This is the data to print' , this.percentageRecords);

    var headersInArabic = [
      {text: 'م' , alignment: 'center'},
      {text: 'العسكري الرقم' , alignment: 'center'},
      {text: 'الأسم' , alignment: 'center'},
      {text: 'الفرقة' , alignment: 'center'},
      {text: 'الماده اسم' , alignment: 'center'},
      {text: 'النسبة' , alignment: 'center'},
    ];
    var title = this.reverseString('نسب تخلفات الطلبة بالمحاضرات للسنة ' + this.convertEnToAr(this.sendPercentageInfo.year));
    var dd = {
      pageMargins: 15, // modify
      content: [
          { text: title , style: 'header' , alignment: 'center'},
          this.table(this.percentageRecords , headersInArabic),
      ],
      defaultStyle: {
        font: 'Amiri',
        fontSize: 10,
      }

    }
    console.log(dd);
    pdfMake.createPdf(dd , null , this.fonts).download();

  }

  reverseString(s){
    return s.split(' ').reverse().join(" ");
  }


   buildTableBody(data, headersInArabic) {

    function reverseString(s){
      return s.split(' ').reverse().join(" ");
    }

    var body = [];

    body.push(headersInArabic.reverse());

    var columnsInEnglish = [
      'studentID',
      'studentName',
      'Class',
      'subjectName',
      'percentage',
    ];
    var cnt = 1 ;
    var convertToArabic = this.convertEnToAr;
    var tmpPercentageInfo = this.sendPercentageInfo;
    data.forEach(function(row) {
        var dataRow = [{text: cnt++ , alignment: 'center'}];

        columnsInEnglish.forEach(function(column) {
          var txt: any ;
          if(column == 'Class')
            txt = reverseString(convertToArabic(tmpPercentageInfo.year)
            + row['className']
            +(row['classNo'] != 0 ? convertToArabic(row['classNo']).split('').reverse().join(''): ''));

          else if(column == 'subjectName')
            txt = row[column] + ' (' + row['subjectCode'] + ')' ;
          else if(column == 'percentage')
            txt = row[column].toString() + '%';
          else
            txt = reverseString(row[column].toString());

          dataRow.push({text: txt , alignment: 'center'});
        })

        body.push(dataRow.reverse());
    });

    return body;
  }

  table(data, columns) {
      return {
          table: {
              widths: 'auto',
              headerRows: 1,
              body: this.buildTableBody(data, columns),
              alignment: 'center',
              pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
                return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
             }
          }
      };
  }

}
