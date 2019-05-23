import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Vacancy} from '../models/vacancy/vacancy.model';
import {VacancyService} from '../services/vacancy.service';
import {CompanyService} from '../services/company.service';
import {Observable} from 'rxjs';
import {Requirement} from '../models/requirement.model';
import {AuthenticationService} from '../services/authentication.service';
import {Role} from '../models/roles.model';
import {UserPrincipal} from '../models/userPrincipal.model';
import {Search} from '../models/SearchModel/search.model';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rabotyNet',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']
})
export class VacancyComponent implements OnInit {
  vacancies: Observable<Vacancy[]>;
  currentUser: UserPrincipal;

  vacancy: Vacancy = new Vacancy();

  page: number = 0;
  count: number = 9;
  size: number = 0;

  constructor(private app: AuthenticationService, private router: Router, private route: ActivatedRoute, private vacancyService: VacancyService, private companyService: CompanyService) {
    this.app.currentUser.subscribe(x => this.currentUser = x);
  };

  ngOnInit() {
    this.findAll();
  };

  findAll() {
     this.vacancyService.findAllWithPagination(this.page * this.count).subscribe(
       data => {
         this.vacancies = data.vacancies;
         this.size = data.count;
       }
     );
  }

  gotoList() {
    this.router.navigate(['/vacancies']);
  };

  canPreviousPage() : boolean {
    return this.page > 0;
  }

  previousPage () {
    if(this.canPreviousPage()) {
      this.page = this.page - 1;
      this.findAll();
    }
  }

  canNextPage() : boolean {
    return (this.page + 1) * this.count < this.size;
  }

  nextPage() {
    if(this.canNextPage()) {
      this.page = this.page + 1;
      this.findAll();
    }
  }

}
