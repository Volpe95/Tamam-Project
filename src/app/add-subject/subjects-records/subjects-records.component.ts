import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from 'rxjs' ; 
import {ComponentCommunication} from '../../shared/ComponentCommunication.service' ; 

@Component({
  selector: 'app-subjects-records',
  templateUrl: './subjects-records.component.html',
  styleUrls: ['./subjects-records.component.css']
})

export class SubjectsRecordsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  Subjects : any[] = [] ; // should be fetched from the database later
  /*
  = [{
    subjectName: "PDE", 
    subjectCode: "MTH302", 
    totalSubjectHours: 24, 
    lectureHours: 2 , 
    sectionHours: 1 , 
    labHours: 0 
}]; */ 

  constructor(private sendMsg: ComponentCommunication) { }

  ngOnInit(): void {

    this.subscription = this.sendMsg.addSubjectMsg.subscribe(message => { // message received 
      if(message == ''){
        return ; 
      }
      this.Subjects.push(message) ;  // should be inserted in the database then fetch the results again 
      console.log(this.Subjects);
      this.sendMsg.SendAddSubjectMsg(''); 
    })

  }

  ngOnDestroy(){
    this.subscription.unsubscribe() ; 
  }

}
