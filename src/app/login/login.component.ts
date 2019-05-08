import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {SearchCVService} from '../services/search-cv.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent {

  credentials = {username: '', password: ''};

  constructor(private app: AuthenticationService, private searchCVService: SearchCVService, private router: Router) {
  }

  login() {
    const user = this.app.authenticate(this.credentials).subscribe(data => {
      console.log('user');
      console.log(data);
      this.router.navigateByUrl('/');
    });
  }

}
