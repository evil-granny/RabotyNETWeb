import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ComfirmComponent } from '../../confirm/comfirm.component';
import { MatDialog } from '@angular/material';
import { RegistrationconfirmComponent } from 'src/app/confirm/registrationconfirm/registrationconfirm.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],

})
export class AddUserComponent implements OnInit {


  users: User[];
  foundUser: User[];
  user: User = new User();
  error: any;
  enabled: any;
  valid:any;
  credentials = { username: '', password: '' };

  constructor(private router: Router, private userService: UserService, public dialog: MatDialog, private app: AuthenticationService) {

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
    console.log(this.foundUser == undefined);
    this.userService.findByEmail(this.user)
      .subscribe(data => {
        this.foundUser = data;
        if (this.foundUser) {
          this.openModal("There is an account with that email! Try with another one or login, please!")
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
        console.log(this.enabled);
        if (this.enabled == true) {
          this.signin();
        } else if (this.enabled == "User not found!") {
          this.openModal("Unfortunately user not found! You can sign up.");
        } else if (this.enabled == false) {
          this.validToken();
        }
      });
  };

  signin() {
    const user = this.app.authenticate(this.credentials).subscribe(data => {
      this.router.navigateByUrl('/vacancies');
    });
  }

  validToken() {
    this.userService.findToken(this.credentials.username)
    .subscribe(data => {
      this.valid = data;
      console.log(this.valid);
      if (this.valid == "valid") {
        this.openModal("Confirm you email, please!");
      } else  {
        this.openModal("Your account is not confirmed. Resend confirmation message?");
        this.userService.resendToken(this.credentials.username);
      } 
    })
}
}
