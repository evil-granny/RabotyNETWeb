import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpXsrfTokenExtractor} from '@angular/common/http';
import { Observable } from 'rxjs';

import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor, private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    const token = this.tokenExtractor.getToken() as string;
    console.log('---------REQUEST BEFORE---------')
    console.log(request)
    if (currentUser && currentUser.token && token !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUser.token}`,
          // 'X-XSRF-TOKEN': token,
        },
        // withCredentials: true,
      });
    }
    console.log('---------REQUEST AFTER---------')
    console.log(request)

    return next.handle(request);
  }

}
