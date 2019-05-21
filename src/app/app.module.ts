import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MAT_DATE_LOCALE, MatSidenavModule } from '@angular/material';

import { ProfileComponent } from './profile/profile.component';

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

import { PdfService } from './services/pdf.service';

import { SearchService } from './services/search.service';

import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ComfirmComponent } from './confirm/comfirm.component';
import { MatDialogModule } from '@angular/material';
import { RegistrationconfirmComponent } from './confirm/registrationconfirm/registrationconfirm.component';
import { ApproveCompanyComponent } from './company/approve-company/approve-company.component';

import { ViewCompanyComponent } from './company/view-company/view-company.component';

import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

import { AuthInterceptor, ErrorInterceptor } from './_helpers';
import { Role } from './models/roles.model';
import { AuthGuard } from './_guards/auth.guard';
import { AccessDeniedPageComponent } from './access-denied-page/access-denied-page.component';
import { AppErrorHandler } from './_helpers/app.error.handler';
import { SearchVacancyComponent } from './search-vacancy/search-vacancy.component';
import { MyCompanyComponent } from './company/my-company/my-company.component';
import { PasswordForgotComponent } from './password-forgot/password-forgot.component';
import { PasswordRestoreComponent } from './password-restore/password-restore.component';
import { ViewVacancyComponent } from './vacancy/view-vacancy/view-vacancy.component';
import { AccessNonauthorizedPageComponent } from './access-nonauthorized-page/access-nonauthorized-page.component';
import { HotVacancyComponent } from './vacancy/hot-vacancy/hot-vacancy.component';
// import {SidebarModule} from 'ng-sidebar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const routes: Routes = [
  {
    path: 'companies',
    component: CompanyComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ROLE_ADMIN] }
  },
  {
    path: 'vacancies',
    component: VacancyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'hotVacancies',
    component: VacancyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ROLE_ADMIN] }
  },
  // {
  //   path: 'vacancies/search',
  //   component: SearchVacancyComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.ROLE_ADMIN] }
  // },
  // {
  //   path: 'searchCV',
  //   component: SearchCVComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.ROLE_COWNER] }
  // },
  {
    path: 'users',
    component: UserComponent,
    // canActivate: [AuthGuard],
    // data: { roles: [Role.ROLE_USER] }
  },
  {
    path: 'login',
    component: LoginComponent
  },
   {
    path: 'registrationConfirm',
    component: RegistrationconfirmComponent
  },

  { path: '**', redirectTo: 'vacancies' }
];

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
    SearchCVComponent,
    PdfDesignerComponent,
    ComfirmComponent,
    RegistrationconfirmComponent,
    ApproveCompanyComponent,
    ViewCompanyComponent,
    LoginComponent,
    AdminComponent,
    AccessDeniedPageComponent,
    SearchVacancyComponent,
    MyCompanyComponent,
    PasswordForgotComponent,
    PasswordRestoreComponent,
    SearchVacancyComponent,
    ViewVacancyComponent,
    AccessNonauthorizedPageComponent,
    HotVacancyComponent,
    AccessNonauthorizedPageComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,
    HttpClientModule,
    // HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN'}),
    ReactiveFormsModule,
    AppRoutingModule,
    PerfectScrollbarModule,

    MatDialogModule,
    BsDropdownModule.forRoot(), MatSidenavModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [ComfirmComponent],
  providers: [AuthenticationService,
    { provide: MAT_DATE_LOCALE, useValue: 'uk-UK' },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler }]
})
export class AppModule { }
