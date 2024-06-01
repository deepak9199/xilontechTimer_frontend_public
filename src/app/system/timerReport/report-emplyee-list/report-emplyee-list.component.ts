import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { CustomersList, employeeProjectActivieAssign, projects, projectsAssine, TimeClock, userListModel } from 'src/app/model/timer';
import { AccountService } from 'src/app/shared/_services/account-service';
import { MessageService } from 'src/app/shared/_services/message.service';
import { TimeClcokService } from 'src/app/shared/_services/time-clcok.service';
import { TimerProjectsService } from 'src/app/shared/_services/timer-projects.service';
import { TimnerProjectAssineService } from 'src/app/shared/_services/timner-project-assine.service';

@Component({
  selector: 'app-report-emplyee-list',
  templateUrl: './report-emplyee-list.component.html',
  styleUrls: ['./report-emplyee-list.component.css']
})
export class ReportEmplyeeListComponent implements OnInit {

  form: any = {}
  projectlist: projects[]
  emplist: Array<employeeProjectActivieAssign> = [];
  GlobleEmplist: Array<employeeProjectActivieAssign> = [];
  userListOpt: Array<userListModel> = []
  SelectUser = 'All'
  totalWorkingHrs: number
  timeClock: TimeClock[]
  LastMonth: any
  LastYear: any
  constructor(
    private projectAssineService: TimnerProjectAssineService,
    private router: Router,
    private messageService: MessageService,
    private userList: AccountService,
    private timeClockService: TimeClcokService,
  ) { }

