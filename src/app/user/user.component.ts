import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { User } from '../models/user.model';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];

  constructor(private router: Router, private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.findAll()
      .subscribe(data => {
        this.users = data;
      });
  };

  deleteById(user: User): void {
    this.userService.deleteById(user)
      .subscribe(() => {
        this.users = this.users.filter(u => u !== user);
      });
  }

}