import { Component, OnInit } from '@angular/core';
import { CV } from 'src/app/models/resume.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CVService } from 'src/app/services/resume.service';

@Component({
  selector: 'app-view-cv',
  templateUrl: './view-resume.component.html',
  styleUrls: ['./../resume.component.css']
})
export class ViewCvComponent implements OnInit {

  cv: CV = new CV();

  constructor(private router: Router,private route: ActivatedRoute, private cvService: CVService) { }

  ngOnInit() {
    this.cvService.findByUserId()
      .subscribe(data => {
        this.cv = data;
      });
  };

}
