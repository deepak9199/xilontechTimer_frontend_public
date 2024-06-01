import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeClock } from 'src/app/model/timer';

@Injectable({
  providedIn: 'root'
})
export class TimeClcokService {
  baseURL = 'http://localhost:8081/api/timeClock/';
  constructor(private http: HttpClient) { }

  gettimeClck(): Observable<any> {
    return this.http.get(this.baseURL,
      {});
  }
  posttimeClck(timeClock: any): Observable<any> {
    return this.http.post(this.baseURL,
      {
        id: timeClock.id,
        user: timeClock.user,
        status: timeClock.status,
        timeType: timeClock.timeType,
        date: timeClock.date,
        sun: timeClock.sun,
        mon: timeClock.mon,
        tue: timeClock.tue,
        wed: timeClock.wed,
        thu: timeClock.thu,
        fri: timeClock.fri,
        sat: timeClock.sat,
        totalworkinghour: timeClock.totalworkinghour,
        activitiesCode: timeClock.activitiesCode,
        projectCode: timeClock.projectCode,

      });
  }
  updateTimeClock(id: number, timeClock: any) {
    // console.log(id)
    return this.http.put(this.baseURL + id, {
      user: timeClock.user,
      status: timeClock.status,
      timeType: timeClock.timeType,
      date: timeClock.date,
      sun: timeClock.sun,
      mon: timeClock.mon,
      tue: timeClock.tue,
      wed: timeClock.wed,
      thu: timeClock.thu,
      fri: timeClock.fri,
      sat: timeClock.sat,
      totalworkinghour: timeClock.totalworkinghour,
      activitiesCode: timeClock.activitiesCode,
      projectCode: timeClock.projectCode,
    })
  }
  deleteTimeClock(id: number) {
    return this.http.delete(this.baseURL + id)
  }
  getTimeClockBy(user: any, date: any) {
    let result: Array<TimeClock> = [];
    this.gettimeClck().subscribe(
      data => {

        let timelist: Array<TimeClock> = [];
        let datalist = data.data
        let timeClocklist: Array<TimeClock> = [];
        this.ArryPush(timelist, datalist)
        timeClocklist = this.searchTimeClock(timelist, user, date)
        this.ArryPush(result, timeClocklist)
      },
    )
    //console.log(result)
    return result

  }
  private ArryPush(array: any, data: any) {
    let lenghttimeObject: any
    var keys = Object.keys(data);
    lenghttimeObject = keys.length
    for (let i = 0; i < lenghttimeObject; i++) {
      array.push(data[i])
    }

  }
  private searchTimeClock(array: any, user: any, startweekdate: any) {

    var keys = Object.keys(array);
    let lengthobj = keys.length
    // console.log(startweekdate + ' ' + user + ' ' + lengthobj)
    let result: Array<TimeClock> = []
    for (let i = 0; i < lengthobj; i++) {
      if (array[i].user === user && array[i].date === startweekdate)
        result.push(array[i])
    }
    return result
  }
}
