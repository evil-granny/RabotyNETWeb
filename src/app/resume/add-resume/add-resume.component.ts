import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CV } from '../../models/resume.model';
import { CVService } from '../../services/resume.service';
import { Skill } from '../../models/skill.model';
import { Job } from '../../models/job.model';

@Component({
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.css']
})
export class AddCvComponent {

  cv: CV = new CV();
  skills: Skill[] = Array<Skill>();
  jobs: Job[] = Array<Job>();

  constructor(private router: Router, private route: ActivatedRoute, private cvService: CVService) { }

  ngOnInit(): void {
    var cvId = this.route.snapshot.paramMap.get("cvId");
    if (cvId !== null) {
      this.cvService.findById(cvId)
        .subscribe(data => {
          this.cv = data;
        });
    }
  }

  update(): void {
    this.cvService.update(this.cv)
      .subscribe(data => {
        if (data != null) {
          this.router.navigate(['/resume/user']);
        }
        else
          alert("Validation problem has been occured");
      });
  };

  insert(): void {
    this.cvService.insert(this.cv)
      .subscribe(data => {
        if (data != null) {
          this.router.navigate(['/resume/user']);
        }
        else
          alert("Validation problem has been occured");
      });
  };

  deleteSkill(skill: Skill): void {
    this.cvService.deleteSkillById(skill.skillId)
      .subscribe(data => {
        this.skills = this.skills.filter(p => p !== skill);
        window.location.reload();
      })
  }

  deleteJob(job: Job): void {
    this.cvService.deleteJobById(job.jobId)
      .subscribe(data => {
        this.jobs = this.jobs.filter(p => p !== job);
        window.location.reload();
      })
  }

  newSkill() {
    this.cv.skills.push(new Skill());
  }

  newJob() {
    this.cv.jobs.push(new Job());
  }

  removeInputFieldSkill(index: number): void {
    this.cv.skills.splice(index, 1);
  }

  removeInputFieldJob(index: number): void {
    this.cv.jobs.splice(index, 1);
  }

}
