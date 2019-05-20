import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ComfirmComponent } from '../../confirm/comfirm.component';
import { MatDialog } from '@angular/material';
import { RegistrationconfirmComponent } from 'src/app/confirm/registrationconfirm/registrationconfirm.component';
import { LoginComponent } from 'src/app/login/login.component';
import { AnimationMetadataType } from '@angular/animations';
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
  enabled: Boolean;
  credentials = { username: '', password: '' };

  constructor(private router: Router, private userService: UserService, public dialog: MatDialog, private app: AuthenticationService) {

  }

  ngOnInit() {
    document.getElementById("defaultOpen").click();
    // this.openConfirmModal();
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
        console.log(this.foundUser);
         if ((this.foundUser.length > 0)&&(!this.foundUser[0].enabled)) {
          this.openModal("Your email is not confirmed!");
        }
        else if ((this.foundUser.length > 0)&&(this.foundUser[0].enabled)) {
          const user = this.app.authenticate(this.credentials).subscribe(data => {
          this.router.navigateByUrl('/vacancies');
        });
        }
        else if (this.foundUser.length > 0) {
          this.openModal("There is an account with that email! Try with another one or login, please!")
          location.reload(true);
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

  enabledUser(): void {
    this.userService.enabledUser(this.credentials.username)
      .subscribe(data => {
        this.enabled = data;
        if (!this.enabled) {
          this.openModal("Your email is not confirmed!");
        } else { 
          this.signin();
        }
      });
  }; 

  signin() {
    const user = this.app.authenticate(this.credentials).subscribe(data => {
      this.router.navigateByUrl('/vacancies');
    });
  }
}
