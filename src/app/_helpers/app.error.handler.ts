import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AppErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {
  }

  handleError(error) {

    const router = this.injector.get(Router);
    console.log('URL: ' + router.url);
    console.error('An error occurred:', error.message);

    alert(error);
  }
}
