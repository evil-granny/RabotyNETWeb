import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ComfirmComponent } from '../../confirm/comfirm.component';
import { MatDialog } from '@angular/material';
import { RegistrationconfirmComponent } from 'src/app/confirm/registrationconfirm/registrationconfirm.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgForm } from '@angular/forms';
import { Role } from '../../models/roles.model';
import { UserPrincipal } from '../../models/userPrincipal.model';
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
  resendedStatus: any;
  valid: any;
  credentials = { username: '', password: '' };

  constructor(private router: Router, private userService: UserService, public dialog: MatDialog, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    document.getElementById("defaultOpen").click();
  }


  openCity(evt, cityName) {
    var i: number, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }


  findByEmail() {
    this.userService.findByEmail(this.user)
      .subscribe(data => {
        this.foundUser = data;
        if (this.foundUser) {
          this.openModal("There is an account with that email! Try with another one or login, please!");
          this.credentials.username = this.user.login;
        } else {
          this.create();
        }
      });
  }

  create(): void {
    this.userService.insert(this.user, this.users)
      .subscribe(data => {
        this.openModal("User has been created successfully. Confirm your email and login into site!");
        this.router.navigateByUrl('http://localhost:4200/');
      });
  };

  public openModal(name: String) {
    this.dialog.open(ComfirmComponent, { data: { name } })
  }

  public openConfirmModal() {
    this.dialog.open(RegistrationconfirmComponent)
  }

  validUser(): void {
    this.userService.validUser(this.credentials.username)
      .subscribe(data => {
        this.enabled = data;
        if (this.enabled == true) {
          this.signin();
        } else if (this.enabled == "User not found!") {
          this.openModal("Unfortunately user not found! You can sign up.");
          this.credentials.password = "";
        } else if (this.enabled == false) {
          this.validToken();
        }
      });
  };

  signin() {
    this.authenticationService.authenticate(this.credentials).subscribe(data => {
      if (this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_ADMIN) > -1) {
        this.router.navigateByUrl('/companies');
      }
      if (this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1) {
        this.router.navigateByUrl('/companies/my');
      }
      if (this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_USER) > -1) {
        this.router.navigateByUrl('/userCV');
      }
    });
  }

  validToken() {
    this.userService.findToken(this.credentials.username)
      .subscribe(data => {
        this.valid = data;
        var email = this.credentials.username;
        if (this.valid == "valid") {
          this.openModal("Confirm you email, please!");
          this.credentials.password = "";
        } else {
          this.openModal("Your account is not confirmed. Resend confirmation message?");
          this.credentials.password = "";
          this.userService.resendToken(email);
        }
      })
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_ADMIN) > -1;
  }

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }
}
