import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { stat } from 'fs';
import { stringify } from 'querystring';
import { Subscription } from 'rxjs';
import { ComponentCommunication } from 'src/app/shared/ComponentCommunication.service';
import { serverOptions } from 'src/app/shared/server.option';
import { utils } from 'src/utils/utils.service';

@Component({
  selector: 'app-geza2at-records',
  templateUrl: './geza2at-records.component.html',
  styleUrls: ['./geza2at-records.component.css']
})
export class Geza2atRecordsComponent implements OnInit , OnDestroy {

  constructor(private sendMsg: ComponentCommunication,
    private utils: utils,
    private http: HttpClient) { }
  geza2atList : any[] = [] ;
  subscription: Subscription;
  convertEnToAr = this.utils.convertEnToAr;
  ngOnInit(): void {

    this.subscription =  this.sendMsg.geza2atMsg.subscribe(message => {
      if(!message){
        return ;
      }
      console.log(message);
      this.geza2atList = message ;
      this.sendMsg.sendGeza2atMsg(null);
    });

  }

  onDeleteGeza2(index){
    this.http.delete(serverOptions.serverUrl + '/deleteGeza2' , {
      responseType: 'json',
      observe: 'response',
      params:{
        id: this.geza2atList[index].id,
      }
    })
    .subscribe(response => {
      var status: any = response.body;

      if(status){
        this.geza2atList.splice(index , 1);
      }
      else {
        alert('Internal server error please try again later');
        return ;
      }
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe() ;
  }

}
