import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpXsrfTokenExtractor } from '@angular/common/http';

import { AuthenticationService } from '../services/authentication.service';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor, private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    const token = this.tokenExtractor.getToken();
    if (currentUser && currentUser.token && token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUser.token}`,
          'X-XSRF-TOKEN': token,
        },
      });
    }
    return next.handle(request);
  }

}
