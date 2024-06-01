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
  selector: 'app-timer-clock',
  templateUrl: './timer-clock.component.html',
  styleUrls: ['./timer-clock.component.css'],
  providers: [{
    provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
    useClass: FiveDayRangeSelectionStrategy
  }]
})
export class TimerClockComponent implements OnInit {

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
  timeClockstatus:boolean
  timeClockstatusData:any[]=[]
  constructor(

    private timeClockService: TimeClcokService,
    private tokenStorege: TokenStorageService,
    private toastr: ToastrService,
    private AssineProjectServices: TimnerProjectAssineService,


  ) {
    this.getweekdates()
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
  ngOnInit(): void {
    this.gettimeclock()
    this.projectlist = this.AssineProjectServices.getUserAssineProject(this.tokenStorege.getUser().username, 'TimerProjectAssined')
    //console.log(this.projectlist)
  }
  setcurrentdatePicker() {
    this.date = new FormControl(new Date());
  }
  getactivities() {
    this.Activity = this.AssineProjectServices.getUserAssineProject(this.tokenStorege.getUser().username, this.formAddTime.permission)
    //console.log(this.Activity)
  }

  gettimeclock() {
    this.DeletetimeClocklist = []
    let username = this.tokenStorege.getUser().username
    this.timeClocklist = this.getTimeBy(username, this.dateconverter(startdateofweek))
    
  }
  getTimeBy(user: string, startweekdate: any) {
    let result: Array<TimeClock> = [];
    this.timeClockstatusData=[]
    this.timeClockstatus = false
    this.timeClockService.gettimeClck().subscribe(
      data => {
        data.data.map((item: any) => {
          if (item.user === user && item.date === startweekdate) {
            if (item.status === 'Submited' || item.status === 'Approved') {
              this.timeClockstatus = true
              this.timeClockstatusData.push(item)
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
  checkIsSubmitedORRejeced(): boolean {
    let result = false
    this.timeClockstatus = false
    this.timeClockstatusData=[]
    this.timeClocklist.map((ietm: any) => {
      //console.log(ietm.status)
      if (ietm.status === 'Submited' || ietm.status === 'Approved') {
        result = true
        this.timeClockstatus = true
        this.timeClockstatusData.push(ietm)
        stop()
      }
    })
   //console.log(this.timeClockstatusData)
    return result
  }
  checkDataPresentOrNot(poj: string, act: string): boolean {
    let result = false
    this.timeClocklist.map((item: any) => {
      //console.log(item)
      if (item.activitiesCode === act && item.projectCode === poj) {
        result = true
      }

    })
    return result
  }
  checkEmpty(): boolean {
    let result = false
    if (this.ValidatorChecker(this.formAddTime.permission) && this.ValidatorChecker(this.formAddTime.activitiesCode)) {
      result = true
    }
    // console.log(this.formAddTime.permission)
    // console.log(this.formAddTime.activitiesCode)
    return result
  }
  createTimes() {
    if (!this.checkIsSubmitedORRejeced()) {
      if (this.ValidatorChecker(startdateofweek)) {
        if (this.checkEmpty()) {
          if (!this.checkDataPresentOrNot(this.formAddTime.permission, this.formAddTime.activitiesCode)) {
            this.timeClock = new TimeClock()
            this.timeClock.id = 0
            this.timeClock.user = this.tokenStorege.getUser().username
            this.timeClock.status = "Created"
            this.timeClock.timeType = "Non Billable"
            this.timeClock.date = this.dateconverter(startdateofweek)
            this.timeClock.sun = 0
            this.timeClock.mon = 0
            this.timeClock.tue = 0
            this.timeClock.wed = 0
            this.timeClock.thu = 0
            this.timeClock.fri = 0
            this.timeClock.sat = 0
            this.timeClock.totalworkinghour = 0
            this.timeClock.activitiesCode = this.formAddTime.activitiesCode
            this.timeClock.projectCode = this.formAddTime.permission
            this.timeClocklist.push(this.timeClock)
            //console.log(this.timeClocklist)
            let ref = document.getElementById('cancel')
            if (ref === null) {
              console.log("null")
            }
            else {
              ref.click(),
                this.toastr.success("Time Added Successfully")
              //this.ngOnInit()
            }
          }
          else {
            alert('Data Allready Exist In Your Time Sheet')
          }


        }
        else {

          alert('Empty Input Not Accepted')
        }
      }
      else {
        let ref = document.getElementById('cancel')
        if (ref === null) {
          console.log("null")
        }
        else {
          ref.click(),
            this.toastr.error("Select Date")
          this.ngOnInit()
        }

      }
    }
    else {
      alert('Opration not Allow After Submit Time Sheet')
    }


  }
  submittimesheet() {
    let timeClocklist: Array<TimeClock> = [];
    let IfWorkingHrsPresnt: Array<TimeClock> = [];
    timeClocklist = this.timeClocklist
    if (!this.checkIsSubmitedORRejeced()) {
      this.DeletetimeClocklist.map((item: any) => {
        this.deleteTimeClock(item.id)
      })
      IfWorkingHrsPresnt = this.timeClocklist.filter(item => item.totalworkinghour != 0)
      if (IfWorkingHrsPresnt.length != 0) {
        this.timeClocklist.map((item: any) => {
          if (item.totalworkinghour != 0) {
            if (item.id === 0) {
              //console.log("post")
              item.status = 'Submited'
              this.addclockTime(item)
            }
            else {
              //console.log("put")
              item.status = 'Submited'
              this.updateclockTime(item, item.id)
            }
          }
          else {
            this.deleteTimeClock(item.id)
          }

        })
        this.toastr.success("Time Sheet Submited Successfully")
      }
      else {
        alert("There is No Working Hrs To Submit Time Sheet")
      }

    }
    else {
      alert('Opration not Allow After Submit Time Sheet')
    }
  }
  Drafttimesheet() {
    let timeClocklist = []
    timeClocklist = this.timeClocklist
    if (!this.checkIsSubmitedORRejeced()) {
      this.DeletetimeClocklist.map((item: any) => {
        this.deleteTimeClock(item.id)
      })
      this.timeClocklist.map((item: any) => {
        if (item.id === 0) {
          //console.log("post")
          item.status = 'Draft'
          this.addclockTime(item)
        }
        else {
          //console.log("put")
          item.status = 'Draft'
          this.updateclockTime(item, item.id)
        }
      })
      this.toastr.success("Time Sheet Save to Draft Successfully")
    }
    else {
      alert('Opration not Allow After Submit Time Sheet')
    }
  }

  updateArrayItem(data1: any, data2: any, data3: any, data4: any, data5: any, data6: any, data7: any, obj: any) {

    this.horSum = Number(data1) + Number(data2) + Number(data3) + Number(data4) + Number(data5) + Number(data6) + Number(data7)
    //console.log(isNaN(this.horSum))
    if (!isNaN(data1) && data1 != "" && !isNaN(data2) && data2 != "" && !isNaN(data3) && data3 != "" && !isNaN(data4) && data4 != "" && !isNaN(data5) && data5 != "" && !isNaN(data6) && data6 != "" && !isNaN(data7) && data7 != "") {

      let horSum1 = data1 + data2 + data3 + data4 + data5 + data6 + data7
      let index = this.timeClocklist.indexOf(obj)
      obj.mon = data1
      obj.tue = data2
      obj.wed = data3
      obj.thu = data4
      obj.fri = data5
      obj.sat = data6
      obj.sun = data7
      obj.totalworkinghour = this.horSum
      this.timeClocklist[index] = obj

    }
    else {
      //console.log("no")
      alert("Check Input is Empty or invalid or if no working Hrs then inster 0")
    }

  }


  checkAll(ele: any) {

    var checkboxes = document.getElementsByTagName('input');
    if (ele.checked) {
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox') {
          checkboxes[i].checked = false;
        }
      }
    } else {
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox') {
          checkboxes[i].checked = true;
        }
      }
    }
    //console.log(ele)
  }
  dateconverter(dateString: any) {
    let momentVariable = moment(dateString, 'YYYY-MM-DD');
    let stringvalue = momentVariable.format('YYYY-MM-DD');
    return stringvalue
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

  ValidatorChecker(data: any) {

    if (typeof data === "undefined" || data === null) {
      return false
    }
    else {
      return true
    }


  }
  delete(obj: any) {
    this.timeClocklist = this.timeClocklist.filter(item => item != obj)
    if (obj.id != 0) {
      this.DeletetimeClocklist.push(obj)
    }
    //console.log(this.DeletetimeClocklist)
  }
  deleteTimeClock(id: number) {
    this.timeClockService.deleteTimeClock(id).subscribe(
      data => {
        this.gettimeclock()
      },
      err => {
        console.log(err.error)
      }
    )
  }

}
