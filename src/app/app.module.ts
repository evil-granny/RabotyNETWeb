import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProfileComponent } from './profile/profile.component';
import { PersonService } from './services/person.service';

import { VacancyComponent } from './vacancy/vacancy.component';
import { EditVacancyComponent } from './vacancy/edit-vacancy/edit-vacancy.component';

import { CompanyComponent } from './company/company.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';

import { CvComponent } from './cv/cv.component';
import { AddCvComponent } from './cv/add-cv/add-cv.component';
import { PdfDesignerComponent } from './pdf-designer/pdf-designer.component';

import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';

import { SearchCVComponent } from './search-cv/search-cv.component';

import { CompanyService } from './services/company.service';
import { CVService } from './services/cv.service';
import { UserService } from './services/user.service';
import { SearchCVService } from './services/search-cv.service';
import { PdfService } from './services/pdf.service';


import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ApproveCompanyComponent } from './company/approve-company/approve-company.component';

// import { PaginationModule } from 'ngx-pagination'
import {NgxPaginationModule} from 'ngx-pagination';
import {ViewCompanyComponent} from './company/view-company/view-company.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProfileComponent,
    VacancyComponent,
    EditVacancyComponent,
    CompanyComponent,
    AddCompanyComponent,
    CvComponent,
    AddCvComponent,
    UserComponent,
    AddUserComponent,
    SearchCVComponent,
    PdfDesignerComponent,
    ApproveCompanyComponent,
    ViewCompanyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    NgxPaginationModule,
    // PaginationModule
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
