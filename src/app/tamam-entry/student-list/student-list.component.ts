import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/shared/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  constructor() { }

  Students: Student[] = [
    new Student({ID: 4774 , name : "Mahmoud Kassem" , year: 5 , class :"Communication"}), 
    new Student({ID: 8745 , name : "Mahmoud Naguib" , year: 5 , class :"Computer"})    
  ];

  ngOnInit(): void {
  }

}
