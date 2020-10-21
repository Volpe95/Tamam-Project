import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentCommunication } from 'src/app/shared/ComponentCommunication.service';
import { Student } from 'src/app/shared/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit , OnDestroy {

  subscribtion : Subscription ;
  receivedTamam  ;
  TamamsInfo = [] ;

  constructor(private sendMsg: ComponentCommunication) { }

  Students: Student[] = [
    new Student({ID: 4774 , name : "Mahmoud Kassem" , year: 5 , class :"Communication"}),
    new Student({ID: 8745 , name : "Mahmoud Naguib" , year: 5 , class :"Computer"})
  ];

  ngOnInit(): void {
    this.subscribtion = this.sendMsg.attendanceEntryMsg.subscribe(message => {
        if(message == ''){
          return ;
        }
        this.receivedTamam = message ; // you need to POST HERE
        this.TamamsInfo.unshift(message) ;
        console.log(message);
        this.sendMsg.sendAttendanceEntryMsg('');
    });
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe() ;
  }

  deleteTamam(index){
    /// YOU have to ADD DELETE Request here
    this.TamamsInfo.splice(index ,1);
  }
}
