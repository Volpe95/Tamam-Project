import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentCommunication } from 'src/app/shared/ComponentCommunication.service';

@Component({
  selector: 'app-comparion-records',
  templateUrl: './comparion-records.component.html',
  styleUrls: ['./comparion-records.component.css']
})
export class ComparionRecordsComponent implements OnInit {

  subscription : Subscription;
  falseTamams : any[] = [] ;

  constructor(private sendMsg: ComponentCommunication) { }

   attributesNames = [
    'firstLectureTamam',
    'secondLectureTamam',
    'thirdLectureTamam',
    'fourthLectureTamam',
    'fifthLectureTamam'
    ];

    ngOnInit(): void {

    this.subscription = this.sendMsg.falseTamamMsg.subscribe(message => {

      if(message === null){
        return ;
      }
      this.falseTamams = message ;
      console.log(message);

      this.falseTamams = this.falseTamams.map(item => {
        var absenceCnt = 0 , color = 'black';
        for(let i = 0 ; i < this.attributesNames.length; i++){
          if(item[this.attributesNames[i]] != '---'
          && item.trueLewa2TalbaTamams.indexOf(item[this.attributesNames[i]]) == -1){
            absenceCnt += 1; color = 'red';
          }
          item[this.attributesNames[i] + 'Color'] = color;
          color = 'black';
        }
        item['absenceCnt'] = absenceCnt;
        return item ;
      });

      this.sendMsg.sendFalseTamamMsg(null);
    });


  }

}
