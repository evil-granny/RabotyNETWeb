import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Resume } from '../../models/resume.model';
import { ResumeService } from '../../services/resume.service';
import { Skill } from '../../models/skill.model';
import { Job } from '../../models/job.model';

@Component({
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.css']
})
export class AddResumeComponent {

  resume: Resume = new Resume();
  skills: Skill[] = Array<Skill>();
  jobs: Job[] = Array<Job>();

  constructor(private router: Router, private route: ActivatedRoute, private resumeService: ResumeService) { }

  ngOnInit(): void {
    var cvId = this.route.snapshot.paramMap.get("resumeId");
    if (cvId !== null) {
      this.resumeService.findById(cvId)
        .subscribe(data => {
          this.resume = data;
        });
    }
  }

  update(): void {
    this.resumeService.update(this.resume)
      .subscribe(data => {
        if (data != null) {
          this.router.navigate(['/resume/user']);
        }
        else
          alert("Validation problem has been occured");
      });
  };

  insert(): void {
    this.resumeService.insert(this.resume)
      .subscribe(data => {
        if (data != null) {
          this.router.navigate(['/resume/user']);
        }
        else
          alert("Validation problem has been occured");
      });
  };

  deleteSkill(skill: Skill): void {
    this.resumeService.deleteSkillById(skill.skillId)
      .subscribe(data => {
        this.skills = this.skills.filter(p => p !== skill);
        window.location.reload();
      })
  }

  deleteJob(job: Job): void {
    this.resumeService.deleteJobById(job.jobId)
      .subscribe(data => {
        this.jobs = this.jobs.filter(p => p !== job);
        window.location.reload();
      })
  }

  newSkill() {
    this.resume.skills.push(new Skill());
  }

  newJob() {
    this.resume.jobs.push(new Job());
  }

  removeInputFieldSkill(index: number): void {
    this.resume.skills.splice(index, 1);
  }

  removeInputFieldJob(index: number): void {
    this.resume.jobs.splice(index, 1);
  }

}
