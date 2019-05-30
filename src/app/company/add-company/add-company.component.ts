import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Company } from '../../models/CompanyModel/company.model';
import { CompanyService } from '../../services/company.service';
import { UserService } from 'src/app/services/user.service';
import { Photo } from 'src/app/models/photo.model';
import { PhotoService } from 'src/app/services/profile/photo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {Location} from '@angular/common';


@Component({
  selector: 'rabotyNet',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  company: Company = new Company();
  photo: Photo = new Photo();

  avatar: any;
  fileToUpload: File;

  constructor(private location: Location,private router: Router, private route: ActivatedRoute, private companyService: CompanyService,
    private userService: UserService, private photoService: PhotoService, private sanitizer: DomSanitizer,
    private app: AuthenticationService) { }

  ngOnInit(): void {

    var companyName = this.route.snapshot.paramMap.get("companyName");
    if (companyName !== null) {
      this.companyService.findByName(companyName)
        .subscribe(data => {
          this.company = data;

          if(this.app.currentUserValue.userId != this.company.user.userId) {
            this.router.navigate(['accessDenied']);
          }

          if (this.company.photo != null) {
            this.loadPhoto(this.company.photo.photoId);
          }
        });
    }
  }

  goBack() {
    this.location.back();
  }

  update(): void {
    this.companyService.update(this.company)
      .subscribe(data => {
        if (data != null)
        this.router.navigate(['companies/my']);
        else
          alert("Validation problem has been occured");
      });
  };

  create(): void {
    this.company.status = 'CREATED';
    this.company.photo = null;
    this.companyService.exists(this.company.name)
      .subscribe(flag => {
        if (flag == false) {
          this.companyService.create(this.company)
            .subscribe(data => {
              if (data != null) {
                this.router.navigate(['vacancies']);
              }
              else
                alert("Validation problem has been occured");
            });
        } else {
          alert("Company with that name already exists!");
        }
      });


  };

  handlePhoto(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.avatar = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  loadPhoto(photoId: BigInteger) {
    this.photoService.load(photoId)
      .subscribe(data => {
        this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64," + data);
      });
  }

  uploadPhoto() {
    this.photoService.uploadLogo(this.fileToUpload, this.company.name)
      .subscribe(() => window.location.reload());
  }

}
