import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Resume } from '../models/resume.model';
import { Person } from '../models/person.model';
import { Contact } from '../models/contact.model';

import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-pdf-designer',
  templateUrl: './pdf-designer.component.html',
  styleUrls: ['./pdf-designer.component.scss']
})
export class PdfDesignerComponent implements OnInit {

  contact: Contact = new Contact();
  people: Person = new Person();
  resume: Resume = new Resume();

  send: boolean = true;
  fileURL: string = "";
  sendVacancy: string = "not";

  constructor(private router: Router, private route: ActivatedRoute, private pdfService: PdfService) { }

  // ngOnInit(): void {
  //   var resumeId = this.route.snapshot.paramMap.get('cvId');
  //   if (resumeId !== null) {
  //     this.pdfService.findById(resumeId)
  //       .subscribe(data => {
  //         this.resume = data;
  //       });
  //   }
  // };

  ngOnInit() {
    this.pdfService.findByUserId()
      .subscribe(data => {
        this.resume = data;
      });
  };

  showPdf(): void {
    this.pdfService.update(this.resume)
      .subscribe(data => {
        if (data != null) {
          this.pdfService.show(this.resume.resumeId, this.send)
            .subscribe(data => {
              var file = new Blob([data], { type: 'application/pdf' });
              var fileURL = URL.createObjectURL(file);
              window.open(fileURL);
              window.focus();
            });
        } else {
          alert('Validation problem has been occured');
        }
      });
  };

  showPreviewPdf(): void {
    this.pdfService.update(this.resume)
      .subscribe(data => {
        if (data != null)
          this.router.navigate(['/previewResumePdf', this.resume.resumeId, this.sendVacancy]);
        else
          alert("Validation problem has been occured");
      });
  }

}
