import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'

import { Person } from '../models/person.model';
import { PersonService } from '../services/profile/person.service';
import { Contact } from '../models/contact.model';
import { Address } from '../models/address.model';
import { PhotoService } from '../services/profile/photo.service';
import { UserPrincipal } from '../models/userPrincipal.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'rabotyNet',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: UserPrincipal;

  person: Person = new Person();

  avatar: any;
  fileToUpload: File;
  maxDate: Date = new Date();

  constructor(private app: AuthenticationService, private router: Router, private personService: PersonService, private photoService: PhotoService, private sanitizer: DomSanitizer) {
    this.app.currentUser.subscribe(data => this.currentUser = data);
  }

  ngOnInit() {
    this.personService.findById(this.currentUser.userId)
      .subscribe(data => {
        this.person = data;

        if (this.person.contact == null && this.person.address == null) {
          this.person.contact = new Contact();
          this.person.address = new Address();
        }
        if (this.person.photo != null) {
          this.loadPhoto(this.person.photo.photoId);
        }
      });
  };

  update() {
    this.personService.update(this.person)
      .subscribe(() => window.location.reload());
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
        this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64," + data.image);
      });
  }

  uploadPhoto() {
    this.photoService.uploadAvatar(this.fileToUpload, this.person.userId)
      .subscribe(() => window.location.reload());
  }

}
