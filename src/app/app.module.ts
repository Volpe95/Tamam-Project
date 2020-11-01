import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TamamEntryComponent } from './tamam-entry/tamam-entry.component';
import { StudentComponent } from './tamam-entry/student/student.component';
import { StudentListComponent } from './tamam-entry/student-list/student-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TimeTableEntryComponent } from './time-table-entry/time-table-entry.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { CalculatePercentagesComponent } from './calculate-percentages/calculate-percentages.component';
import { AttendanceRecordsComponent } from './attendance-records/attendance-records.component';
import { StudentsServicesComponent } from './students-services/students-services.component';
import { ComparisonsComponent } from './comparisons/comparisons.component';
import { ManageStudentsComponent } from './manage-students/manage-students.component';
import { TimetableComponent } from './time-table-entry/timetable/timetable.component';
import { TamamEntryDialougeComponent } from './tamam-entry/tamam-entry-dialouge/tamam-entry-dialouge.component';
import { SubjectsRecordsComponent } from './add-subject/subjects-records/subjects-records.component';
import { PercentageRecordsComponent } from './calculate-percentages/percentage-records/percentage-records.component';
import { StudentServicesEntryComponent } from './students-services/student-services-entry/student-services-entry.component';
import { StudentServicesRecordsComponent } from './students-services/student-services-records/student-services-records.component';
import { ComparionRecordsComponent } from './comparisons/comparion-records/comparion-records.component';
import { Geza2atComponent } from './geza2at/geza2at.component';
import { Geza2atRecordsComponent } from './geza2at/geza2at-records/geza2at-records.component';


const appRoutes: Routes = [
  {path: 'attendance-entry' ,  component: TamamEntryComponent},
  {path: 'timetable-entry' , component: TimeTableEntryComponent},
  {path: 'add-subject' ,  component: AddSubjectComponent},
  {path: 'percentages' , component: CalculatePercentagesComponent},
  {path: 'attendance-records' , component: AttendanceRecordsComponent},
  {path: 'students-services-entry' , component: StudentsServicesComponent},
  {path: 'comparisons' , component: ComparisonsComponent},
  {path: 'Manage' , component: ManageStudentsComponent},
  {path: 'geza2at' , component: Geza2atComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TamamEntryComponent,
    StudentComponent,
    StudentListComponent,
    TimeTableEntryComponent,
    AddSubjectComponent,
    CalculatePercentagesComponent,
    AttendanceRecordsComponent,
    StudentsServicesComponent,
    ComparisonsComponent,
    ManageStudentsComponent,
    TimetableComponent,
    TamamEntryDialougeComponent,
    SubjectsRecordsComponent,
    PercentageRecordsComponent,
    StudentServicesEntryComponent,
    StudentServicesRecordsComponent,
    ComparionRecordsComponent,
    Geza2atComponent,
    Geza2atRecordsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
