import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PdfService } from '../services/pdf.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss']
})

export class PdfPreviewComponent implements OnInit {

  url: SafeResourceUrl = "";

  urlTemp: string = "";

  send: boolean = false;
   
  constructor(private router: Router, private route: ActivatedRoute, private pdfService: PdfService, public sanitizer: DomSanitizer) { }

  ngOnInit():void {

    var resumeId = this.route.snapshot.paramMap.get('resumeId');

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

  sendEmail(): void {

    this.pdfService.send()
      .subscribe( );
}

}


