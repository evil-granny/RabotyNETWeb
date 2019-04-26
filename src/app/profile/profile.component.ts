import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'

import { Person } from '../models/person.model';
import { PersonService } from '../services/person.service';
import { Contacts } from '../models/contacts.model';
import { Address } from '../models/address.model';

@Component({
  selector: 'rabotyNet',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  person: Person = new Person();

  fileToUpload: File = null;

  private noImage: string = "/assets/images/no-image.jpg";

  constructor(private router: Router, private personService: PersonService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.personService.findById()
      .subscribe(data => {
        this.person = data;
        if (this.person.contacts == null && this.person.address == null) {
          this.person.contacts = new Contacts();
          this.person.address = new Address();
        }
      });
  };

  update(): void {
    this.personService.update(this.person)
      .subscribe(() => window.location.reload());
    console.log(this.person);
  };

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.person.photo = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

}
