import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Resume } from '../../models/resume.model';

import { ResumeService } from '../../services/resume.service';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-show-resume',
  templateUrl: './show-resume.component.html',
  styleUrls: ['./show-resume.component.scss']
})
export class ShowResumeComponent implements OnInit {

  resumes: Resume[];

  send: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private cvService: ResumeService, private pdfService: PdfService) { }

  ngOnInit() {
    let vacancyId = this.route.snapshot.paramMap.get('vacancyId')
    this.cvService.getResumeByVacancyId(vacancyId)
      .subscribe(data => {
        this.resumes = data;
      });
  }

  showPdf(resume: Resume): void {
    this.pdfService.show(resume.resumeId, this.send)
      .subscribe(data => {
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        window.focus();
      });

    setTimeout(() => { this.changeStatus(resume) }, 5000);
  };

  changeStatus(resume: any) {
    resume.reviewed = true;
    this.cvService.update(resume)
      .subscribe(() => {
      });
  }

  changeStatusOnNew(resume: any) {
    resume.reviewed = false;
    this.cvService.update(resume)
      .subscribe(() => {
      });
  }

}
