import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CV } from '../models/resume.model';
import { CVService } from '../services/resume.service';


@Component({
  selector: 'app-cv',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class CvComponent implements OnInit {

  cvs: CV[];

  constructor(private router: Router, private cvService: CVService) { }

  ngOnInit() {
    this.cvService.findAll()
      .subscribe(data => {
        this.cvs = data;
      });
  };

  deleteById(cv: CV): void {
    this.cvService.deleteById(cv)
      .subscribe(data => {
        this.cvs = this.cvs.filter(p => p !== cv);
      })
  };

}
