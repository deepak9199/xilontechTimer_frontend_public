import { Component, Injectable, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
import { activities, projectsAssine, TimeClock } from 'src/app/model/timer';
import { TimeClcokService } from 'src/app/shared/_services/time-clcok.service';
import { TimerActivitiesService } from 'src/app/shared/_services/timer-activities.service';
import { TimnerProjectAssineService } from 'src/app/shared/_services/timner-project-assine.service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';
import * as moment from 'moment';
import { filter, first, Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/shared/_services/message.service';
import { Router } from '@angular/router';


let startdateofweek: any
@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {

  date = new FormControl(new Date());
  constructor(private _dateAdapter: DateAdapter<D>) {

  }

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const startdate = this._dateAdapter.getDayOfWeek(date);
      const enddate = (6 - startdate)
      const start = this._dateAdapter.addCalendarDays(date, -startdate);
      const end = this._dateAdapter.addCalendarDays(date, enddate);
      startdateofweek = start
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
  call() {
    console.log("deepak date")
  }
}

@Component({
  selector: 'app-time-clock-appove-user-detail',
  templateUrl: './time-clock-appove-user-detail.component.html',
  styleUrls: ['./time-clock-appove-user-detail.component.css']
})
export class TimeClockAppoveUserDetailComponent implements OnInit {

  campaignOne: FormGroup;
  campaignTwo: FormGroup;
  formAddTime: any = {}
  timeClock: TimeClock
  timeClocklist: Array<TimeClock> = [];
  DeletetimeClocklist: Array<TimeClock> = [];
  projectlist: Array<projectsAssine> = [];
  Activity: Array<projectsAssine> = [];
  lenghttimeObject: any
  horSum: number
  isdatevalue: any
  today: any
  date = new FormControl(new Date());
  timeClockstatus = false
  username = ''
  disabled=true
  constructor(
    private messageService: MessageService,
    private timeClockService: TimeClcokService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.getweekdates()
  }

  ngOnInit(): void {
    if (this.messageService.getmessage() === '') {
      this.router.navigate(['timeCLockApprove'])
    }
    else {

      this.gettimeclock()
    }
  }
  gettimeclock() {
    let data = JSON.parse(this.messageService.getmessage())
    this.username=data.user
    this.timeClocklist = this.getTimeBy(data.user, this.dateconverter(data.date))
    console.log(this.timeClocklist)
  }
  getTimeBy(user: string, startweekdate: any) {
    let result: Array<TimeClock> = [];
    this.timeClockstatus = false
    this.timeClockService.gettimeClck().subscribe(
      data => {
        data.data.map((item: any) => {
          if (item.user === user && item.date === startweekdate) {
            if (item.status === 'Submited' || item.status === 'Rejected' || item.status === 'Approved') {
              this.timeClockstatus = true
            }
            result.push(item)
          }
        })

      },
      err => {
        console.log(err.error)
      }
    )
    return result
  }
  dateconverter(dateString: any) {
    let momentVariable = moment(dateString, 'YYYY-MM-DD');
    let stringvalue = momentVariable.format('YYYY-MM-DD');
    return stringvalue
  }
  getweekdates() {
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();
    startdateofweek = new Date(firstday)
    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(firstday)),
      end: new FormControl(new Date(lastday)),
    });
  }
  approve() {
    let timeClocklist = []
    //timeClocklist = this.timeClocklist.filter(item => item.user === obj.user && item.date === obj.weekDate)
    console.log(this.timeClocklist)
    //console.log(obj)
    this.timeClocklist.map((item: any) => {
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
  reject() {
    let timeClocklist = []
    //timeClocklist = this.timeClocklist.filter(item => item.user === obj.user && item.date === obj.weekDate)
   // console.log(timeClocklist)
    this.timeClocklist.map((item: any) => {
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
        this.gettimeclock()
      })
  }
  updateclockTime(data: any, id: number) {
    this.timeClockService.updateTimeClock(id, data).pipe(first())
      .subscribe(data => {
        this.gettimeclock()
      })
  }
  updateArrayItem(data1: any, data2: any, data3: any, data4: any, data5: any, data6: any, data7: any, obj: any) {


  }
}
