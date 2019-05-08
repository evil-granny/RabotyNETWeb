import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {ProfileComponent} from './profile/profile.component';

import {VacancyComponent} from './vacancy/vacancy.component';
import {EditVacancyComponent} from './vacancy/edit-vacancy/edit-vacancy.component';

import {CompanyComponent} from './company/company.component';
import {AddCompanyComponent} from './company/add-company/add-company.component';

import {CvComponent} from './cv/cv.component';
import {AddCvComponent} from './cv/add-cv/add-cv.component';

import {UserComponent} from './user/user.component';
import {AddUserComponent} from './user/add-user/add-user.component';

import {SearchCVComponent} from './search-cv/search-cv.component';

import {AppRoutingModule} from './app-routing.module';
import {BsDropdownModule} from 'ngx-bootstrap';

import {AppComponent} from './app.component';
import {SidebarComponent} from './sidebar/sidebar.component';

import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {RouterModule, Routes} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';

import {AuthInterceptor, ErrorInterceptor} from './_helpers';
import {Role} from './models/roles.model';
import {AuthGuard} from './_guards/auth.guard';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
  {
    path: 'searchCV',
    component: SearchCVComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ROLE_COWNER, Role.ROLE_USER] }
  },
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

  { path: '**', redirectTo: '' }
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
    LoginComponent,
    AdminComponent
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
  providers: [AuthenticationService,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
