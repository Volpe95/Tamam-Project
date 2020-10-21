import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class Student{
    
    ID: number ; 
    name : string ; 
    year: number ; 
    class: string ;

    constructor(private studentInfo){
        this.ID = studentInfo.ID ; 
        this.name = studentInfo.name ; 
        this.year = studentInfo.year ; 
        this.class = studentInfo.class;
    }
    
    /*studentInfoJson(){
        return {
            ID: this.ID , 
            name: this.name,
            year: this.year, 
            class: this.class
        };
    }*/

}