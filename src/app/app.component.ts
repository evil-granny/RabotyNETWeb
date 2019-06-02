import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Search } from './models/search/search.model';
import { Role } from './models/roles.model';
import { UserPrincipal } from './models/userPrincipal.model';

import { PersonService } from './services/profile/person.service';
import { PhotoService } from './services/profile/photo.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'RabotyNet';

  currentUser: UserPrincipal;
  avatar: any;

  search: Search = new Search();

  searchForm = true;
  searchShown = false;
  vacancySelect = false;
  resumeSelect = true;

  constructor(private app: AuthenticationService, private router: Router, private personService: PersonService, private photoService: PhotoService, private sanitizer: DomSanitizer) {
    this.app.currentUser.subscribe(data => this.currentUser = data);

    if (this.currentUser) {
      this.personService.findById(this.currentUser.userId)
        .subscribe(data => {
          if (data.photo != null) {
            this.loadPhoto(data.photo.photoId);
          }
        });
    }
  }

  loadPhoto(photoId: BigInteger) {
    this.photoService.loadAvatar(photoId)
      .subscribe(data => {
        this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64," + data);
      });
  }

  logout() {
    this.app.logout();
    this.vacancySelect = false;
    window.location.reload();
    this.router.navigateByUrl('/vacancies');
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_ADMIN) > -1;
  }

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  get isUser() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_USER) > -1;
  }

  hide() {
    this.searchForm = true;
    this.searchShown = false;
  }

  showSearchForm() {
    this.searchForm = false;
    this.searchShown = true;
  }

  selectDocument() {
    switch (this.search.searchDocument) {
      case 'resume':
        this.resumeSelect = false;
        this.vacancySelect = true;
        this.search.searchSort = 'firstName';
        this.search.searchParameter = 'position';
        break;
      case 'vacancies':
        this.resumeSelect = true;
        this.vacancySelect = false;
        this.search.searchSort = 'position';
        this.search.searchParameter = 'position';
        break;
    }
  }

  startSearch() {
    switch (this.search.searchDocument) {
      case 'resume':
        this.router.navigate(['/searchResume', {
          searchDoc: this.search.searchDocument,
          searchText: this.search.searchText,
          searchParameter: this.search.searchParameter
        }]);
        break;
      case 'vacancies':
        this.router.navigate(['/searchVacancy', {
          searchDoc: this.search.searchDocument,
          searchText: this.search.searchText,
          searchParameter: this.search.searchParameter
        }]);
        break;
    }

    this.hide();
  }

}
