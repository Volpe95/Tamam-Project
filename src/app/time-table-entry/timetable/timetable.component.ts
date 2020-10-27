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
  days = ['Saturday','Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday'];
  subscription : Subscription ;
  timeTableValues = {} ;
  constructor(private sendMsg : ComponentCommunication) { }

  number = [1 , 2 , 3 , 4 , 5];
  numbers = [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13 , 14 , 15 , 16 , 17 , 18 , 19 , 20 , 21 , 22 , 23 , 24 , 25 , 26 , 27 , 28 , 29 , 30 , 31 , 32 , 33 , 34 , 35] ;

  colors = ["accent-orange-gradient" , "accent-pink-gradient" , "accent-green-gradient" , "accent-cyan-gradient" ,
  "accent-purple-gradient" , "accent-blue-gradient" , "accent-violet-gradient"] ;
  ngOnInit(): void {
    this.numbers.forEach(number => {
      number = Math.floor((number - 1) / 7) + 1;
    })

    this.timeTableValuesInit() ;
    console.log(this.timeTableValues);
    this.subscription = this.sendMsg.timeTableSlotMsg.subscribe(timeTableDbRecords => {
        if (!timeTableDbRecords){
          return ;
        }
        this.timeTableValuesInit() ;

        for(let k = 0 ; k < timeTableDbRecords.length; k++){
          var isEven = Number(timeTableDbRecords[k].lectureWeekType == 2);
          this.timeTableValues[timeTableDbRecords[k].lectureNo][timeTableDbRecords[k].Day][isEven] = timeTableDbRecords[k].subjectName;
        }


        console.log(this.timeTableValues) ;
        this.sendMsg.sendTimeTableSlot(null);
    });
  }

  timeTableValuesInit(){
    let numberOfLectures = 5 ;
    for(let i = 1 ; i <= numberOfLectures ; i++){
      this.timeTableValues[i] = {} ;
      for(let j = 0 ; j < this.days.length; j++){
        this.timeTableValues[i][this.days[j]] = {};
        for(let k = 0 ; k < 2 ; k++){
          this.timeTableValues[i][this.days[j]][k] = '' ;
        }
      }
    }

  }
  ngOnDestroy(){
    this.subscription.unsubscribe() ;
  }

}
