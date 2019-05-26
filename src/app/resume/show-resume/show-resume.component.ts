import { Component, OnInit } from '@angular/core';
import { CV } from 'src/app/models/resume.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CVService } from 'src/app/services/resume.service';
import { Person } from 'src/app/models/person.model';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-show-resume',
  templateUrl: './show-resume.component.html',
  styleUrls: ['./show-resume.component.scss']
})
export class ShowResumeComponent implements OnInit {

  // cv: CV = new CV();
  resumes: CV[];
  send: boolean = true;
  // status: boolean = true;
  status: string = "NEW";

  // persons: Person[];

  constructor(private router: Router, private route: ActivatedRoute, private cvService: CVService, private pdfService: PdfService) { }

  ngOnInit() {
    let vacancyId = this.route.snapshot.paramMap.get('vacancyId')
    this.cvService.getResumeByVacancyId(vacancyId)
      .subscribe(data => {
        this.resumes = data;
      });
  }

  showPdf(resume : CV): void {
          this.pdfService.show(resume.cvId, this.send)
            .subscribe(data => {
              var file = new Blob([data], { type: 'application/pdf' });
              var fileURL = URL.createObjectURL(file);
              window.open(fileURL);
              window.focus();
            });
  };

  changeStatus(){
    this.status = "REVIEW";
  }

}
