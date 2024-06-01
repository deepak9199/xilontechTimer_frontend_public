import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateRange, MatDatepicker, MatDateRangeSelectionStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
import { productsList, TimeClock, userListModel } from 'src/app/model/timer';
import { MessageService } from 'src/app/shared/_services/message.service';
import { TimeClcokService } from 'src/app/shared/_services/time-clcok.service';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
let startdateofweek: any
const moment = _rollupMoment || _moment;
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
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const MY_FORMATSYear = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-timer-report-employee',
  templateUrl: './timer-report-employee.component.html',
  styleUrls: ['./timer-report-employee.component.css'],
  providers: [{
    provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
    useClass: FiveDayRangeSelectionStrategy
  },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },

  {
    provide: MAT_DATE_FORMATS, useValue:MY_FORMATS  },
  ]
})
export class TimerReportEmployeeComponent implements OnInit {
  date = new FormControl(moment());
  Year = new FormControl(moment());
  hideWeek = true
  hideMonth = true
  hideYear = true
  disabled = true
  campaignOne: FormGroup;
  campaignTwo: FormGroup;
  fileName = 'ExcelSheet.xlsx';
  userList: Array<userListModel> = []
  timeClock: TimeClock[]
  products: productsList[]
  SelectType = 'LastMonth'
  username: any
  viewMonth: number
  viewYear: number
  totalWorkingHrs: number
  myDate: any
  VisitorsCurrentDate: any

  @ViewChild('dp') datePickerElement = MatDatepicker;

  constructor(
    private timeClockService: TimeClcokService,
    public toastr: ToastrService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.getweekdates()
  }

  ngOnInit(): void {
    this.username = this.messageService.getmessage()
    if (this.username === '') {
      this.router.navigate(['report'])
    }
    this.Search()
    // console.log(this.datePickerElement) 
    //console.log(this.datePickerElement['opened'])  

  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.viewYear = normalizedYear.year()
  }
  chosenOnlyYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.viewYear = normalizedYear.year()
    datepicker.close();
    this.getbyYear()
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.viewMonth = normalizedMonth.month()
    datepicker.close();
    this.getbyMonth()
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
  getbyWeek() {
    this.getTimeClockWeek(this.username, this.dateconverter(startdateofweek))
  }
  getbyMonth() {
    // console.log(this.viewMonth + '/' + this.viewYear)
    this.getTimeClockMonth(this.username, this.viewYear, this.viewMonth)
  }
  getbyYear() {
    this.getTimeClockYear(this.username, this.viewYear)
  }
  getbyLastMonth() {
    let todayDate = new Date()
    var LastMonth = todayDate.getMonth()
    var LastYear = todayDate.getFullYear()
    if (LastMonth === 0) {
      LastMonth = 11
      LastYear = LastYear - 1
    }
    else {
      LastMonth = LastMonth - 1
    }
    //console.log(LastMonth + '/' + LastYear)
    this.getTimeClockMonth(this.username, LastYear, LastMonth)
  }
  getTimeClockUser(user: string) {
    this.totalWorkingHrs = 0
    this.timeClockService.gettimeClck().subscribe(
      data => {
        //console.log(data.data);
        this.timeClock = data.data
        this.timeClock = this.timeClock.filter(item => item.status != 'Draft' && item.user === user);
        this.timeClock.map((item: any) => {
          this.totalWorkingHrs = this.totalWorkingHrs + item.totalworkinghour
        })

        //console.log(this.totalWorkingHrs)
      },
    )
  }
  getTimeClockWeek(user: string, date: any) {
    this.totalWorkingHrs = 0
    //console.log(startdateofweek + ' ' + this.username)
    this.timeClockService.gettimeClck().subscribe(
      data => {
        //console.log(data.data);
        this.timeClock = data.data
        this.timeClock = this.timeClock.filter(item => item.status != 'Draft' && item.user === user && item.date === date);
        this.timeClock.map((item: any) => {
          this.totalWorkingHrs = this.totalWorkingHrs + item.totalworkinghour
        })
        //this.timeClocklist.push(this.timeClock)
        //console.log(this.timeClock)
      },
    )
  }
  getTimeClockYear(user: string, year: any) {
    this.totalWorkingHrs = 0
    console.log(startdateofweek + ' ' + this.username)
    this.timeClockService.gettimeClck().subscribe(
      data => {
        //console.log(data.data);
        this.timeClock = data.data
        this.timeClock = this.timeClock.filter(item => item.status != 'Draft' && item.user === user && new Date(item.date).getFullYear() === year);
        this.timeClock.map((item: any) => {
          this.totalWorkingHrs = this.totalWorkingHrs + item.totalworkinghour
        })
        //this.timeClocklist.push(this.timeClock)
        //console.log(this.timeClock)
      },
    )
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
  Search() {
    //console.log(this.SelectUser)
    //this.getTimeClock(this.SelectUser)
    this.timeClock = []
    this.hideWeek = true
    this.hideMonth = true
    this.hideYear = true
    if (this.SelectType === 'All') {
      this.getTimeClockUser(this.username)
    }
    else if (this.SelectType === 'Week') {
      this.totalWorkingHrs = 0
      this.hideWeek = false
    } else if (this.SelectType === 'LastMonth') {
      this.getbyLastMonth()
    }
    else if (this.SelectType === 'Month') {
      this.totalWorkingHrs = 0
      this.hideMonth = false
    }
    else if (this.SelectType === 'Year') {
      this.totalWorkingHrs = 0
      this.hideYear = false
    }
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  approve(data: any) {

    let timeClock = new TimeClock()
    timeClock.user = data.user
    timeClock.status = "Approved"
    timeClock.timeType = data.timeType
    timeClock.date = data.date
    timeClock.sun = data.sun
    timeClock.mon = data.mon
    timeClock.tue = data.tue
    timeClock.wed = data.wed
    timeClock.thu = data.thu
    timeClock.fri = data.fri
    timeClock.sat = data.sat
    timeClock.totalworkinghour = data.totalworkinghour
    timeClock.activitiesCode = data.activitiesCode
    timeClock.projectCode = data.projectCode
    console.log(timeClock)

    this.timeClockService.updateTimeClock(data.id, timeClock).subscribe(
      res => {
        console.log(res)
        this.toastr.success('Approved')
        this.ngOnInit()
      }
    )

  }
  reject(data: any) {
    let timeClock = new TimeClock()
    timeClock.user = data.user
    timeClock.status = "Rejected"
    timeClock.timeType = data.timeType
    timeClock.date = data.date
    timeClock.sun = data.sun
    timeClock.mon = data.mon
    timeClock.tue = data.tue
    timeClock.wed = data.wed
    timeClock.thu = data.thu
    timeClock.fri = data.fri
    timeClock.sat = data.sat
    timeClock.totalworkinghour = data.totalworkinghour
    timeClock.activitiesCode = data.activitiesCode
    timeClock.projectCode = data.projectCode
    console.log(timeClock)

    this.timeClockService.updateTimeClock(data.id, timeClock).subscribe(
      res => {
        console.log(res)
        this.toastr.success('Rejected')
        this.ngOnInit()
      }
    )
  }
  dateconverter(dateString: any) {
    let momentVariable = moment(dateString, 'YYYY-MM-DD');
    let stringvalue = momentVariable.format('YYYY-MM-DD');
    return stringvalue
  }
}

