import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
  private router: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    // console.log('Init Start')
    this.route.queryParams.subscribe(params => {
      // console.log(params);
      this.token = params.token;
      // console.log('----------Token---------');
      // console.log(params['token']);
    })

    this.validToken();
  }

  validToken() {
    this.userService.validToken(this.token)
      .subscribe(data => {
        this.valid = data;
        if (this.valid == 'confirmed') {
        }
        // console.log(this.valid);
        // console.log(this.token);
      });
  }

  restorePassword() {

    const authHeader = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };

    const httpOptions = {
      headers: new HttpHeaders(authHeader)
    };

    // if (this.angular.equals(this.changePassword.newPassword, this.changePassword.confirmPassword)) {
    //   console.log('New Password = ' + this.changePassword.newPassword)
    //   console.log('Confirm Password = ' + this.changePassword.confirmPassword)
    //   console.log('Result = ' + this.angular.equals(this.changePassword.newPassword, this.changePassword.confirmPassword))
      const observable = this.http.post<any>(this.changePasswordUrl, {'userResetPasswordToken': this.token, 'resetPassword': this.changePassword.newPassword}, httpOptions);
    observable.subscribe(data => {
      }
    )
      console.log(this.token)
      console.log(this.changePassword.newPassword)
      this.router.navigateByUrl('/vacancies');
    }
}
