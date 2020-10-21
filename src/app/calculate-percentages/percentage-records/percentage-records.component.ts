import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {ComponentCommunication} from '../../shared/ComponentCommunication.service'; 

@Component({
  selector: 'app-percentage-records',
  templateUrl: './percentage-records.component.html',
  styleUrls: ['./percentage-records.component.css']
})

export class PercentageRecordsComponent implements OnInit , OnDestroy {

  subscribtion : Subscription; 
  constructor(private sendMsg: ComponentCommunication) { }

  ngOnInit(): void {

    this.subscribtion =  this.sendMsg.CalculatePercentageMsg.subscribe(message => { // receive the year and percentage from  calculateComponent 
      if(message == ''){ // if the message is empty (just intiated the Comp.)
        return ; 
      }
      console.log(message) ; 
      this.sendMsg.SendCalculatePercentageMsg(''); // make the value empty again to avoid resending when re-intiating the Comp. 
    })

    /* TODO 
      Use the data you have received to send GET request to the server to fetch students with the sent percentges 
      after receiving the server response send display them in the HTML table Good luck with that :) 
    */
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe() ; 
  }

}
