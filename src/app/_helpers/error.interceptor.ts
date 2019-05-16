import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(err => {
      console.log('---------SOME BACK ERROR--------')
      console.log(err)
      console.log(err.status)
      if (err.status === 401) {
        console.log('========== ERRORS ==========')
        console.log(err.status);
        // this.router.navigate(['/nonauthorized']);
      }
      if (err.status === 403) {
        console.log('========== ERRORS ==========')
        console.log(err.status);
        this.router.navigate(['/accessDenied']);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
