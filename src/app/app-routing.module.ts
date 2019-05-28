import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProfileComponent} from './profile/profile.component';

import {VacancyComponent} from './vacancy/vacancy.component';
import {EditVacancyComponent} from './vacancy/edit-vacancy/edit-vacancy.component';

import {CompanyComponent} from './company/company.component';
import {AddCompanyComponent} from './company/add-company/add-company.component';

import {ResumeComponent} from './resume/resume.component';
import {AddResumeComponent} from './resume/add-resume/add-resume.component';
import {PdfDesignerComponent} from './pdf-designer/pdf-designer.component';


import {AddUserComponent} from './user/add-user/add-user.component';
import {UserComponent} from './user/user.component';


import {AccessDeniedPageComponent} from './access-denied-page/access-denied-page.component';

import {ApproveCompanyComponent} from './company/approve-company/approve-company.component';
import {SearchResumeComponent} from './search-resume/search-resume.component';
import {ViewCompanyComponent} from './company/view-company/view-company.component';
import {MyCompanyComponent} from './company/my-company/my-company.component';
import {SearchVacancyComponent} from './search-vacancy/search-vacancy.component';
import {RegistrationconfirmComponent} from './confirm/registrationconfirm/registrationconfirm.component';
import {ViewVacancyComponent} from './vacancy/view-vacancy/view-vacancy.component';
import {PasswordForgotComponent} from './password-forgot/password-forgot.component';
import {PasswordRestoreComponent} from './password-restore/password-restore.component';
import {AccessNonauthorizedPageComponent} from './access-nonauthorized-page/access-nonauthorized-page.component';
import {HotVacancyComponent} from './vacancy/hot-vacancy/hot-vacancy.component';
import {ViewResumeComponent} from './resume/view-resume/view-resume.component';
import {AuthGuard} from './_guards/auth.guard';
import {Role} from './models/roles.model';
import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component';


const routes: Routes = [

  {
    path: 'companies/all/**, companies/sendMail',
    component: CompanyComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ROLE_ADMIN] }
  },
  {
    path: 'companies/all/**, companies/sendMail',
    component: MyCompanyComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ROLE_ADMIN] }
  },
  {
    path: 'companies/my, companies/update, companies/delete/**',
    component: CompanyComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ROLE_COWNER] }
  },
  {
    path: 'search/resume',
    component: SearchResumeComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ROLE_COWNER] }
  },
  {
    path: 'companies/approve, companies/create',
    component: MyCompanyComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ROLE_COWNER, Role.ROLE_USER] }
  },
  {
    path: 'resume/create',
    component: AddResumeComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ROLE_COWNER, Role.ROLE_USER] }
  },
  {
    path: 'resume/user',
    component: ViewResumeComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ROLE_COWNER, Role.ROLE_USER] }
  },
  { path: 'vacancies', component: VacancyComponent },
  { path: 'hotVacancies', component: HotVacancyComponent },
  { path: 'profile', component: ProfileComponent },


  { path: 'createVacancy/:companyId', component: EditVacancyComponent },
  { path: 'updateVacancy/:vacancyId', component : EditVacancyComponent},
  { path: 'viewVacancy/:vacancyId', component : ViewVacancyComponent},

  { path: 'companies', component: CompanyComponent },
  { path: 'companies/my', component: MyCompanyComponent },
  { path: 'createCompany', component: AddCompanyComponent },
  { path: 'updateCompany/:companyName', component: AddCompanyComponent },
  { path: 'approveCompany/:companyName/:companyToken', component: ApproveCompanyComponent },
  { path: 'viewCompany/:companyId', component: ViewCompanyComponent },

  { path: 'resume/user', component: ViewResumeComponent },
  { path: 'resume/all', component: ResumeComponent },
  { path: 'resume/create', component: AddResumeComponent },

  //{ path: 'createCvPdf/:cvId', component: PdfDesignerComponent },
  { path: 'createResumePdf', component: PdfDesignerComponent },
  { path: 'previewResumePdf/:resumeId', component: PdfPreviewComponent },

  { path: 'update/:resumeId', component: AddResumeComponent },

  { path: 'users/auth', component: AddUserComponent },
  { path: 'forgotPassword', component: PasswordForgotComponent },
  { path: 'confirmPassword', component: PasswordRestoreComponent },
  { path: 'accessDenied', component: AccessDeniedPageComponent },
  { path: 'nonauthorized', component: AccessNonauthorizedPageComponent},
  { path: 'users/auth/confirm', component: RegistrationconfirmComponent },
  { path: 'users', component: UserComponent },

  { path: 'search/vacancies', component: SearchVacancyComponent },

  { path: '**', redirectTo: 'vacancies' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
