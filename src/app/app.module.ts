import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './shared/_guards/auth.guard';
import { authInterceptorProviders } from './shared/_helpers/auth.interceptor';
import { AuthService } from './shared/_services/auth.service';
import { EncrDecrServiceService } from './shared/_services/encr-decr-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './system/login/login.component';
import { LogoutComponent } from './system/logout/logout.component';
import { TimerClockComponent } from './system/timer-clock/timer-clock.component';
import { ProjectComponent } from './system/project/project.component';
import { ActivitiesComponent } from './system/activities/activities.component';


import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DefaultPageComponent } from './shared/default-page/default-page.component';
import { CostCenterComponent } from './system/cost-center/cost-center.component';
import { TimerAssignProjectEmployeeComponent } from './system/resourceManager/timer-assign-project-employee/timer-assign-project-employee.component';
import { EmployeeListComponent } from './system/resourceManager/employee-list/employee-list.component';

import { TimerReportEmployeeComponent } from './system/timerReport/timer-report-employee/timer-report-employee.component';
import { ReportEmplyeeListComponent } from './system/timerReport/report-emplyee-list/report-emplyee-list.component';

import { TimeClockAppoveUserListComponent } from './system/TimeClockAppove/time-clock-appove-user-list/time-clock-appove-user-list.component';
import { TimeClockAppoveUserDetailComponent } from './system/TimeClockAppove/time-clock-appove-user-detail/time-clock-appove-user-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    TimerClockComponent,
    ProjectComponent,
    ActivitiesComponent,
    TimerAssignProjectEmployeeComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DefaultPageComponent,
    CostCenterComponent,
    EmployeeListComponent,
    TimerReportEmployeeComponent,
    ReportEmplyeeListComponent,
    TimeClockAppoveUserListComponent,
    TimeClockAppoveUserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-right",
      preventDuplicates: false
    }),
  ],
  providers: [
    authInterceptorProviders,
    AuthGuard,
    AuthService,
    EncrDecrServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
