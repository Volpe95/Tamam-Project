import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Button } from 'protractor';
import { Subscription } from 'rxjs';
import { ComponentCommunication } from 'src/app/shared/ComponentCommunication.service';
import {Student} from '../../shared/student.interface';
import {Communication} from '../Communication.service' ;
import {studentTamam} from '../studentTamam.interface';

import {serverOptions} from '../../shared/server.option';
import { DateOnlyDataType } from 'sequelize/types';
import { utils } from 'src/utils/utils.service';
@Component({
  selector: 'app-tamam-entry-dialouge',
  templateUrl: './tamam-entry-dialouge.component.html',
  styleUrls: ['./tamam-entry-dialouge.component.scss']
})


export class TamamEntryDialougeComponent implements OnInit {

  // used for communication using observables
  subscription: Subscription;

  // variables to store pressed buttons html elements
  pressedButtons : HTMLElement[] = [] ;
  numberOfLectures = 5 ;
  curDateSubjects = ['' , '' , '' , '' , ''];
  @ViewChild('ID') inputID: ElementRef ;
  foundStudent = false ;
  StudentInfo: any = {ID: '' , name: "", year: "", class: ""} ; // student info after entering the student ID
  curDate : string = null ;
  studentTamamsCurDate: any = [] ;

  constructor(private sendMsg: ComponentCommunication,
      private communication: Communication,
      private http: HttpClient,
      private utils: utils) { }

  convertEnToAr = this.utils.convertEnToAr;
  ngOnInit(): void {
    this.initializeButtons() ;
  }

  initializeButtons(){
    for(let i = 0 ; i < this.numberOfLectures ; i++){
      /*if(this.pressedButtons[i] !== null){
        this.pressedButtons[i].style.background = 'white' ;
        this.pressedButtons[i].style.color = 'black' ;
      }*/
      this.pressedButtons[i] = null ;
    }
  }

  allWhite(){
    for(let i = 0 ; i < this.numberOfLectures ; i++){
      if(this.pressedButtons[i] !== null){
        this.pressedButtons[i].style.background = 'white' ;
        this.pressedButtons[i].style.color = 'black' ;
      }
    }
  }

  onClickTamam(button){ // when a button is pressed

    if(this.pressedButtons[button.value - 1] !== null){

      if(this.pressedButtons[button.value - 1]  == button){
        // same button was pressed again
        this.pressedButtons[button.value - 1].style.background = 'white' ;
        this.pressedButtons[button.value - 1].style.color = 'black' ;
        this.pressedButtons[button.value - 1] = null ;
        return ;
      }

      // if already a button pressed for the same lecture
      this.pressedButtons[button.value - 1].style.background = 'white' ;
      this.pressedButtons[button.value - 1].style.color = 'black' ;
    }

    console.log(button , this.pressedButtons[button.value - 1]) ;

    // change pressed button color
    button.style.background = "CornflowerBlue";
    button.style.color = "white";
    // save pressed button to be last pressed
    this.pressedButtons[button.value - 1] = button ;

  }

  onSubmit(){ // when Adding a Tamam

    if(this.curDate == null){
      alert('Please insert a valid date');
      return ;
    }

    if(!this.foundStudent){
      alert('Please insert a valid ID number') ;
      return ;
    }

    console.log(this.curDate , this.StudentInfo);
    let oneValue = false ;

    this.pressedButtons.forEach(button => {

      oneValue = oneValue || (button !== null) ; // at least one button was pressed

    });

    if(!oneValue){ // no Tamams was inserted
      alert("Please add at least one attendance value");
      return ;
    }

    let Tamams = [] ;

    this.pressedButtons.forEach(button => {

      if(button !== null){ // if the student has Tamam in this lecture
        Tamams.push(button.getAttribute('name')); // insert Tamam name (Arabic)
      }
      else {
          Tamams.push('---');
      }
    });

    console.log(Tamams);
    /// POST req to the server with the Date , StudentInfo and Tamams OR POST at student list to get the response there
    console.log('Hello' , Tamams , this.StudentInfo);
    this.sendMsg.sendAttendanceEntryMsg({
       ...this.StudentInfo,
       firstLectureTamam: Tamams[0],
       secondLectureTamam: Tamams[1],
       thirdLectureTamam: Tamams[2],
       fourthLectureTamam: Tamams[3],
       fifthLectureTamam: Tamams[4],
       date: this.curDate
      }); // should also send the Date ?

    // re-initializing the variables to get ready to read a new Tamam
    this.allWhite() ; // all buttons are white again
    this.initializeButtons(); // previous Tamam pressed buttons are deleted
    this.foundStudent = false ; // will start to look for a new student
    this.inputID.nativeElement.value = '' ;   // student ID input is reset
    this.inputID.nativeElement.focus();  // cursor is set to studentID input
    this.StudentInfo = {}
    this.curDateSubjects = ['' , '' , '' , '' , ''];
    //this.StudentInfo = null ;
  }

  dateChanged(Date : string){
    this.curDate = Date ;
    console.log(this.curDate);
    this.sendMsg.sendCurDateTamamsMsg(this.curDate);
  }


  getStudentInfo(ID , date){
    this.foundStudent = false ;
    this.curDateSubjects = ['' , '' , '' , '' , ''];

    this.http.get(serverOptions.serverUrl + '/' + 'getStudent' , {
      responseType: 'json',
      observe: 'response',
      params:{
        id: ID,
        date: date,
      },
    }).subscribe(response => {
      console.log(response); // Debug :)
      if(!response.body){
        alert('Incorrect ID number or Invalid date');
        return ;
      }
      else {
        let body: any = response.body;
        this.StudentInfo = body.studentInfo;
        let subjects = body.subjects;
        for(let i = 0 ; i < subjects.length; i++){
          this.curDateSubjects[subjects[i].lectureNo - 1] = subjects[i].subjectName;
        }
        console.log(this.curDateSubjects);
        this.foundStudent = true ;
      }
    })

    if(!this.foundStudent){
      this.StudentInfo = {ID: ID , name: "", year: "", class: ""}
    }

  }

}
