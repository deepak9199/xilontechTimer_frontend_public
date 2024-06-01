import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/_guards/auth.guard';
import { ActivitiesComponent } from '../system/activities/activities.component';
import { CostCenterComponent } from '../system/cost-center/cost-center.component';
import { LoginComponent } from '../system/login/login.component';
import { LogoutComponent } from '../system/logout/logout.component';
import { ProjectComponent } from '../system/project/project.component';
import { EmployeeListComponent } from '../system/resourceManager/employee-list/employee-list.component';
import { TimerAssignProjectEmployeeComponent } from '../system/resourceManager/timer-assign-project-employee/timer-assign-project-employee.component';
import { TimeClockAppoveUserDetailComponent } from '../system/TimeClockAppove/time-clock-appove-user-detail/time-clock-appove-user-detail.component';
import { TimeClockAppoveUserListComponent } from '../system/TimeClockAppove/time-clock-appove-user-list/time-clock-appove-user-list.component';
import { TimerClockComponent } from '../system/timer-clock/timer-clock.component';
import { ReportEmplyeeListComponent } from '../system/timerReport/report-emplyee-list/report-emplyee-list.component';
import { TimerReportEmployeeComponent } from '../system/timerReport/timer-report-employee/timer-report-employee.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'logout',component:LogoutComponent},
  {path:'',component:TimerClockComponent, canActivate: [AuthGuard]},
  {path:'timeclock',component:TimerClockComponent, canActivate: [AuthGuard]},
  {path:'costcenter',component:CostCenterComponent,canActivate: [AuthGuard]},
  {path:'activities',component:ActivitiesComponent,canActivate: [AuthGuard]},
  {path:'projects',component:ProjectComponent,canActivate: [AuthGuard]},
  {path:'report',component:ReportEmplyeeListComponent,canActivate: [AuthGuard]},
  {path:'report/reportEmployee',component:TimerReportEmployeeComponent,canActivate: [AuthGuard]},
  {path:'resourceManager',component:EmployeeListComponent,canActivate: [AuthGuard]},
  {path:'resourceManager/projectassine',component:TimerAssignProjectEmployeeComponent,canActivate: [AuthGuard]},
  {path:'timeCLockApprove',component:TimeClockAppoveUserListComponent,canActivate: [AuthGuard]},
  {path:'timeCLockApprove/Detail',component:TimeClockAppoveUserDetailComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
