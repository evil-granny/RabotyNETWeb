import {Component, Inject, OnInit, Optional} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { User } from '../../models/user.model';
import { Role } from '../../models/roles.model';
import { UserPrincipal } from '../../models/userPrincipal.model';

import { UserService } from '../../services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { ComfirmComponent } from '../../confirm/comfirm.component';
import {APP_CONFIG, IAppConfig} from '../../app.config';

@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],

})
export class AddUserComponent implements OnInit {

  currentUser: UserPrincipal;
  users: User[];
  foundUser: User[];
  user: User = new User();
  error: any;
  enabled: any;
  valid: any;
  credentials = { username: '', password: '' };

  constructor(private router: Router, private userService: UserService, public dialog: MatDialog,
    private authenticationService: AuthenticationService, @Inject(APP_CONFIG) private rabotyNETEndpoint: IAppConfig) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    document.getElementById('defaultOpen').click();
  }

  findByEmail() {
    this.userService.findByEmail(this.user)
      .subscribe(data => {
        this.foundUser = data;
        if (this.foundUser) {
          this.openModal('There is an account with that email! Try with another one or login, please!');
          this.credentials.username = this.user.login;
        } else {
          this.create();
        }
      });
  }

  create(): void {
    this.userService.insert(this.user)
      .subscribe(data => {
        this.openModal('User has been created successfully. Confirm your email and login into site!');
        this.router.navigateByUrl( this.rabotyNETEndpoint.allowOrigin + '/');
      });
  }

  public openModal(name: String) {
    this.dialog.open(ComfirmComponent, { data: { name } });
  }

  validUser(): void {
    this.userService.validUser(this.credentials.username)
      .subscribe(data => {
        this.enabled = data;
        if (this.enabled === true) {
          this.signin();
        } else if (this.enabled === 'User not found!') {
          this.openModal('Unfortunately user not found! You can sign up.');
          this.credentials.password = '';
        } else if (this.enabled === false) {
          this.validToken();
        }
      });
  }

  signin() {
    this.authenticationService.authenticate(this.credentials).subscribe(data => {
      if (this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_ADMIN) > -1) {
        this.router.navigateByUrl('/companies');
      }
      if (this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1) {
        this.router.navigateByUrl('/companies/my');
      }
      if (this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_USER) > -1) {
        this.router.navigateByUrl('/resume/user');
      }
    },
      error => {
        this.openErrorModal('Wrong credentials! Please try again.');
        this.router.navigateByUrl('/users/auth');
      });
  }

  validToken() {
    this.userService.findToken(this.credentials.username)
      .subscribe(data => {
        this.valid = data;
        if (this.valid === 'valid') {
          this.openModal('Confirm you email, please!');
          this.credentials.password = '';
        } else {
          this.resendToken();
        }
      });
  }

  resendToken() {
    this.userService.resendToken(this.credentials.username)
      .subscribe(data => {
        this.openModal('Your account is not confirmed. Confirmation message has been sent to you again');
      });
    this.credentials.password = '';
  }

  public openErrorModal(name: String) {
    this.dialog.open(ComfirmComponent, { data: { name } });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_ADMIN) > -1;
  }

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

}
