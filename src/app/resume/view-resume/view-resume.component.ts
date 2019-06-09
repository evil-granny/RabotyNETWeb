import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Resume } from '../../models/resume.model';

import { ResumeService } from '../../services/resume.service';
import { UserPrincipal } from 'src/app/models/userPrincipal.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
	selector: 'app-view-resume',
	templateUrl: './view-resume.component.html',
	styleUrls: [ './../resume.component.css' ]
})
export class ViewResumeComponent implements OnInit {
	resume: Resume = new Resume();
	currentUser: UserPrincipal;

	constructor(
		private router: Router,
		private app: AuthenticationService,
		private route: ActivatedRoute,
		private resumeService: ResumeService
	) {
		this.app.currentUser.subscribe((data) => (this.currentUser = data));
	}

	ngOnInit() {
		this.resumeService.exists(this.currentUser.userId).subscribe((flag) => {
			if (flag == true) {
				this.resumeService.findByUserId(this.currentUser.userId).subscribe((data) => {
						this.resume = data;
				});
			} else {
				alert("Resume doesn't found! Please create your resume");
			}
		});
	}
}
