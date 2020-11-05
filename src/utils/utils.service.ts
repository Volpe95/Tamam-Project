import {Injectable} from '@angular/core';
@Injectable({ providedIn: 'root' })

export class utils{
  convertEnToAr(englishNumberAsString: any){
    if(!englishNumberAsString){
      return null ;
    }
    var ret = "" ;
    englishNumberAsString = String(englishNumberAsString);
    for(let i = 0 ; i < englishNumberAsString.length; i++){
      let ch = englishNumberAsString.charCodeAt(i);
      if(ch >= 48 && ch <= 57){
        let newChar = ch + 1584 ;
        ret = ret + String.fromCharCode(newChar);
        continue;
      }
      ret = ret + String.fromCharCode(ch);
    }

    return ret ;
  }

}
