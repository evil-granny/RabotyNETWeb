import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-password-restore',
  templateUrl: './password-restore.component.html',
  styleUrls: ['./password-restore.component.scss']
})
export class PasswordRestoreComponent implements OnInit {

  token: string;
  valid: string;

  changePassword = {newPassword: '', confirmPassword: ''};

  private changePasswordUrl = 'http://localhost:8080/changePassword';
  private errors: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
    })

    this.validToken();
  }

  validToken() {
    this.userService.validToken(this.token)
      .subscribe(data => {
        this.valid = data;
        if (this.valid == 'confirmed') {
        }
      });
  }

  restorePassword() {

    const authHeader = {
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    };

    const httpOptions = {
      headers: new HttpHeaders(authHeader), withCredentials: true
    };

    const sendTokenPaasword = {'userResetPasswordToken': this.token, 'resetPassword': this.changePassword.newPassword};
    const observable = this.http.post<any>(this.changePasswordUrl, sendTokenPaasword, httpOptions);
    observable.subscribe(result =>  {
      },
      error => {
        this.errors = error;
        alert(this.errors);
      },
      () => {
        alert('Password restored successfully! Please go to the sign in page');
        this.router.navigate(['/registration']);
      }
    );
    }
}
