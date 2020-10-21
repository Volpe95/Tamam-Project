import {Subject , BehaviorSubject , Observable} from 'rxjs' ;
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ComponentCommunication{

    // Communcation for Calculate Percentage Component
    private CalculatePercentage = new BehaviorSubject('');
    CalculatePercentageMsg = this.CalculatePercentage.asObservable();

    SendCalculatePercentageMsg(message: any) {
        this.CalculatePercentage.next(message)
      }


    // Communcation for Add Subject Component
    private addSubject = new BehaviorSubject('') ;
    addSubjectMsg = this.addSubject.asObservable() ;

    SendAddSubjectMsg(message : any){
      this.addSubject.next(message) ;
    }


    // Coomuncation for timeTable Component
    private timeTableSlot = new BehaviorSubject('');
    timeTableSlotMsg = this.timeTableSlot.asObservable() ;

    sendTimeTableSlot(message : any){
      this.timeTableSlot.next(message) ;
    }

    // Attendance Entry Communication

    private attendanceEntry = new BehaviorSubject('');
    attendanceEntryMsg = this.attendanceEntry.asObservable() ;

    sendAttendanceEntryMsg(message : any){
      this.attendanceEntry.next(message) ;
    }

    // TamamEntry communication

    private TamamEntry = new BehaviorSubject('');
    TamamEntryMsg = this.TamamEntry.asObservable() ;

    sendTamamEntryMsg(message: any){
      this.TamamEntry.next(message) ;
    }
}
