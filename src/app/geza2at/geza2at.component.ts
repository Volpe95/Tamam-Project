import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ComponentCommunication } from '../shared/ComponentCommunication.service';
import { serverOptions } from '../shared/server.option';

@Component({
  selector: 'app-geza2at',
  templateUrl: './geza2at.component.html',
  styleUrls: ['./geza2at.component.css']
})
export class Geza2atComponent implements OnInit {
  constructor(private http: HttpClient , private sendMsg: ComponentCommunication) { }

  @ViewChild('Geza2atForm') geza2atForm: NgForm;
  @ViewChild('StudentID') StudentID: ElementRef;

  filterBy = false ; // filter by student
  punishmentType = false ; // normal geza2 NOT points

  geza2Points = 20;
  geza2atList: any[] = [] ;
  filteredOfficers : any[] = [] ;
  crimes: any[] = [] ;
  punishments: any[] = [] ;

  studentInfo: any = {studentName: '' , year: '' , className: '' , classNo: ''};
  ngOnInit(): void {

    console.log(this.punishmentType);
    this.http.get<any[]>(serverOptions.serverUrl + '/' + 'getCrimes' , {
      responseType: 'json',
      observe: 'response',
    })
    .subscribe(response => {

      if(!Array.isArray(response.body)){
        alert('Internal server please try again later');
        return ;
      }
      this.crimes = response.body;
      console.log(response.body);
    });

    this.http.get<any[]>(serverOptions.serverUrl + '/' + 'getPunishments' , {
      responseType: 'json',
      observe: 'response'
    })
    .subscribe(response => {
      if(!Array.isArray(response.body)){
        alert('Internal server error please try again later');
        return ;
      }
      this.punishments = response.body;
      console.log(response.body);
    });

  }

  getGeza2Json(officer , studentCrime , studentPunishment){

    var geza2Info =   {
      studentID: this.studentInfo.studentID,
      studentName: this.studentInfo.studentName,
      year: this.studentInfo.year,
      classCode: this.studentInfo.classCode,
      className: this.studentInfo.className,
      classNo: this.studentInfo.classNo,
      crimeID: studentCrime.crimeID,
      crimeName: studentCrime.crimeName,
      officerID: officer.officerID,
      officerRank: officer.officerRank,
      officerName: officer.officerName,
      geza2Date: this.geza2atForm.value.geza2Date,
    };

    if(this.punishmentType){
      geza2Info['geza2Points'] = studentPunishment;
    }
    else {
      geza2Info['geza2ID'] = studentPunishment.geza2ID;
      geza2Info['geza2Name'] = studentPunishment.geza2Name;
    }

    return geza2Info ;
  }
  onSubmit(){

    if(!this.geza2atForm.valid){
      alert('One or more values are not yet filled');
      return ;
    }

    console.log(this.geza2atForm.value.studentID);

    var values = this.geza2atForm.value ;
    var officer = this.filteredOfficers[this.geza2atForm.value.officerArrayIndex];
    var studentCrime = this.crimes[values.crimeArrayIndex];
    var studentPunishment;
    if(this.punishmentType){
      studentPunishment = values.geza2Points;
    }
    else {
      studentPunishment = this.punishments[values.geza2ArrayIndex];
    }
    var geza2Info = this.getGeza2Json(officer , studentCrime , studentPunishment);

    this.http.post(serverOptions.serverUrl + '/addGeza2' , geza2Info , {
      responseType: 'json',
      observe: 'response',
    })
    .subscribe(response => {
      if(!response.body){
        alert('Internal server error please try again later');
        return ;
      }

      this.StudentID.nativeElement.focus();
      this.StudentID.nativeElement.value = '' ;
      // send the data to geza2at-records component
      //this.geza2atList.unshift(geza2Info);
      //this.sendMsg.sendGeza2atMsg(this.geza2atList);

      if(this.filterBy){
        this.updateGeza2List({geza2Date: geza2Info.geza2Date});
      }
      else {
        this.updateGeza2List({studentID: geza2Info.studentID});
      }
    })

    this.studentInfo = {studentName: '' , year: '' , className: '' , classNo: ''};
    this.geza2atForm.controls['studentID'].setValue('');
    console.log(geza2Info);
  }

  onChangeStudentID(ID){
    this.http.get(serverOptions.serverUrl + '/' + 'getStudentInfo' , {
      responseType: 'json',
      observe: 'response',
      params: {
        studentID: ID,
      }
    })
    .subscribe(response => {
      var responseBody: any = response.body;
      console.log(response.body);

      if(!responseBody.status){
        alert('Invalid Student ID');
        return ;
      }
      if(!this.filterBy){
        this.updateGeza2List({studentID: ID});
      }

      this.studentInfo = responseBody ;
    })

  }
  updateGeza2List(parameters){
    // get req to update the geza2at list

    console.log(parameters);

    this.http.get(serverOptions.serverUrl + '/getGeza2at' , {
    responseType: 'json',
    observe: 'response',
    params: parameters,
    })
    .subscribe(response => {
      if(!Array.isArray(response.body)){
        alert('Internal server error please try again later');
        return ;
      }
      this.geza2atList = response.body;
      this.geza2atList.sort((a , b) => {
        return a.geza2Date < b.geza2Date? 1 : -1;
      })
      this.sendMsg.sendGeza2atMsg(this.geza2atList);

    })

  }

  onChangeDate(){
    if(this.filterBy){
      this.updateGeza2List({geza2Date: this.geza2atForm.value.geza2Date});
    }
  }
  onChangePunishmentType(value){
    this.punishmentType = !this.punishmentType;
    console.log(this.punishmentType);
  }

  onChangeFilterBy(){
    this.filterBy = !this.filterBy ;
    var parameters ;

    if(this.filterBy){
      if(this.geza2atForm.value.geza2Date == ''){
        return ;
      }
      parameters = {geza2Date: this.geza2atForm.value.geza2Date};
    }
    else {
      parameters = {studentID: this.geza2atForm.value.studentID};
    }

    this.updateGeza2List(parameters) ;
  }

  onChangeOfficerRank(rank){
    this.http.get<any[]>(serverOptions.serverUrl + '/getOfficersByRank' , {
      responseType: 'json',
      observe: 'response',
      params:{
        officerRank: rank,
      }
    })
    .subscribe(response => {
      if(!Array.isArray(response.body)){
        alert('Internal server error occured please try again later');
        return ;
      }
      this.filteredOfficers = response.body;
      console.log(this.filteredOfficers);
      console.log(this.geza2atForm.value);
    });
  }
}
