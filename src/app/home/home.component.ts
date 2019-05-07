import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title = 'Demo';
  greeting = {};

  constructor(private app: AuthenticationService, private http: HttpClient) {
    http.get('resource').subscribe(data => this.greeting = data);
  }

  authenticated() { return this.app.authenticated; }

}
