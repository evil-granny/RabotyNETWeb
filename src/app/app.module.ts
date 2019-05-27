import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MAT_DATE_LOCALE, MatSidenavModule, MatDialogModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';

import { ProfileComponent } from './profile/profile.component';

import { VacancyComponent } from './vacancy/vacancy.component';
import { EditVacancyComponent } from './vacancy/edit-vacancy/edit-vacancy.component';
import { HotVacancyComponent } from './vacancy/hot-vacancy/hot-vacancy.component';
import { ViewVacancyComponent } from './vacancy/view-vacancy/view-vacancy.component';

import { CompanyComponent } from './company/company.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { ApproveCompanyComponent } from './company/approve-company/approve-company.component';
import { ViewCompanyComponent } from './company/view-company/view-company.component';
import { MyCompanyComponent } from './company/my-company/my-company.component';

import { CvComponent } from './cv/cv.component';
import { AddCvComponent } from './cv/add-cv/add-cv.component';
import { ViewCvComponent } from './cv/view-cv/view-cv.component';
import { PdfDesignerComponent } from './pdf-designer/pdf-designer.component';

import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';

import { SearchResumeComponent } from './search-resume/search-resume.component';
import { SearchVacancyComponent } from './search-vacancy/search-vacancy.component';

import { ComfirmComponent } from './confirm/comfirm.component';
import { RegistrationconfirmComponent } from './confirm/registrationconfirm/registrationconfirm.component';

import { AuthInterceptor, ErrorInterceptor } from './_helpers';
import { AuthenticationService } from './services/authentication.service';

import { AccessDeniedPageComponent } from './access-denied-page/access-denied-page.component';
import { AccessNonauthorizedPageComponent } from './access-nonauthorized-page/access-nonauthorized-page.component';

import { PasswordForgotComponent } from './password-forgot/password-forgot.component';
import { PasswordRestoreComponent } from './password-restore/password-restore.component';

import { AppComponent } from './app.component';
import { ClosedVacancyComponent } from './vacancy/closed-vacancy/closed-vacancy.component';

@NgModule({
  declarations: [
    AppComponent,

    ProfileComponent,

    VacancyComponent,
    EditVacancyComponent,
    ViewVacancyComponent,
    HotVacancyComponent,

    CompanyComponent,
    AddCompanyComponent,
    MyCompanyComponent,
    ApproveCompanyComponent,
    ViewCompanyComponent,

    CvComponent,
    AddCvComponent,
    ViewCvComponent,
    PdfDesignerComponent,

    UserComponent,
    AddUserComponent,

    SearchResumeComponent,
    SearchVacancyComponent,

    ComfirmComponent,
    RegistrationconfirmComponent,

    PasswordForgotComponent,
    PasswordRestoreComponent,

    AccessDeniedPageComponent,
    AccessNonauthorizedPageComponent,
    ClosedVacancyComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJIPvqwF2zq-MDcUQiopLiU4we5vA1abM'
    }),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' }),
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatSidenavModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [ComfirmComponent],
  providers: [AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class AppModule { }
