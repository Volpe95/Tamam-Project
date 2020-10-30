import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentCommunication } from '../shared/ComponentCommunication.service';
import { serverOptions } from '../shared/server.option';

@Component({
  selector: 'app-comparisons',
  templateUrl: './comparisons.component.html',
  styleUrls: ['./comparisons.component.css']
})
export class ComparisonsComponent implements OnInit {

  @ViewChild('Date') Date: ElementRef;

  constructor(private http: HttpClient , private sendMsg: ComponentCommunication) { }

  ngOnInit(): void {

  }

  getFalseTamams(){
    let date = this.Date.nativeElement.value;
    if(!date){
      alert('Please Insert a valid date');
      return ;
    }

    this.http.get(serverOptions.serverUrl + '/' + 'getFalseTamams' , {
      responseType: 'json',
      observe: 'response',
      params:{
        date: date,
      }
    }).subscribe(response => {
      console.log(response);
      this.sendMsg.sendFalseTamamMsg(response.body);
    })


  }
}
