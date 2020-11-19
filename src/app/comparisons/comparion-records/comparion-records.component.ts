import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentCommunication } from 'src/app/shared/ComponentCommunication.service';
import { utils } from 'src/utils/utils.service';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
  selector: 'app-comparion-records',
  templateUrl: './comparion-records.component.html',
  styleUrls: ['./comparion-records.component.css']
})
export class ComparionRecordsComponent implements OnInit {

  fonts = {
    Amiri:{
      normal: "Amiri-Regular.ttf",
    }
  };

  subscription : Subscription;
  falseTamams : any[] = [] ;

  constructor(private sendMsg: ComponentCommunication,
    private utils: utils) { }

   convertEnToAr = this.utils.convertEnToAr;
   attributesNames = [
    'firstLectureTamam',
    'secondLectureTamam',
    'thirdLectureTamam',
    'fourthLectureTamam',
    'fifthLectureTamam'
    ];

    ngOnInit(): void {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.subscription = this.sendMsg.falseTamamMsg.subscribe(message => {

      if(message === null){
        return ;
      }
      this.falseTamams = message ;
      console.log(message);

      this.falseTamams = this.falseTamams.map(item => {
        var absenceCnt = 0 , color = 'black';
        for(let i = 0 ; i < this.attributesNames.length; i++){
          if(item[this.attributesNames[i]] != '---'
          && item.trueLewa2TalbaTamams.indexOf(item[this.attributesNames[i]]) == -1){
            absenceCnt += 1; color = 'red';
          }
          item[this.attributesNames[i] + 'Color'] = color;
          color = 'black';
        }
        item['absenceCnt'] = absenceCnt;
        return item ;
      });

      this.sendMsg.sendFalseTamamMsg(null);
    });


  }

  printResults(){
    console.log('Hello');
    console.log('This is the data to print' , this.falseTamams);

    var headersInArabic = [
      {text: 'م' , alignment: 'center'},
      {text: 'العسكري الرقم' , alignment: 'center'},
      {text: 'الأسم' , alignment: 'center'},
      {text: 'الفرقة' , alignment: 'center'},
      {text: 'الأولى المحاضرة' , alignment: 'center'},
      {text: 'الثانية المحاضرة' , alignment: 'center'},
      {text: 'الثالثة المحاضرة' , alignment: 'center'},
      {text: 'الرابعة المحاضرة' , alignment: 'center'},
      {text: 'الخامسة المحاضرة' , alignment: 'center'},
      {text: 'الطلبة لواء تمام' , alignment: 'center'},
      {text: 'المحاضرات غياب عدد' , alignment: 'center'},
    ];
    var title = this.reverseString('تخلفات الطلبة بالمحاضرات بتاريخ ' + this.convertEnToAr(this.falseTamams[0]['date']).split('').reverse().join(''));
    var dd = {
      pageMargins: 10,
      pageOrientation: 'landscape',
      content: [
          { text: title , style: 'header' , alignment: 'center'},
          this.table(this.falseTamams , headersInArabic),
      ],
      defaultStyle: {
        font: 'Amiri'
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
      'firstLectureTamam',
      'secondLectureTamam',
      'thirdLectureTamam',
      'fourthLectureTamam',
      'fifthLectureTamam',
      'trueLewa2TalbaTamams',
      'absenceCnt',
    ];
    var cnt = 1 ;
    var convertToArabic = this.convertEnToAr;
    data.forEach(function(row) {
        var dataRow = [{text: cnt++ , alignment: 'center'}];

        columnsInEnglish.forEach(function(column) {
          var txt: any ;
          if(column == 'Class')
            txt = reverseString(convertToArabic(row['year'])
            + row['className']
            +(row['classNo'] != 0 ? convertToArabic(row['classNo']).split('').reverse().join(''): ''));

          //else if(column == 'studentID')
           // txt = convertToArabic(row[column].toString()).split('').reverse().join('');
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
