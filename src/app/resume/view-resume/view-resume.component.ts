import { Component, OnInit } from '@angular/core';
import { Resume } from 'src/app/models/resume.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ResumeService } from 'src/app/services/resume.service';

@Component({
  selector: 'app-view-resume',
  templateUrl: './view-resume.component.html',
  styleUrls: ['./../resume.component.css']
})
export class ViewResumeComponent implements OnInit {

  resume: Resume = new Resume();

  constructor(private router: Router,private route: ActivatedRoute, private resumeService: ResumeService) { }

  ngOnInit() {
    this.resumeService.findByUserId()
      .subscribe(data => {
        this.resume = data;
      });
  };

}
