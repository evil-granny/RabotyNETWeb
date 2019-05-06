import { Component } from '@angular/core';
import { SidebarService } from './sidebar/sidebar.service';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './login/auth.service';
import { Router } from '@angular/router';
// import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Angular Pro Sidebar';

  constructor(public sidebarservice: SidebarService, private app: AuthService, private http: HttpClient, private router: Router) {

    this.app.authenticate(undefined);
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

  logout() {
    // @ts-ignore
    this.http.post('logout', {}).finally(() => {
      this.app.authenticated = false;
      this.router.navigateByUrl('/login');
    }).subscribe();
  }

}
