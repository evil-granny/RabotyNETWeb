import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Vacancy} from '../models/vacancy.model';
import {VacancyService} from '../services/vacancy.service';
import {CompanyService} from '../services/company.service';
import {Observable} from 'rxjs';
import {Requirement} from '../models/requirement.model';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rabotyNet',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']
})
export class VacancyComponent implements OnInit {
  vacancies: Observable<Vacancy[]>;
  requirements: Observable<Requirement[]>;

  p: number = 1;

  vacancy: Vacancy = new Vacancy();

  constructor(private router: Router, private vacancyService: VacancyService, private companyService: CompanyService) {
  }

  ngOnInit() {
    this.reloadData();
  };
  

  reloadData() {
     this.vacancyService.findAll().subscribe(
       data => {
         this.vacancies = data;
         console.log(this.vacancies);
       }
     );
  }

  gotoList() {
    this.router.navigate(['/vacancies']);
  }

  update(vacancyId): void {
    this.vacancyService.update(this.vacancyService.get(vacancyId))
      .subscribe(data => {
        this.gotoList();
      }, error => console.error(error));
  };

  deleteById(id: number): void {
    this.vacancyService.deleteById(id)
      .subscribe(
        data => {
          this.reloadData();
        },
        error => console.log(error));
  };

}
