import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentCommunication } from 'src/app/shared/ComponentCommunication.service';
import { Student } from 'src/app/shared/student.interface';
import { utils } from 'src/utils/utils.service';
import {serverOptions} from '../../shared/server.option';
import {studentTamam} from '../studentTamam.interface';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit , OnDestroy {

  subscribtion : Subscription ;
  sendCurDateTamamSubscribtion: Subscription;
  receivedTamam  ;

  curTamamList: studentTamam[] = [];

  constructor(private sendMsg: ComponentCommunication,
    private http: HttpClient,
    private utils: utils) { }

  convertEnToAr = this.utils.convertEnToAr;
  ngOnInit(): void {
    this.subscribtion = this.sendMsg.attendanceEntryMsg.subscribe(message => {
        if(!message){
          return ;
        }
        this.sendMsg.sendAttendanceEntryMsg(null);
        if (this.curTamamList.some(e => e.studentID == message.studentID)) {
          /* vendors contains the element we're looking for */
          alert('You have already entered the attendance records for this student at the same chosen date before');
          return ;
        }
        this.http.post(serverOptions.serverUrl + '/insertTamamRecord' , message , {
          responseType: 'json',
          observe: 'response'
        })
        .subscribe(resoponse  => {
          this.sendMsg.sendAttendanceEntryMsg(null);
          if(resoponse.body){
            console.log(resoponse);
            this.curTamamList.unshift(message) ;
            let val: any = resoponse.body;
            this.curTamamList[0].id = val.recordId;
          }
          else {
            alert('Internal error occured please try again');
            return ;
          }
        })
        console.log(message); // Debug :)
    });

    this.sendCurDateTamamSubscribtion = this.sendMsg.curDateTamamsMsg.subscribe(message => {
      if(!message){
        return ;
      }
      this.sendMsg.sendCurDateTamamsMsg(null);
      console.log('Hello' , message);
      this.http.get<studentTamam[]>(serverOptions.serverUrl + '/' + 'getTamams' , {
        responseType: 'json',
        observe: 'response',
        params:{
          date : message
        }
      })
      .subscribe(response => {
        if(response.body){
          this.curTamamList = response.body;
          console.log(this.curTamamList); // Debug :)
        }
        else {
          alert('Internal error occured, please try again later');
          return ;
        }
      });
    })
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe() ;
    this.sendCurDateTamamSubscribtion.unsubscribe() ;
  }

  deleteTamam(index){
    console.log(this.curTamamList.length);
    /// YOU have to ADD DELETE Request here
    this.http.delete(serverOptions.serverUrl + '/' + 'deleteTamam' , {
      responseType: 'json',
      observe: 'response',
      params:{
        id: this.curTamamList[index].id,
      }
    })
    .subscribe(result => {
      if(result.body){
        this.curTamamList.splice(index ,1);
      }
      else {
        alert('Internal error, please try again later');
      }
    })
  }

  TamamToJson(receivedTamam){
    return {
      studentID:receivedTamam.studentInfo.studentID,
      studentName: receivedTamam.studentInfo.studentName,
      year: receivedTamam.studentInfo.year,
      classCode: receivedTamam.studentInfo.classCode,
      className: receivedTamam.studentInfo.className,
      classNo: receivedTamam.studentInfo.classNo,
      firstLectureTamam: receivedTamam.Tamams[0],
      secondLectureTamam: receivedTamam.Tamams[1],
      thirdLectureTamam: receivedTamam.Tamams[2],
      fourthLectureTamam: receivedTamam.Tamams[3],
      fifthLectureTamam: receivedTamam.Tamams[4],
      date: receivedTamam.date
    }
  }
}
