import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../login/auth.service';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title = 'Demo';
  greeting = {};

  constructor(private app: AuthService, private http: HttpClient) {
    http.get('resource').subscribe(data => this.greeting = data);
  }

  authenticated() { return this.app.authenticated; }

}