  ngOnInit(): void {
    this.getTimerProjectAssine()
    this.getuserlist()
    this.getbyLastMonth()
  }
  getbyLastMonth() {
    let todayDate = new Date()
    this.LastMonth = todayDate.getMonth()
    this.LastYear = todayDate.getFullYear()
    if (this.LastMonth === 0) {
      this.LastMonth = 11
      this.LastYear = this.LastYear - 1
    }
    else {
      this.LastMonth = this.LastMonth - 1
    }
    //console.log(LastMonth + '/' + LastYear)
    //console.log(this.totalWorkingHrs)
    //this.getTimeClockMonth(user, this.LastYear, this.LastMonth)
  }
  getTimeClockMonth(user: string, year: any, month: any) {
    this.totalWorkingHrs = 0
    //console.log(startdateofweek + ' ' + this.username)
    this.timeClockService.gettimeClck().subscribe(
      data => {
        //console.log(data.data);
        this.timeClock = data.data
        this.timeClock = this.timeClock.filter(item => item.status != 'Draft' && item.user === user && new Date(item.date).getFullYear() === year && new Date(item.date).getMonth() === month);
        this.timeClock.map((item: any) => {
          this.totalWorkingHrs = this.totalWorkingHrs + item.totalworkinghour
        })
        //this.timeClocklist.push(this.timeClock)
        //console.log(this.timeClock)
      },
    )
  }
  private getuserlist() {
    //console.log(this.GlobleEmplist.length)
    this.userListOpt = []
    this.emplist.map((item: any) => {
      this.userListOpt.push(item.user)
    })
  }
  Search() {
    if (this.SelectUser === 'All') {
      this.GlobleEmplist = this.emplist
    }
    else {
      this.GlobleEmplist = this.emplist.filter(item => item.user === this.SelectUser)
    }

  }
  private getEmployeeList() {
    let result: Array<employeeProjectActivieAssign> = [];
    let emplist = new employeeProjectActivieAssign()
    this.userList.getAccounts().subscribe(
      data => {
        let userList: CustomersList[]
        userList = data.data
        //console.log(userList)
        var keys = Object.keys(userList);
        let lenghttimeObject = keys.length
        for (let i = 0; i < lenghttimeObject; i++) {
          let user = userList[i].user
          //console.log(user)
          this.projectAssineService.gettimeprojectsAssine().subscribe(data => {
            let permissionList: Array<projectsAssine> = [];
            let datalist = data.data
            this.ArryPush(permissionList, datalist)
            let totalWorkingHrs = 0
            //console.log(startdateofweek + ' ' + this.username)
            this.timeClockService.gettimeClck().subscribe(
              data => {
                //console.log(data.data);
                this.timeClock = data.data
                this.timeClock = this.timeClock.filter(item => item.status != 'Draft' && item.user === user && new Date(item.date).getFullYear() === this.LastYear && new Date(item.date).getMonth() === this.LastMonth);
                this.timeClock.map((item: any) => {
                  totalWorkingHrs = totalWorkingHrs + item.totalworkinghour
                })
                //this.timeClocklist.push(this.timeClock)
                //console.log(this.timeClock)
                emplist = this.SearchArrayemployeeProjectActivieAssign(permissionList, user, 'TimerProjectAssined',totalWorkingHrs)
                this.emplist.push(emplist)
              },
            )

          },
            err => {
              console.log(err.error)
            }
          )

        }

      }
    )
    //console.log(result)
    return result
  }
  private getTimerProjectAssine() {
    this.GlobleEmplist = this.emplist
    this.getEmployeeList()
  }
  rout(user: any) {
    this.router.navigate(['report/reportEmployee'])
    this.messageService.setmessage(user)
  }
  private ArryPush(result: any, data: any) {

    let lenghttimeObject: any
    var keys = Object.keys(data);
    lenghttimeObject = keys.length
    for (let i = 0; i < lenghttimeObject; i++) {
      result.push(data[i])
      // console.log(data[i])
    }

  }
  private SearchArrayemployeeProjectActivieAssign(array: any, user: any, type: any,tothrs:any) {
   // console.log(tothrs)
    var keys = Object.keys(array);
    let lenghttimeObject = keys.length
    let project = []
    let activities = []
    let result: Array<projectsAssine> = []
    let initpojcount = 0
    for (let i = 0; i < lenghttimeObject; i++) {

      if (array[i].user === user && array[i].type === type) {
        //result.push(array[i])
        initpojcount = initpojcount + 1
        //console.log('initpojcount :' + initpojcount + ' i :' + i)
        let pojcount = this.countProject(array, user, type)
        //console.log(pojcount)
        if (initpojcount === 1 && pojcount === 1) {
          project.push('[ ' + array[i].permission + ' ]')
        }
        else if (initpojcount === 1) {
          //console.log('[ ')
          project.push('[ ' + array[i].permission)
        }
        else if (initpojcount === pojcount) {
          // console.log(']')
          project.push(array[i].permission + ' ]')
        }
        else {
          //console.log('main poj')
          project.push(array[i].permission)
        }

        var act = []
        let initactiviCount = 0
        for (let j = 0; j < lenghttimeObject; j++) {
          if (array[j].user === user && array[j].type === array[i].permission) {
            //console.log(j)
            initactiviCount++
            let actCount = this.countActivitie(array, user, array[j].type)
            // console.log('actCount :'+actCount+' initactiviCount :'+initactiviCount+' j :'+j)
            if (initactiviCount === 1 && actCount === 1) {
              act.push('[ ' + array[j].permission + ' ]')
            }
            else if (initactiviCount === 1) {
              //console.log('[ ')
              act.push('[ ' + array[j].permission)
            }
            else if (initactiviCount === actCount) {
              //console.log(']')
              act.push(array[j].permission + ' ]')
            }
            else {
              //console.log('main poj')
              act.push(array[j].permission)
            }

          }
        }
        activities.push(act)
      }
    }
    let emplist = new employeeProjectActivieAssign()
    emplist.user = user
    emplist.projects = project
    emplist.activities = activities
    emplist.workingHrs = tothrs
    //console.log(emplist)
    return emplist
  }
  private countProject(array: any, user: any, type: any) {
    var keys = Object.keys(array);
    let lenghttimeObject = keys.length
    let result = 0
    for (let i = 0; i < lenghttimeObject; i++) {

      if (array[i].user === user && array[i].type === type) {
        result++
      }
    }
    return result
  }
  private countActivitie(array: any, user: any, type: any) {
    var keys = Object.keys(array);
    //console.log(type)
    let lenghttimeObject = keys.length
    let result = 0
    for (let i = 0; i < lenghttimeObject; i++) {

      if (array[i].user === user && array[i].type === type) {
        result++

      }
    }
    return result
  }


}
