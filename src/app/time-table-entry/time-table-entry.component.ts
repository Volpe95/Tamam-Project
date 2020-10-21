import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms' ; 
import {ComponentCommunication} from '../shared/ComponentCommunication.service'; 

@Component({
  selector: 'app-time-table-entry',
  templateUrl: './time-table-entry.component.html',
  styleUrls: ['./time-table-entry.component.css']
})

export class TimeTableEntryComponent implements OnInit {
  @ViewChild('timeTableForm' , {static : true}) timeTableForm : NgForm 

  constructor(private sendMsg: ComponentCommunication) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let values = this.timeTableForm.value ; 
    
    for(let val in values){ // check that all values are inserted by the user 
      if (values[val] == "" || values[val] == undefined){
        alert("One or more values are not yet inserted");
        return ; 
      }
    }
    // now send the data to timeTable Comp. & insert it in the database 
    //console.log(this.timeTableForm.value); 

    this.sendMsg.sendTimeTableSlot(values); 
  }

}

