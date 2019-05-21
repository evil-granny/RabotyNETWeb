import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/CompanyModel/company.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'rabotyNet',
  templateUrl: './approve-company.component.html',
  styleUrls: ['./approve-company.component.scss']
})
export class ApproveCompanyComponent implements OnInit {

  company: Company = new Company();

  constructor(private router: Router, private route: ActivatedRoute, private companyService: CompanyService,
              private app:AuthenticationService) { }
  
  ngOnInit() {
    var companyName = this.route.snapshot.paramMap.get("companyName");
    var companyToken = this.route.snapshot.paramMap.get("companyToken");
    if (companyName !== null) {
      this.companyService.findByName(companyName)
        .subscribe(data => {
          this.company = data;

          if(this.app.currentUserValue.userId != this.company.user.userId) {
            this.router.navigate(['accessDenied']);
          }
          else {
            this.companyService.approve(this.company, companyToken)
              .subscribe(data => {
                if(data.status == 'APPROVED')
                  this.router.navigate(['updateCompany/' + companyName]);
                else
                  this.router.navigate(['login']);
              });
          }
        });
        
    }
  }

}
