import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentCommunication } from 'src/app/shared/ComponentCommunication.service';
import { utils } from 'src/utils/utils.service';
import { Lewa2TalbaTamam } from '../Lewa2TalbaTamam.interface';

@Component({
  selector: 'app-student-services-records',
  templateUrl: './student-services-records.component.html',
  styleUrls: ['./student-services-records.component.css']
})
export class StudentServicesRecordsComponent implements OnInit , OnDestroy{

  Tamams : Lewa2TalbaTamam[] = [] ;
  subscribtion : Subscription;
  constructor(private sendMsg: ComponentCommunication , private utils: utils) { }
  convertEnToAr = this.utils.convertEnToAr;
  compare(a: Lewa2TalbaTamam , b: Lewa2TalbaTamam) {
    (a.tamamType > b.tamamType)? 1:-1;
  }

  ngOnInit(): void {

    this.subscribtion = this.sendMsg.studentServicesMsg.subscribe(message => {
      console.log(message);
      if(message === null){
        return ;
      }
      this.Tamams = message ;
      if(this.Tamams !== null && this.Tamams.length > 0){

/*         this.Tamams.sort((a , b) => {
          return a.tamamType > b.tamamType ? 1 : (a.tamamType === b.tamamType ?
            (a.className > b.className? 1:-1): -1);
        });
 */      }

      this.sendMsg.sendStudentServicesMsg(null);
    })
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }

  deleteStudentServiceTamam(id: number){
    this.sendMsg.sendStudentServiceIDMsg(id);
  }
}
