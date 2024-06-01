import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, subscribeOn, Subscriber } from 'rxjs';
import { activities, activityModel } from 'src/app/model/timer';

@Injectable({
  providedIn: 'root'
})
export class TimerActivitiesService {
  baseURL = 'http://localhost:8081/api/activities/';
  constructor(private http: HttpClient) { }

  gettimeactivities(): Observable<any> {
    return this.http.get(this.baseURL,
      {});
  }
  posttimeactivities(activities: any): Observable<any> {
    return this.http.post(this.baseURL,
      {

        id: activities.id,
        activitiesCode: activities.activitiesCode,
        activitiesname: activities.activitiesname,
        activitiesDescription: activities.activitiesDescription,
        projectCode: activities.projectCode,
      });
  }
  deleteActivities(id: number) {
    return this.http.delete(this.baseURL + id)
  }
  // getAcrivitiesByProject(project: any){
  //   let avtivitieslist: Array<activities> = []
  //   let result: Array<activityModel> = []

  //   this.gettimeactivities().subscribe(
  //     data => {
        
  //       data.data.map((item:any) => {
  //        if(item.projectCode===project)
  //        {
  //          result.push(item.activitiesCode)
  //        }
  //       });
       
  //     },
  //     err => {
  //       console.log(err.error)
  //     }
  //   )
  //   console.log(result.length)
  //   return result
  // }
  SearchActivities(array: any, proj: any) {
    //console.log(array)
    let lenghttimeObject: any
    let result = []
    var keys = Object.keys(array);
    lenghttimeObject = keys.length
    for (let i = 0; i < lenghttimeObject; i++) {
      if (array[i].projectCode === proj) {
        result.push(array[i].activitiesCode)
      }
    }
    return result
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
}
