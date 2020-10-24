import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import {Communication} from './Communication.service' ;
import {Student} from '../shared/student.interface' ;
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

  constructor(private sendMsg: ComponentCommunication ) { }

  ngOnInit(): void {

  }


}
