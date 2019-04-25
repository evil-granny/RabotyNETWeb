import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CV } from '../../models/cv.model';
import { CVService } from '../../services/cv.service';
import { Skill } from '../../models/skill.model';
import { Job } from '../../models/job.model';

@Component({
  templateUrl: './add-cv.component.html'
})
export class AddCvComponent {

  cv: CV = new CV();

  constructor(private router: Router, private cvService: CVService) { }

  insert(): void {
    console.log(this.cv);
    this.cvService.insert(this.cv)
      .subscribe(data => {
        alert("CV has been created successfully.");
      });
  };

  newSkill() {
    console.log(this.cv.skills);
    this.cv.skills.push(new Skill());
  }

  newJob() {
    this.cv.jobs.push(new Job());
  }

}
