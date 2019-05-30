import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Vacancy } from 'src/app/models/vacancy/vacancy.model';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-closed-vacancy',
  templateUrl: './closed-vacancy.component.html',
  styleUrls: ['./closed-vacancy.component.scss']
})
export class ClosedVacancyComponent implements OnInit {

  vacancies: Observable<Vacancy[]>;

  page: number = 0;
  count: number = 9;
  size: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private vacancyService: VacancyService) { }

  ngOnInit() {
    this.findAll();
  };

  findAll() {
    this.vacancyService.findAllClosedVacanciesWithPagination(this.page * this.count).subscribe(data => {
      this.vacancies = data.vacancies;
      this.size = data.count;
    });
  }

  gotoList() {
    this.router.navigate(['/vacancies']);
  }

  canPreviousPage(): boolean {
    return this.page > 0;
  }

  previousPage() {
    if (this.canPreviousPage()) {
      this.page = this.page - 1;
      this.findAll();
    }
  }

  canNextPage(): boolean {
    return (this.page + 1) * this.count < this.size;
  }

  nextPage() {
    if (this.canNextPage()) {
      this.page = this.page + 1;
      this.findAll();
    }
  }

}