import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  // authenticate(username, password){
  //   console.log('before ' + this.isUserLoggedIn());
  //   if (username === 'jecapereca' && password === 'dummy'){
  //     sessionStorage.setItem('authenticaterUser', username);
  //     console.log('after ' + this.isUserLoggedIn());
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  executeBasicAuthenticationService(username, password){

    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return this.http.get<BasicAuthBean>(`http://localhost:8080/basicauth`, {headers}).pipe(
      map(
        data => {
          sessionStorage.setItem('authenticaterUser', username);
          sessionStorage.setItem('token', basicAuthHeaderString);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem('authenticaterUser');
  }

  getAuthenticatedToken(){
    return sessionStorage.getItem('token');
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticaterUser');
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem('authenticaterUser');
    sessionStorage.removeItem('token');
  }

}

export class BasicAuthBean{

  constructor(public message:string){}

}