import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticaterUser'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  executeBasicAuthenticationService(username, password){

    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return this.http.get<BasicAuthBean>(`${API_URL}/basicauth`, {headers}).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken(){
    return sessionStorage.getItem(TOKEN);
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

}

export class BasicAuthBean{

  constructor(public message:string){}

}