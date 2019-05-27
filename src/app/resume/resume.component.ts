import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Resume } from '../models/resume.model';
import { ResumeService } from '../services/resume.service';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  resumes: Resume[];

  constructor(private router: Router, private resumeService: ResumeService) { }

  ngOnInit() {
    this.resumeService.findAll()
      .subscribe(data => {
        this.resumes = data;
      });
  };

  deleteById(cv: Resume): void {
    this.resumeService.deleteById(cv)
      .subscribe(data => {
        this.resumes = this.resumes.filter(p => p !== cv);
      })
  };

}
