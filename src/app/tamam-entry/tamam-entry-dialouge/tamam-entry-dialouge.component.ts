import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Button } from 'protractor';
import { empty, Subscription } from 'rxjs';
import { ComponentCommunication } from 'src/app/shared/ComponentCommunication.service';

import {Communication} from '../Communication.service' ;

@Component({
  selector: 'app-tamam-entry-dialouge',
  templateUrl: './tamam-entry-dialouge.component.html',
  styleUrls: ['./tamam-entry-dialouge.component.scss']
})


export class TamamEntryDialougeComponent implements OnInit {

  Students: any[] = [
    {ID: 4774 , name : "Mahmoud Kassem" , year: "5th" , class :"Communication"},
    {ID: 8745 , name : "Mahmoud Naguib" , year: "5th" , class :"Computer"}
  ];

  // used for communication using observables
  subscription: Subscription;

  // variables to store pressed buttons html elements
  pressedButtons : HTMLElement[] = [] ;
  numberOfLectures = 5 ;

  foundStudent = false ;
  StudentInfo: any = {ID: '' , name: "", year: "", class: ""} ; // student info after entering the student ID
  curDate : Date = null ;

  constructor(private sendMsg: ComponentCommunication , private communication: Communication) { }

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

    if(this.foundStudent == false){
      alert('Please insert a valid ID number') ;
      return ;
    }
    if(this.curDate == null){
      alert('Please insert a valid date');
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
    this.sendMsg.sendAttendanceEntryMsg({Tamams: Tamams , studentInfo: this.StudentInfo}); // should also send the Date ?

    this.allWhite() ;
    this.initializeButtons();
    //this.StudentInfo = null ;
  }

  dateChanged(Date){
    this.curDate = Date ;
    // POST request here to get the already stored Tamams
  }


  getStudentInfo(ID : number){
    this.foundStudent = false ;
    this.Students.forEach(student => { // will make a db query instead of that later
        if(student.ID == ID){
          this.StudentInfo = student;
          this.foundStudent = true ;
        }
    });

    if(!this.foundStudent){
      this.StudentInfo = {ID: ID , name: "", year: "", class: ""}
    }

  }

}
