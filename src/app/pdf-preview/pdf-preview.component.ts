import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PdfService } from '../services/pdf.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatDialog} from '@angular/material';
import {ComfirmComponent} from '../confirm/comfirm.component';
import { VacancyService } from '../services/vacancy.service';
import { ResumeService } from '../services/resume.service';
import { Resume } from '../models/resume.model';
import { Vacancy } from '../models/vacancy/vacancy.model';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss']
})

export class PdfPreviewComponent implements OnInit {

  url: SafeResourceUrl = "";

  urlTemp: string = "";

  send: boolean = false;

  resume : Resume;

  vacancy: Vacancy;

  sendVacancy: string;  

  vacancyIdBigInt: Uint8Array;
     
  constructor(private router: Router, private route: ActivatedRoute, private pdfService: PdfService, public sanitizer: DomSanitizer,public dialog: MatDialog, private vacancyService: VacancyService, private resumeService : ResumeService) { }

  ngOnInit():void {
    var resumeId = this.route.snapshot.paramMap.get('resumeId');
    this.sendVacancy = this.route.snapshot.paramMap.get('vacancyId');
    this.pdfService.show(resumeId, this.send)
    .subscribe(data => {
      var file = new Blob([data], { type: 'application/pdf' });
      this.urlTemp = URL.createObjectURL(file);
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlTemp);
    }); 
  }

  newWindowPdf():void {
    window.open(this.urlTemp);
    window.focus(); 
  }

sendEmail(){
  if (this.sendVacancy == "not") this.sendResumeForUser()
  else this.sendResumeForVacancy()
}

  sendResumeForUser() {
    this.pdfService.send().subscribe();
    this.openModal("Mail send");
        
}

  openModal(name: String) {
    this.dialog.open(ComfirmComponent, { data: { name } })
  }

  sendResumeForVacancy() {
    var vacancyId = this.route.snapshot.paramMap.get('vacancyId');
    this.pdfService.findByUserId().subscribe(data=>{
    this.resume = data;
    this.vacancyService.sendResume(this.resume, vacancyId).subscribe(data => {
      this.openModal("Mail send");
    }, error => console.error(error));
  });
  }
  
}


