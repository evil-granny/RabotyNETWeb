import { Component, OnInit } from '@angular/core';
import { CV } from '../models/cv.model';
import { Person } from '../models/person.model';
import { PdfService } from '../services/pdf.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-pdf-designer',
  templateUrl: './pdf-designer.component.html',
  styleUrls: ['./pdf-designer.component.scss']
})

export class PdfDesignerComponent implements OnInit {

  contact: Contact = new Contact();

  people: Person = new Person();

  cv: CV = new CV();

  send: boolean = true;

  fileURL: string = "hello world"

  constructor(private router: Router, private route: ActivatedRoute, private pdfService: PdfService) {
  }

  // ngOnInit(): void {

  //   var cvId = this.route.snapshot.paramMap.get('cvId');

  //   if (cvId !== null) {

  //     this.pdfService.findById(cvId)

  //       .subscribe(data => {

  //         this.cv = data;

  //       });
  //   }
  // }

  ngOnInit(): void {

     this.pdfService.findByUserId()

        .subscribe(data => {

          this.cv = data;

        });
    }
  

  showPdf(): void {

    this.pdfService.update(this.cv)

      .subscribe(data => {

        if (data != null) {

          this.pdfService.show(this.cv.cvId, this.send)

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

}
