import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class Communication{
    private message = new BehaviorSubject('');
    sharedMessage = this.message.asObservable();
  
    nextMessage(message: any) {
        this.message.next(message)
      }
    

}
