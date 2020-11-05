import {BehaviorSubject , Observable} from 'rxjs' ;
import { Injectable } from '@angular/core';
import {studentTamam} from '../tamam-entry/studentTamam.interface';
import {TimeTableSlot} from '../time-table-entry/timeTableSlot.interface';

import {Subject} from '../add-subject/Subject.interface';
import {sendPercentage} from '../calculate-percentages/calculate-percentages.interface';
import { Lewa2TalbaTamam } from '../students-services/Lewa2TalbaTamam.interface';

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

    // Student Services Component

    private studentServices = new BehaviorSubject<Lewa2TalbaTamam[]>(null);
    studentServicesMsg = this.studentServices.asObservable();

    sendStudentServicesMsg(message : Lewa2TalbaTamam[]){
      this.studentServices.next(message);
    }

    private studentServiceID = new BehaviorSubject<number>(null);
    studentServiceIDMsg = this.studentServiceID.asObservable();

    sendStudentServiceIDMsg(message: number){
      this.studentServiceID.next(message);
    }

    // send false Tamams at students Services Comparisons records

    private falseTamam = new BehaviorSubject<any>(null);
    falseTamamMsg = this.falseTamam.asObservable() ;

    sendFalseTamamMsg(message: any){
      this.falseTamam.next(message);
    }

    // send Gez2at to geza2at records

    private geza2at = new BehaviorSubject<any[]>(null);
    geza2atMsg = this.geza2at.asObservable() ;

    sendGeza2atMsg(message: any[]){
      this.geza2at.next(message);
    }
}
