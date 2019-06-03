import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Company } from '../../models/company/company.model';
import { CompanyService } from '../../services/company.service';
import { Claim } from '../../models/claim.model';
import { Vacancy } from '../../models/vacancy/vacancy.model'
import { Photo } from '../../models/photo.model';
import { Role } from '../../models/roles.model';
import { UserPrincipal } from '../../models/userPrincipal.model';

import { VacancyService } from '../../services/vacancy.service';
import { UserService } from '../../services/user.service';
import { PhotoService } from '../../services/profile/photo.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'rabotyNet',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.scss']
})
export class ViewCompanyComponent implements OnInit {

  company: Company = new Company();
  claim: Claim = new Claim();
  vacancies: Vacancy[];
  currentUser: UserPrincipal;

  avatar: any;
  photo: Photo = new Photo();

  claiming: boolean = false;
  wasClicked: boolean = false;
  reasonForClosing: string;

  page: number = 0;
  count: number = 4;
  size: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private companyService: CompanyService,
    private userService: UserService, private vacancyService: VacancyService,
    private app: AuthenticationService, private photoService: PhotoService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.app.currentUser.subscribe(x => this.currentUser = x);
    var companyId = this.route.snapshot.paramMap.get("companyId");
    if (companyId != null) {
      this.companyService.findById(companyId)
        .subscribe(data => {
          this.companyService.findClaims(data)
            .subscribe(data1 => {
              data.claims = [];
              data1.forEach(function (claim) {
                data.claims.push(claim);
              });

              this.company = data;

              if (this.company.photo != null) {
                this.loadPhoto(this.company.photo.photoId);
              }
            });
        });
    }

    this.findVacancies();
  }

  findVacancies() {
    this.vacancyService.findVacanciesByCompanyId(this.route.snapshot.paramMap.get("companyId"), this.page * this.count)
      .subscribe(data => {
        this.vacancies = data;
        this.vacancies = data.vacancies;
        this.size = data.count;
      });
  }

  createClaim(): void {
    this.userService.findById(1)
      .subscribe(data => {
        this.claiming = false;
        this.claim.user = data;
        this.claim.company = this.company;
        this.companyService.createClaim(this.claim)
          .subscribe(data => {
            this.company = data;
          });
      });
  }

  loadPhoto(photoId: BigInteger) {
    this.photoService.loadLogo(photoId)
      .subscribe(data => {
        this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64," + data);
      });
  }

  canPrev(): boolean {
    return this.page > 0;
  }

  prev() {
    if (this.canPrev()) {
      this.page = this.page - 1;
      this.findVacancies();
    }
  }

  canNext(): boolean {
    return (this.page + 1) * this.count < this.size;
  }

  next() {
    if (this.canNext()) {
      this.page = this.page + 1;
      this.findVacancies();
    }
  }

  isApproved(): boolean {
    return this.company.status == 'APPROVED';
  }

  isMailSent(): boolean {
    return this.company.status == 'MAIL_SENT';
  }

  isBlocked(): boolean {
    return this.company.status == 'BLOCKED';
  }

  hasClaims(): boolean {
    return this.company.claims != null && this.company.claims.length > 0;
  }

  checkUser(): boolean {
    return this.app.currentUserValue.userId == this.company.user.userId;
  }

  closeVacancy(vacancy: Vacancy) {
    vacancy.vacancyStatus = this.reasonForClosing.toUpperCase();

    if (vacancy.vacancyStatus == 'OCCUPIED') {
      vacancy.vacancyStatus = 'OUTDATED';
    } else if (vacancy.vacancyStatus == 'OUTDATED') {
      vacancy.vacancyStatus = "OCCUPIED";
    }

    if (vacancy.hotVacancy) {
      vacancy.hotVacancy = false;
    }

    this.vacancyService.update(vacancy)
      .subscribe(() => {
        window.location.reload();
      });
  }

  openVacancy(vacancy: Vacancy) {
    vacancy.vacancyStatus = 'OPEN';
    this.vacancyService.update(vacancy)
      .subscribe(() => {
        window.location.reload();
      });
  }

  ifClicked() {
    document.getElementsByTagName("div")[0].setAttribute("style", "opacity: 1");
    this.wasClicked = !this.wasClicked;
  }

  clickedCancel() {
    document.getElementsByTagName("div")[0].setAttribute("style", "opacity: 0.95");
    this.wasClicked = !this.wasClicked;
  }

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_ADMIN) > -1;
  }

}
