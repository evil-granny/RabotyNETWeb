import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { UserService } from 'src/app/services/user.service';

import { ComfirmComponent } from '../comfirm.component';
import {IAppConfig} from '../../app.config';

@Component({
  selector: 'app-registrationconfirm',
  templateUrl: './registrationconfirm.component.html',
  styleUrls: ['./registrationconfirm.component.scss']
})
export class RegistrationconfirmComponent implements OnInit {

  token: string;
  valid: string;

  constructor(private route: ActivatedRoute, private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    })

    this.validToken();
  }

  validToken() {
    this.userService.validToken(this.token)
      .subscribe(data => {
        this.valid = data;
        location.replace( new IAppConfig().allowOrigin.toString() + '/users/auth');
      });
  }

  public openModal(name: String) {
    this.dialog.open(ComfirmComponent, { data: { name } });
  }

}
