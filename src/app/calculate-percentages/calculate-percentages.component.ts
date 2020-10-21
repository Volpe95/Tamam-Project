import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ComponentCommunication } from "../shared/ComponentCommunication.service";

// Make the table appear only when you press calculate use query parameters as well to select 
@Component({
  selector: 'app-calculate-percentages',
  templateUrl: './calculate-percentages.component.html',
  styleUrls: ['./calculate-percentages.component.css']
})


export class CalculatePercentagesComponent implements OnInit {
  @ViewChild('PercentageForm') PercentageForm: NgForm ; 

  constructor(private snedMsg: ComponentCommunication) { }

  ngOnInit(): void {
  }

  onSubmit(){ // triggered when the submit button is pressed 
   
    if(!this.PercentageForm.valid){ // user has missed at least on of the required fields 
      alert('One or more missing fields');
      return ; 
    }
    //console.log(this.PercentageForm) ; Debug :) 
    
    this.snedMsg.SendCalculatePercentageMsg({ // data are fine send them to percentage records component 
      year: this.PercentageForm.value.year ,
      percentage:  this.PercentageForm.value.percentage
      });
  }
}
