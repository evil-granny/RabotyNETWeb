import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.scss']
})

export class PasswordForgotComponent {

  userLogin = {username: ''};

  private resetPasswordUrl = 'http://localhost:8080/resetPassword';

  constructor(private http: HttpClient, private router: Router) {
  }

  forgotPassword() {
    const authHeader = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };

    const httpOptions = {
      headers: new HttpHeaders(authHeader)
    };

    const observable = this.http.post<any>(this.resetPasswordUrl, this.userLogin, httpOptions);
    observable.subscribe(data => {
      }
    )
    this.router.navigateByUrl('/vacancies');
  }
}
