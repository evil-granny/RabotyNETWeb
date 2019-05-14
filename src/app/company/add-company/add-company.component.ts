import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Company } from '../../models/CompanyModel/company.model';
import { CompanyService } from '../../services/company.service'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'rabotyNet',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  company: Company = new Company();

  constructor(private router: Router, private route: ActivatedRoute, private companyService: CompanyService,
    private userService: UserService) { }

  ngOnInit(): void {
    var companyName = this.route.snapshot.paramMap.get("companyName");
    if (companyName !== null) {
      this.companyService.findByName(companyName)
        .subscribe(data => {
          this.company = data;
        });
    }
  }

  update(): void {
    this.companyService.update(this.company)
      .subscribe(data => {
        if(data != null)
          alert("Company has been updated successfully.");
        else
          alert("Validation problem has been occured"); 
      });
  };

  create(): void {
    this.userService.findById(1)
      .subscribe(data => {
        console.log(data);
        this.company.user = data;

        this.company.status = 'CREATED';

        this.companyService.create(this.company)
          .subscribe(data => {
            if(data != null) {
              this.router.navigate(['/updateCompany/' + this.company.name]);
            }
            else
              alert("Validation problem has been occured");  
        }); 
      }); 
  };

}