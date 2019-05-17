import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ComfirmComponent } from '../../confirm/comfirm.component';
import { MatDialog } from '@angular/material';
@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  users: User[];
  foundUser: User[];
  user: User = new User();
  error: any;

  constructor(private router: Router, private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  findByEmail() {
    this.userService.findByEmail(this.user)
      .subscribe(data => {
        this.foundUser = data;
        console.log(this.foundUser);
        if (this.foundUser.length > 0) {
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
        location.replace("http://localhost:4200/") 
      });
  };

  public openModal(name: String) {
    this.dialog.open(ComfirmComponent, { data: { name } })
  }


}
