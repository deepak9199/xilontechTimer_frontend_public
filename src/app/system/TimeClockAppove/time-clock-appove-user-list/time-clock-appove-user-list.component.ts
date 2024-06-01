import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { TimeApproveModel, TimeClock } from 'src/app/model/timer';
import { MessageService } from 'src/app/shared/_services/message.service';
import { TimeClcokService } from 'src/app/shared/_services/time-clcok.service';
import * as moment from 'moment';

@Component({
  selector: 'app-time-clock-appove-user-list',
  templateUrl: './time-clock-appove-user-list.component.html',
  styleUrls: ['./time-clock-appove-user-list.component.css']
})
export class TimeClockAppoveUserListComponent implements OnInit {

  totalWorkingHrs: number
  timeClock: TimeClock[]
  TimeApprovList: Array<TimeApproveModel> = []
  emplist: any = []
  SelectUser = 'All'
  timeClocklist: Array<TimeClock> = [];
  constructor(
    private timeClockService: TimeClcokService,
    public toastr: ToastrService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getTimeClockEmpList(this.SelectUser)
  }
  getTimeClockEmpList(user: any) {
    if (user === 'All') {
      this.TimeApprovList = this.getTimeClockAll()
    }
    else {
      this.TimeApprovList = this.getTimeClockUser(user)
    }

  }
  getTimeClockAll() {
    this.timeClocklist = []
    let result: Array<TimeApproveModel> = []
    this.emplist = []
    let count = 0
    this.timeClockService.gettimeClck().subscribe(
      data => {
        let timeClock = data.data
        this.timeClocklist = data.data
        const TimeClockUniqueByUser = [...new Map(timeClock.map((item: any) =>
          [item['user'], item])).values()];
        this.emplist = TimeClockUniqueByUser
        let length = TimeClockUniqueByUser.length
        TimeClockUniqueByUser.map((Uniqueitemuser: any) => {
          count++
          timeClock = data.data
          timeClock = timeClock.filter((item: any) => item.user === Uniqueitemuser.user)
          const TimeClockUniqueByDate = [...new Map(timeClock.map((item: any) =>
            [item['date'], item])).values()];
          TimeClockUniqueByDate.map((Uniqueitem: any) => {
            let TimeApprov = new TimeApproveModel()
            let WeekTotalWorkingHrs = 0
            timeClock.map((item: any) => {
              if (Uniqueitem.date === item.date) {
                WeekTotalWorkingHrs += item.totalworkinghour
              }
            })
            TimeApprov.status = Uniqueitem.status
            TimeApprov.user = Uniqueitem.user
            TimeApprov.workingHrs = WeekTotalWorkingHrs
            TimeApprov.weekDate = Uniqueitem.date
            TimeApprov.weekDateRange = this.getStartEndWeekDate(Uniqueitem.date)
            if (TimeApprov.status != 'Draft' && TimeApprov.status != 'Approved' && TimeApprov.status != 'Rejected')
              result.push(TimeApprov)
          })
        })
      },
      err => {
        console.log(err.error)
      }
    )
    return result
  }
  getTimeClockUser(user: string) {
    this.timeClocklist = []
    let result: Array<TimeApproveModel> = []
    this.emplist = []
    this.timeClockService.gettimeClck().subscribe(
      data => {
        let timeClock = data.data
        this.timeClocklist = data.data
        const TimeClockUniqueByUser = [...new Map(timeClock.map((item: any) =>
          [item['user'], item])).values()];
        this.emplist = TimeClockUniqueByUser
        timeClock = timeClock.filter((item: any) => item.user === user)
        const TimeClockUniqueByDate = [...new Map(timeClock.map((item: any) =>
          [item['date'], item])).values()];
        TimeClockUniqueByDate.map((Uniqueitem: any) => {
          let TimeApprov = new TimeApproveModel()
          let WeekTotalWorkingHrs = 0
          timeClock.map((item: any) => {
            if (Uniqueitem.date === item.date) {
              WeekTotalWorkingHrs += item.totalworkinghour
            }
          })
          TimeApprov.status = Uniqueitem.status
          TimeApprov.user = Uniqueitem.user
          TimeApprov.workingHrs = WeekTotalWorkingHrs
          TimeApprov.weekDate = Uniqueitem.date
          TimeApprov.weekDateRange = this.getStartEndWeekDate(Uniqueitem.date)
          if (TimeApprov.status != 'Draft' && TimeApprov.status != 'Approved' && TimeApprov.status != 'Rejected')
            result.push(TimeApprov)
        })

      },
      err => {
        console.log(err.error)
      }
    )
    //console.log(result)
    return result
  }
  Search() {
    this.getTimeClockEmpList(this.SelectUser)
  }
  rout(user: any) {
    let data =
    {
      user: user.user,
      date: user.weekDate
    }
    this.router.navigate(['timeCLockApprove/Detail'])
    this.messageService.setmessage(JSON.stringify(data))
  }
  approve(obj: any) {
    let timeClocklist = []
    timeClocklist = this.timeClocklist.filter(item => item.user === obj.user && item.date === obj.weekDate)
    //console.log(this.timeClocklist)
    console.log(obj)
    timeClocklist.map((item: any) => {
      if (item.id === 0) {
        //console.log("post")
        item.status = 'Approved'
        this.addclockTime(item)
      }
      else {
        //console.log("put")
        item.status = 'Approved'
        this.updateclockTime(item, item.id)
      }
    })
    this.toastr.success("Time Sheet Approved")
  }
  reject(obj: any) {
    let timeClocklist = []
    timeClocklist = this.timeClocklist.filter(item => item.user === obj.user && item.date === obj.weekDate)
    //console.log(timeClocklist)
    timeClocklist.map((item: any) => {
      if (item.id === 0) {
        //console.log("post")
        item.status = 'Rejected'
        this.addclockTime(item)
      }
      else {
        //console.log("put")
        item.status = 'Rejected'
        this.updateclockTime(item, item.id)
      }
    })
    this.toastr.error("Time Sheet Rejected")
  }
  addclockTime(data: any) {
    this.timeClockService.posttimeClck(data).pipe(first())
      .subscribe(data => {
        this.getTimeClockEmpList(this.SelectUser)
      })
  }
  updateclockTime(data: any, id: number) {
    this.timeClockService.updateTimeClock(id, data).pipe(first())
      .subscribe(data => {
        this.getTimeClockEmpList(this.SelectUser)
      })
  }
  getStartEndWeekDate(date: string) {
    let result = ''
    var curr = new Date(date); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();
    let first_Date = (moment(firstday)).format('DD-MMM-YYYY')
    let last_Date = (moment(lastday)).format('DD-MMM-YYYY')
    result = '(' + first_Date + ') - (' + last_Date + ')'
    return result
  }
}
