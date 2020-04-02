import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { API_URL } from 'src/app/app.constants';


export class HelloWorldBean{
  constructor(public message: string){}   
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  executeHelloWorldBeanService(){
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean`); 
  }

  executeHelloWorldServiceWithVariable(name){
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // })
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world/path-variable/${name}`);
  }

  // createBasicAuthenticationHttpHeader(){
  //   let username = 'jecapereca'
  //   let password = 'dummy'
  //   let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)
  //   return basicAuthHeaderString;
  // }

}
