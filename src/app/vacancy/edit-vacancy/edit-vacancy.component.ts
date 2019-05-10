import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Vacancy} from '../../models/vacancy.model';
import {VacancyService} from '../../services/vacancy.service';
import {Requirement} from 'src/app/models/requirement.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rabotyNet',
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.css']
})
export class EditVacancyComponent implements OnInit {

  vacancy: Vacancy = new Vacancy();
  requirements:  Requirement[] = Array<Requirement>();

  constructor(private route: ActivatedRoute, private router: Router, private vacancyService: VacancyService) {
  }

  ngOnInit(): void {
    let vacancyId = this.route.snapshot.paramMap.get('vacancyId');
    if (vacancyId !== null) {
      this.vacancyService.get(vacancyId)
        .subscribe(data => {
          this.vacancy = data;
        });
    }
  }

  create(): void {
    this.vacancyService.createVacancy(this.vacancy,this.route.snapshot.paramMap.get('companyId'))
      .subscribe(data => {
        this.router.navigate(['/viewCompany/'+ this.route.snapshot.paramMap.get('companyId')]);
      }, error => console.error(error));
  };

  update(): void {
    console.log(this.vacancy);
      this.vacancyService.update(this.vacancy)
       .subscribe(data => {
         this.gotoList();
       }, error => console.error(error));

  };


  gotoList() {
    this.router.navigate(['/vacancies']);
  }

  employment = 'FULL PART_TIME HOURLY TRAINEE'.split(' ');
  selectedEmployment = 'FULL';

  changingValue(newValue) {
    this.selectedEmployment = newValue;
  }

  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  Requirement: Array<any>;

  addFieldValue() {
    console.log(this.vacancy);
    this.vacancy.requirements.push(new Requirement());
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

}
