import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';

import { ProfileComponent } from './profile/profile.component';

import { VacancyComponent } from './vacancy/vacancy.component';
import { EditVacancyComponent } from './vacancy/edit-vacancy/edit-vacancy.component';

import { CompanyComponent } from './company/company.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';

import { CvComponent } from './cv/cv.component';
import { AddCvComponent } from './cv/add-cv/add-cv.component';

import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';

import { SearchCVComponent } from './search-cv/search-cv.component';

import { CompanyService } from './services/company.service';
import { CVService } from './services/cv.service';
import { UserService } from './services/user.service';
import { SearchCVService } from './services/search-cv.service';

import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    VacancyComponent,
    EditVacancyComponent,
    CompanyComponent,
    AddCompanyComponent,
    CvComponent,
    AddCvComponent,
    UserComponent,
    AddUserComponent,
    SearchCVComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'uk-UK' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
