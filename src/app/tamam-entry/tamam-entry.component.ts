import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import {Communication} from './Communication.service' ;
import {Student} from '../shared/student.service' ;
import { ComponentCommunication } from '../shared/ComponentCommunication.service';

@Component({
  selector: 'app-tamam-entry',
  templateUrl: './tamam-entry.component.html',
  styleUrls: ['./tamam-entry.component.css'],
  providers: []
})


export class TamamEntryComponent implements OnInit {

  curDate: Date = null ;
  curStudentInfo: any  ;

  Students: any[] = [
    {ID: 4774 , name : "Mahmoud Kassem" , year: "5th" , class :"Communication"},
    {ID: 8745 , name : "Mahmoud Naguib" , year: "5th" , class :"Computer"}
  ];

  constructor(private sendMsg: ComponentCommunication ) { }

  ngOnInit(): void {

  }


}
