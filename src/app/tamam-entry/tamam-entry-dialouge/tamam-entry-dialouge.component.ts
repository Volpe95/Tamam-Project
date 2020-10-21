import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {Communication} from '../Communication.service' ; 

@Component({
  selector: 'app-tamam-entry-dialouge',
  templateUrl: './tamam-entry-dialouge.component.html',
  styleUrls: ['./tamam-entry-dialouge.component.scss']
})


export class TamamEntryDialougeComponent implements OnInit {
  subscription: Subscription;

  constructor(private communication: Communication) { }
  StudentInfo: any ; 
  ngOnInit(): void {
    
    this.subscription = this.communication.sharedMessage.subscribe(message => {
      this.StudentInfo = message ; 
    })

    
  }

}
