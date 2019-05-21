import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';

import { VacancyComponent } from './vacancy/vacancy.component';
import { EditVacancyComponent } from './vacancy/edit-vacancy/edit-vacancy.component';

import { CompanyComponent } from './company/company.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';

import { CvComponent } from './cv/cv.component';
import { AddCvComponent } from './cv/add-cv/add-cv.component';
import { PdfDesignerComponent} from './pdf-designer/pdf-designer.component';


import { AddUserComponent } from './user/add-user/add-user.component';
import { UserComponent } from './user/user.component';


import { AccessDeniedPageComponent } from './access-denied-page/access-denied-page.component';

import { ApproveCompanyComponent } from './company/approve-company/approve-company.component';
import { SearchCVComponent } from './search-cv/search-cv.component';
import { ViewCompanyComponent } from './company/view-company/view-company.component';
import { MyCompanyComponent } from './company/my-company/my-company.component';
import { SearchVacancyComponent} from './search-vacancy/search-vacancy.component';
import { RegistrationconfirmComponent } from './confirm/registrationconfirm/registrationconfirm.component';
import {ViewVacancyComponent} from './vacancy/view-vacancy/view-vacancy.component';
import {PasswordForgotComponent} from './password-forgot/password-forgot.component';
import {PasswordRestoreComponent} from './password-restore/password-restore.component';
import {AccessNonauthorizedPageComponent} from './access-nonauthorized-page/access-nonauthorized-page.component';
import { HotVacancyComponent } from './vacancy/hot-vacancy/hot-vacancy.component';
import { ViewCvComponent } from './cv/view-cv/view-cv.component';
import {AuthGuard} from './_guards/auth.guard';
import {Role} from './models/roles.model';


const routes: Routes = [

  {
    path: 'companies',
    component: CompanyComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ROLE_ADMIN] }
  },
  { path: 'vacancies', component: VacancyComponent },
  { path: 'hotVacancies', component: HotVacancyComponent },
  { path: 'profile', component: ProfileComponent },

  
  { path: 'createVacancy/:companyName', component: EditVacancyComponent },
  { path: 'updateVacancy/:vacancyId', component : EditVacancyComponent},
  { path: 'viewVacancy/:vacancyId', component : ViewVacancyComponent},

  { path: 'companies', component: CompanyComponent },
  { path: 'companies/my', component: MyCompanyComponent },
  { path: 'createCompany', component: AddCompanyComponent },
  { path: 'updateCompany/:companyName', component: AddCompanyComponent },
  { path: 'approveCompany/:companyName/:companyToken', component: ApproveCompanyComponent },
  { path: 'viewCompany/:companyName', component: ViewCompanyComponent },

  { path: 'userCV', component: ViewCvComponent },
  { path: 'cvs', component: CvComponent },
  { path: 'createCV', component: AddCvComponent },

  { path: 'createCvPdf/:cvId', component: PdfDesignerComponent },

  { path: 'updateCV/:cvId', component: AddCvComponent },

  { path: 'registration', component: AddUserComponent },
  { path: 'forgotPassword', component: PasswordForgotComponent },
  { path: 'confirmPassword', component: PasswordRestoreComponent },
  { path: 'accessDenied', component: AccessDeniedPageComponent },
  { path: 'nonauthorized', component: AccessNonauthorizedPageComponent},
  { path: 'registrationConfirm', component: RegistrationconfirmComponent },
  { path: 'users', component: UserComponent },
  { path: 'searchCV', component: SearchCVComponent },

  { path: 'vacancies/search', component: SearchVacancyComponent },

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
