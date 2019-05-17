import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { ProfileComponent } from './profile/profile.component';
import { PersonService } from './services/profile/person.service';

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
import { SearchService } from './services/search.service';

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

import {RouterModule, Routes} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';

import {AuthInterceptor, ErrorInterceptor} from './_helpers';
import {Role} from './models/roles.model';
import {AuthGuard} from './_guards/auth.guard';
import { AccessDeniedPageComponent } from './access-denied-page/access-denied-page.component';
import {AppErrorHandler} from './_helpers/app.error.handler';
import { SearchVacancyComponent } from './search-vacancy/search-vacancy.component';
import { MyCompanyComponent } from './company/my-company/my-company.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const routes: Routes = [
  {
    path: 'vacancies',
    component: VacancyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ROLE_ADMIN] }
  },
  {
    path: 'companies',
    component: CompanyComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ROLE_COWNER, Role.ROLE_ADMIN] }
  },
  // {
  //   path: 'searchCV',
  //   component: SearchCVComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.ROLE_COWNER] }
  // },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ROLE_USER] }
  },
  {
    path: 'login',
    component: LoginComponent
  },

  { path: '**', redirectTo: 'vacancies' }
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
    ApproveCompanyComponent,
    ViewCompanyComponent,
    LoginComponent,
    AdminComponent,
    AccessDeniedPageComponent,
    SearchVacancyComponent,
    MyCompanyComponent
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
    BsDropdownModule.forRoot(),
    NgxPaginationModule,
    // PaginationModule
  ],
  providers: [AuthenticationService,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
