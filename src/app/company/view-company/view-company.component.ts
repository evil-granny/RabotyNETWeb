import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/CompanyModel/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Claim } from 'src/app/models/claim.model';
import { UserService } from 'src/app/services/user.service';
import { Vacancy } from 'src/app/models/vacancy/vacancy.model';
import { VacancyService } from 'src/app/services/vacancy.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Photo } from 'src/app/models/photo.model';
import { PhotoService } from 'src/app/services/profile/photo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserPrincipal } from 'src/app/models/userPrincipal.model';
import { Role } from 'src/app/models/roles.model';

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
        })
    }
    this.findVacancies();
  }


  findVacancies() {
    this.vacancyService.findVacanciesByCompanyId(this.route.snapshot.paramMap.get("companyId"), this.page * this.count).subscribe(
      data => {
        this.vacancies = data;
        this.vacancies = data.vacancies;
        this.size = data.count;
      }
    )
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
    this.photoService.load(photoId)
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

  deleteVacancy(vacancy: Vacancy): void {
    let flag = confirm("Do you really want to delete?");
    if (flag == false) {
      return;
    }
    else {
      this.vacancyService.deleteById(vacancy.vacancyId)
        .subscribe(data => {
          this.vacancies = this.vacancies.filter(p => p !== vacancy);
          this.size = this.size - 1;
        })
    }
  };

  get isCowner() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_COWNER) > -1;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.indexOf(Role.ROLE_ADMIN) > -1;
  }

}
