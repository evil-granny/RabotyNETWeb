import { Component } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Search } from './models/SearchModel/search.model';
import { UserPrincipal } from './models/userPrincipal.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  search: Search = new Search();
  currentUser: UserPrincipal;

  constructor(private app: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    this.app.currentUser.subscribe(x => this.currentUser = x);
  };
  
  title = 'RabotyNet';

  searchCVPage() {
    this.router.navigateByUrl('/searchCV');
  }

  startSearch() {
    this.router.navigate(['/vacancies/search', {doc: this.search.searchDocument, text: this.search.searchText, sParam: this.search.searchParameter}]);
  }
}
