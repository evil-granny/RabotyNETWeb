import { Component, OnInit } from '@angular/core';
import { CV } from '../models/cv.model';
import { Person} from '../models/person.model';
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
  urlPdf: string ="false";
  
   
  
  constructor(private router: Router, private route: ActivatedRoute, private pdfService: PdfService) {}   

  ngOnInit(): void {
    var cvId = this.route.snapshot.paramMap.get("cvId");
    if (cvId !== null) {
      this.pdfService.findById(cvId)
        .subscribe(data => {
          this.cv = data;
        });
    }
  }

  update(): void {
    console.log(this.cv);
    this.pdfService.update(this.cv)
      .subscribe(data => {
        if(data != null)
          alert("CV has been updated successfully.");
        else
          alert("Validation problem has been occured"); 
      });
  };

  showPdf(): void { 

    
  
   this.pdfService.show(this.cv.cvId)
      .subscribe(data =>   {
        var file = new Blob([data], { type: 'application/pdf' });
        console.log(file);
        var fileURL = URL.createObjectURL(file);   
        console.log(fileURL);
        this.urlPdf= fileURL;
        window.open(fileURL);  
        window.focus();
       });   
  };

  
    
  
  
  


}
