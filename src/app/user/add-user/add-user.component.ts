import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ModalContext } from '../../modal/modal-context';
import { ModalContainerComponent } from '../../modal/modal-container/modal-container.component';
@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  implements OnInit {

 
  users: User[];  
  foundUser: User[];
  user: User = new User();


  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.findAll()
      .subscribe(data => {
        this.users = data;
      });
  };

  findByEmail(){
    this.userService.findByEmail(this.user)
      .subscribe(data => {
        this.foundUser = data;
      });
  }
  create(): void {
    this.findByEmail();
    if(this.foundUser != null){
      window.alert("There is an account with that email! Try with another or login, please!")
      console.log(this.foundUser)
    }else{ 
    this.userService.insert(this.user, this.users)
      .subscribe(data => {
        alert("User has been created successfully.");
      });}
  };


}