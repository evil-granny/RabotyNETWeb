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
    this.userService.findAll()
      .subscribe(data => {
        this.users = data;
      });
  };

  findByEmail(user: User) {
    this.userService.findByEmail(user)
      .subscribe(data => {
        this.foundUser = data;
      });
  }

  create(): void {
    this.userService.insert(this.user, this.users)
      .subscribe(data => {
        console.log(data);
        this.openModal("User has been created successfully. Confirm your email and login into site!");
      });
  };

  public openModal(name: String) {
    this.dialog.open(ComfirmComponent, { data: { name } })
  }


}