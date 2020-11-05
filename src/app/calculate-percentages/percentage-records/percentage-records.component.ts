import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentCommunication } from '../../shared/ComponentCommunication.service';
import {sendPercentage} from '../calculate-percentages.interface';
import {serverOptions} from '../../shared/server.option';
import { utils } from 'src/utils/utils.service';

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

  convertEnToAr = this.utils.convertEnToAr;
  ngOnInit(): void {
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
}
