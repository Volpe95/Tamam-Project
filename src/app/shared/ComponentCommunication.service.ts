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
}
