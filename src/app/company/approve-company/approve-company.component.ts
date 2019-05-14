import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/CompanyModel/company.model';

@Component({
  selector: 'rabotyNet',
  templateUrl: './approve-company.component.html',
  styleUrls: ['./approve-company.component.scss']
})
export class ApproveCompanyComponent implements OnInit {

  company: Company = new Company();

  constructor(private router: Router, private route: ActivatedRoute, private companyService: CompanyService) { }
  
  ngOnInit() {
    var companyName = this.route.snapshot.paramMap.get("companyName");
    if (companyName !== null) {
      this.companyService.findByName(companyName)
        .subscribe(data => {
          this.company = data;
          
          this.company.status = 'APPROVED';

          this.companyService.update(this.company)
            .subscribe(data => {
              console.log("[approved]");
              this.router.navigate(['updateCompany/' + companyName]);
            });
        });
        
    }
  }

}
