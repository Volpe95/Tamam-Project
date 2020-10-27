import {BehaviorSubject , Observable} from 'rxjs' ;
import { Injectable } from '@angular/core';
import {studentTamam} from '../tamam-entry/studentTamam.interface';
import {TimeTableSlot} from '../time-table-entry/timeTableSlot.interface';

import {Subject} from '../add-subject/Subject.interface';
import {sendPercentage} from '../calculate-percentages/calculate-percentages.interface';

@Injectable({ providedIn: 'root' })

export class ComponentCommunication{

    constructor(){}
    // Communcation for Calculate Percentage Component
    private CalculatePercentage = new BehaviorSubject<sendPercentage>(null);
    CalculatePercentageMsg = this.CalculatePercentage.asObservable();

    SendCalculatePercentageMsg(message: sendPercentage) {
        this.CalculatePercentage.next(message)
      }


    // Communcation for Add Subject Component
    private addSubject = new BehaviorSubject<Subject>(null) ;
    addSubjectMsg = this.addSubject.asObservable() ;

    SendAddSubjectMsg(message){
      this.addSubject.next(message) ;
    }


    // Coomuncation for timeTable Component
    private timeTableSlot = new BehaviorSubject<TimeTableSlot[]>(null);
    timeTableSlotMsg = this.timeTableSlot.asObservable() ;

    sendTimeTableSlot(message : TimeTableSlot[]){
      this.timeTableSlot.next(message) ;
    }

    // Attendance Entry Communication

    private attendanceEntry = new BehaviorSubject<studentTamam>(null);
    attendanceEntryMsg = this.attendanceEntry.asObservable() ;

    sendAttendanceEntryMsg(message : studentTamam){
      this.attendanceEntry.next(message) ;
    }

    // Attendance Entry Communication send cur date tamams

    private curDateTamams = new BehaviorSubject('');
    curDateTamamsMsg = this.curDateTamams.asObservable() ;

    sendCurDateTamamsMsg(message){
      this.curDateTamams.next(message);
    }
    // TamamEntry communication

    private TamamEntry = new BehaviorSubject('');
    TamamEntryMsg = this.TamamEntry.asObservable() ;

    sendTamamEntryMsg(message: any){
      this.TamamEntry.next(message) ;
    }
}
