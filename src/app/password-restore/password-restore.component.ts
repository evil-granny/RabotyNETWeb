import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ComfirmComponent} from '../confirm/comfirm.component';
import {MatDialog} from '@angular/material';
import {APP_CONFIG, IAppConfig} from '../app.config';

@Component({
  selector: 'app-password-restore',
  templateUrl: './password-restore.component.html',
  styleUrls: ['./password-restore.component.scss']
})
export class PasswordRestoreComponent implements OnInit {

  token: string;
  valid: string;

  changePassword = {newPassword: '', confirmPassword: ''};

  private changePasswordUrl = this.rabotyNETEndpoint.apiEndpoint + '/password/change';
  private errors: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private userService: UserService, private router: Router, public dialog: MatDialog, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
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
        this.openErrorModal('Your token invalid or expired. Please try again');
      },
      () => {
        this.openSuccessModal('Password restored successfully! Please sign in.');
        this.router.navigate(['/users/auth']);
      }
    );
    }

  public openErrorModal(name: String) {
    this.dialog.open(ComfirmComponent, { data: { name } });
  }
  public openSuccessModal(name: String) {
    this.dialog.open(ComfirmComponent, { data: { name } });
  }
}
