import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ComfirmComponent} from '../confirm/comfirm.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.scss']
})

export class PasswordForgotComponent {

  userLogin = {username: ''};

  private resetPasswordUrl = 'http://localhost:8080/resetPassword';
  private errors: any;

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) {
  }

  forgotPassword() {
    const authHeader = {
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Content-Type': 'application/json'
    };

    const httpOptions = {
      headers: new HttpHeaders(authHeader)
    };

    const observable = this.http.post<any>(this.resetPasswordUrl, this.userLogin, httpOptions);
    observable.subscribe(result =>  {
      },
        error => {
          this.errors = error;
          this.openErrorModal(this.errors);
        },
    () => {
      this.openSuccessModal('Please check mail for further instructions!');
      this.router.navigate(['/vacancies']);
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
