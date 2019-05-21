import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      // 'Cookie': 'session=' + this.cookieService.get('session'),
      withCredentials: true,
    });
    console.log('!!!!!!!!!!!!!!!new outgoing request!!!!!!!!!!!!!!!', request);
    return next.handle(request);
  }

}
