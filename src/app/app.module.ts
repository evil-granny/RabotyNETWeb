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
import { SidebarComponent } from './sidebar/sidebar.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './login/auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent}
];

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
    HomeComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot()
  ],
  providers: [AuthService, {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
