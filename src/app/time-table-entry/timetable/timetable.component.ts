import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentCommunication } from 'src/app/shared/ComponentCommunication.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit , OnDestroy {
  
  // you need to fetch here the timetable from the database based on the year and class 
  subscription : Subscription ; 
  
  constructor(private sendMsg : ComponentCommunication) { }
  
  numbers = [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13 ,14 , 15 , 16 , 17 , 18 , 19 , 20 , 21 , 22 , 23 , 24 , 25 , 26 , 27 , 28 , 29 , 30 , 31 , 32 , 33 , 34 , 35] ; 
  
  colors = ["accent-orange-gradient" , "accent-pink-gradient" , "accent-green-gradient" , "accent-cyan-gradient" , 
  "accent-purple-gradient" , "accent-blue-gradient"] ; 
  ngOnInit(): void {
    
    
    this.subscription = this.sendMsg.timeTableSlotMsg.subscribe(message => {
        if (message == ""){
          return ; 
        }

        console.log(message) ; 
        this.sendMsg.sendTimeTableSlot(''); 
    }); 
  }

  ngOnDestroy(){
    this.subscription.unsubscribe() ; 
  }

}
