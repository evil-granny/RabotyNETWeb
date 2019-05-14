import {Component} from '@angular/core';
import {SidebarService} from './sidebar/sidebar.service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';
import {Role} from './models/roles.model';
import {UserPrincipal} from './models/userPrincipal.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'RabotyNet';
  currentUser: UserPrincipal;

  constructor(public sidebarservice: SidebarService) { }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

}
