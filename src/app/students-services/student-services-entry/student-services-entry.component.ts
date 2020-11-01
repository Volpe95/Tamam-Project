import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ComponentCommunication } from 'src/app/shared/ComponentCommunication.service';
import { serverOptions } from 'src/app/shared/server.option';
import { Lewa2TalbaTamam } from '../Lewa2TalbaTamam.interface';

@Component({
  selector: 'app-student-services-entry',
  templateUrl: './student-services-entry.component.html',
  styleUrls: ['./student-services-entry.component.css']
})
export class StudentServicesEntryComponent implements OnInit , OnDestroy {
  tamamTypes = ['عياده', 'زنزانه' , 'اجازه' , 'خدمه' , 'عرض' , 'مأموريه' , 'مكتب' , 'مستشفى' , 'تحت الملاحظه' , 'فرق رياضيه' , 'غياب' ];
  subsubription : Subscription;
  Tamams : Lewa2TalbaTamam[] = [] ;

  @ViewChild('StudentServicesForm') studentServicesForm: NgForm;
  @ViewChild('StudentID') inputID : ElementRef;

  constructor(private http: HttpClient , private sendMsg: ComponentCommunication) { }

  ngOnInit(): void {
    this.subsubription = this.sendMsg.studentServiceIDMsg.subscribe(message => {
      console.log(message);
      var id: any = message ;
      if(message === null){
        return ;
      }
      this.http.delete(serverOptions.serverUrl + '/' + 'deleteStudentService' , {
        responseType: 'json',
        observe: 'response',
        params:{
          id: id,
        }
      })
      .subscribe(response => {
          var serverResponse: any = response.body;
          if(serverResponse.status === false){
            alert('Internal Server error occured , please try again later');
            return ;
          }
          this.Tamams = this.Tamams.filter(tamam => {
            return tamam.id != id ;
          });
          this.sendTamamRecords();
      })
      this.sendMsg.sendStudentServiceIDMsg(null);
    });
  }

  ngOnDestroy(){
    this.subsubription.unsubscribe() ;
  }
  sendTamamRecords(){
    this.sendMsg.sendStudentServicesMsg(this.Tamams);
  }

  onChangeDate(date){
    var parameters = {date: date};

    if(this.studentServicesForm.value.tamamType){
      parameters['tamamType'] = this.studentServicesForm.value.tamamType;
    }

    this.updateTamamRecords(parameters);
  }

  addStudentTamam(){

    var values = this.studentServicesForm.value;
    if(!this.studentServicesForm.valid){
      // Checking form validation
      alert('One or more empty fields');
      return ;
    }
    // POST req to the server to add the values of the given tamam
    this.http.post(serverOptions.serverUrl + '/' + 'addLewa2TalbaTamam',values,{
      responseType: 'json',
      observe: 'response'
    })
    .subscribe(response => {
      let serverResponse: any = response.body;
      console.log(serverResponse);
      if(serverResponse.status === true){ // the values was added to the DB
        // send the new record to the records table on top of the table
        this.Tamams.unshift({...serverResponse,
          tamamType: values.tamamType,
          studentID: values.studentID});

        this.sendTamamRecords();
        // clear the student ID and focus on the student ID field
        this.studentServicesForm.reset({
          tamamType : this.studentServicesForm.value.tamamType,
          date: this.studentServicesForm.value.date,
        });
        this.inputID.nativeElement.focus();

      }
      else { // the server returned an error msg with value .status
        alert(serverResponse.statusMsg);
      }
    });
  }

  onChangeTamam(){
    var tamamType = this.studentServicesForm.value.tamamType;
    var parameters = {};

    if(tamamType !== ''){
      parameters['tamamType'] = tamamType;
    }

    if(this.studentServicesForm.value.date){
      parameters['date'] = this.studentServicesForm.value.date;
      this.updateTamamRecords(parameters);
    }

    console.log(parameters);
  }

  updateTamamRecords(parametes){

    this.http.get<Lewa2TalbaTamam[]>(serverOptions.serverUrl + '/' + 'getLewa2TalbaTamams' , {
      responseType: 'json',
      observe: 'response',
      params:parametes,
    })
    .subscribe(response => {

      if(Array.isArray(response.body)){
        this.Tamams = response.body;
        this.sendTamamRecords();
      }
      else {
        alert('Internal Server Error Please try again later');
      }
    })
  }
}
