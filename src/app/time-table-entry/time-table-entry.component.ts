import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms' ;
import { values } from 'sequelize/types/lib/operators';
import {ComponentCommunication} from '../shared/ComponentCommunication.service';
import { serverOptions } from '../shared/server.option';
import {TimeTableSlot} from './timeTableSlot.interface';

@Component({
  selector: 'app-time-table-entry',
  templateUrl: './time-table-entry.component.html',
  styleUrls: ['./time-table-entry.component.css']
})

export class TimeTableEntryComponent implements OnInit {
  @ViewChild('timeTableForm' , {static : true}) timeTableForm : NgForm

  days = ['Saturday','Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday'];
  classes: {classCode , className? , classNo?: number , year?}[] = [] ;
  subjects: {subjectCode , subjectName? , classCode , year}[] = [] ;
  allClasses: {classCode , className? , classNo?: number , year?}[] = [] ;
  allSubjects: {subjectCode , subjectName , classCode , year}[] = [] ;
  classNames = [] ; classNo = [] ;
  constructor(private sendMsg: ComponentCommunication , private http: HttpClient) { }

  ngOnInit(): void {
    this.http
    .get(serverOptions.serverUrl + '/' + 'getAllClasses' , {
      responseType: 'json',
      observe: 'response',
    })
    .subscribe(response => {
      var tmp : any = response.body;
      this.allClasses = tmp ;
    });

    this.http
    .get(serverOptions.serverUrl + '/' + 'getAllSubjects' , {
      responseType: 'json',
      observe: 'response'
    })
    .subscribe(response => {
      var tmp: any = response.body;
      this.allSubjects = tmp ;
      console.log(this.allSubjects);
    })
  }

  onSubmit(){
    let values = this.timeTableForm.value ;

    if(!this.timeTableForm.valid){
      alert("One or more values are not yet inserted");
      return ;
    }
    // now send the data to timeTable Comp. & insert it in the database
    //console.log(this.timeTableForm.value);
    var classCode , subjectCode;
    for(let i = 0 ; i < this.classes.length; i++){
      if(values.class == this.classes[i].className){
        classCode = this.classes[i].classCode;
        break ;
      }
    }
    for(let i = 0 ; i < this.subjects.length; i++){
      if(values.subject == this.subjects[i].subjectName){
        subjectCode = this.subjects[i].subjectCode;
        break ;
      }
    }
    var lectureWeekType = 0 ;
    if(this.timeTableForm.value.lectureWeekType === 'Odd Week'){
      lectureWeekType = 1 ;
    }
    else if(this.timeTableForm.value.lectureWeekType === 'Even Week') {
        lectureWeekType = 2 ;
    }
    console.log('lectureWeekType' , lectureWeekType);

    var TimeTableSlot = {
      year: this.timeTableForm.value.year,
      classCode: classCode,
      className: this.timeTableForm.value.class,
      classNo: this.timeTableForm.value.classNo,
      subjectCode: subjectCode,
      subjectName: this.timeTableForm.value.subject,
      lectureWeekType: lectureWeekType,
      Day: this.timeTableForm.value.day,
      lectureNo: this.timeTableForm.value.lecture,
      lectureHall : null,
      lectureType: null,
    };
    console.log(TimeTableSlot , ' ' , this.subjects);
    this.http.post(serverOptions.serverUrl + '/' + 'insertTimeTableSlot' , TimeTableSlot , {
      responseType: 'json',
      observe: 'response'
    })
    .subscribe(result => {
      console.log(result);
      this.updateTimeTableSlots(this.timeTableForm.value.year , classCode , this.timeTableForm.value.classNo);
      this.init();
      this.timeTableForm.resetForm() ;
    })
  }

  init(){
    this.classes = [] ;
    this.subjects = [] ;
  }
  onChangeYear(year){
    this.timeTableForm.reset({
      'year': year
    });
    this.classes = this.allClasses.filter(allClasses => allClasses.year == year);

    this.classNames = [] ;
    for(let i  = 0 ; i < this.classes.length; i++){
      if(this.classNames.indexOf(this.classes[i].className) == -1){
        this.classNames.push(this.classes[i].className);
      }
    }
    console.log(this.classNames);
  }

  onChangeClass(className){
    // Go get the subject for this certain class
    // Display the timetable for this class also
    this.classNo = [] ;
    this.subjects = []  ;
    let count = 0 ; let classCode ;
    for(let i = 0 ; i < this.classes.length; i++){
      if(this.classes[i].className == className){
        classCode = this.classes[i].classCode;
        count += 1 ;
        this.classNo.push(count);
      }
    }
    if(this.classNo.length == 1){
      this.classNo[0] = 0 ;
    }

    this.timeTableForm.reset({
      'year': this.classes[0].year,
      'class': className,
    });

    this.allSubjects.forEach(subject => {
      if(subject.classCode == classCode){
        this.subjects.push(subject);
      }
    });
  }

  onChangeClassNo(){
    // here you have to get the time table of the given class GET req
    var classCode;
    for(let i = 0 ; i < this.classes.length;i++){
      if(this.classes[i].className == this.timeTableForm.value.class){
        classCode = this.classes[i].classCode;
      }
    }
    this.updateTimeTableSlots(this.timeTableForm.value.year , classCode , this.timeTableForm.value.classNo);
  }

  updateTimeTableSlots(year , classCode , classNo){
    this.http.get<TimeTableSlot[]>(serverOptions.serverUrl + '/' + 'getTimeTable' , {
      responseType: 'json',
      observe: 'response',
      params:{
        classCode: classCode,
        classNo: classNo,
        year: year,
      },
    })
    .subscribe(response => {
      // as a later TODO fetch from the server only the needed data
      var timeTableDbRecords = response.body;
      this.sendMsg.sendTimeTableSlot(timeTableDbRecords);
      console.log(response.body);
    });

  }
}

