import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { serverOptions } from '../shared/server.option';

@Component({
  selector: 'app-geza2at',
  templateUrl: './geza2at.component.html',
  styleUrls: ['./geza2at.component.css']
})
export class Geza2atComponent implements OnInit {
  constructor(private http: HttpClient) { }

  @ViewChild('Geza2atForm') geza2atForm: NgForm;

  filterBy = false ; // filter by student
  punishmentType = false ; // normal geza2 NOT points

  geza2atList: any[] = [] ;
  filteredOfficers : any[] = [] ;
  crimes: any[] = [] ;
  punishments: any[] = [] ;

  studentInfo = {studentName: '' , year: '' , className: '' , classNo: ''};
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

  onSubmit(){
    console.log('Okay');
    console.log(this.geza2atForm.value);
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
        this.updatePunishments({studentID: ID});
      }

      this.studentInfo = responseBody ;
    })

  }
  updatePunishments(parameters){
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
    })

    console.log(this.geza2atList);
  }

  onChangeDate(){
    if(this.filterBy){
      this.updatePunishments({geza2Date: this.geza2atForm.value.geza2Date});
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

    this.updatePunishments(parameters) ;
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
