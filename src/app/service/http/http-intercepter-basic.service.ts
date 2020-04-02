import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicService implements HttpInterceptor {

  constructor(private basicAuthService: BasicAuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // let username = 'jecapereca'
    // let password = 'dummy'
    // let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)

    let basicAuthHeaderString = this.basicAuthService.getAuthenticatedToken();
    let username = this.basicAuthService.getAuthenticatedUser();

    if(basicAuthHeaderString && username){
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      })
    }
    
    return next.handle(request);
  }

}
