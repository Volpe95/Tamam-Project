import { Component, OnInit, ViewChild , ViewChildren } from '@angular/core';
import {NgForm} from '@angular/forms' ;

import {ComponentCommunication} from '../shared/ComponentCommunication.service' ;

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})

export class AddSubjectComponent implements OnInit {

  @ViewChild("addSubjectForm" , {static: true}) addSubjectForm: NgForm ;

  constructor(private sendMsg: ComponentCommunication) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.addSubjectForm.valid){ // check that all fields has been entered
      alert("One or more missing fields") ;
      return ;
    }

   // console.log(this.addSubjectForm);  // Debug :)
   // send the data
    this.sendMsg.SendAddSubjectMsg({
      subjectName: this.addSubjectForm.value.subjectName,
      subjectCode: this.addSubjectForm.value.subjectCode,
      year: this.addSubjectForm.value.year,
      classCode: this.addSubjectForm.value.classCode,
      totalHours: this.addSubjectForm.value.totSubjectHours,
      lectureHours: this.addSubjectForm.value.lectureHours ,
      exerciseHours: this.addSubjectForm.value.exerciseHours ,
    });

    this.addSubjectForm.resetForm();

  }
}
