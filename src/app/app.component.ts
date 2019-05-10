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

  currentUser: UserPrincipal;

  title = 'Angular Pro Sidebar';

  constructor(public sidebarservice: SidebarService, private app: AuthenticationService, private http: HttpClient, private router: Router) {

    this.app.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles  &&  this.currentUser.roles.indexOf(Role.ROLE_ADMIN) > -1;
  }

  get isCowner() {
    return this.currentUser && this.currentUser.roles  &&  this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  get isUser() {
    return this.currentUser && this.currentUser.roles  &&  this.currentUser.roles.indexOf(Role.ROLE_USER) > -1;
  }

  logout() {
    this.app.logout();
    this.router.navigate(['/login']);
  }

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
