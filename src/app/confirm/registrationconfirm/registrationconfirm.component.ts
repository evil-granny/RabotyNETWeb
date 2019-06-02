import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrationconfirm',
  templateUrl: './registrationconfirm.component.html',
  styleUrls: ['./registrationconfirm.component.scss']
})
export class RegistrationconfirmComponent implements OnInit {

  token: string;
  valid: string;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

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
        location.replace("http://localhost:4200/users/auth")

      });
  }

}
