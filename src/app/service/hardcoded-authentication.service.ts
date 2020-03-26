import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username, password){
    if (username === 'jecapereca' && password === 'dummy'){
      return true;
    } else {
      return false;
    }
  }
}
