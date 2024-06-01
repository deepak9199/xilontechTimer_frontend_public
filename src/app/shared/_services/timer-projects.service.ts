import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerProjectsService {
  baseURL = 'http://localhost:8081/api/project/';
  constructor(private http: HttpClient) { }

  gettimeprojects(): Observable<any> {
    return this.http.get(this.baseURL,
      {});
  }
  posttimeprojects(project:any): Observable<any> {
    return this.http.post(this.baseURL,
      {

        id: project.id,
        projectCode: project.projectCode,
        projectname: project.projectname,
        projectDescription: project.projectDescription,

      });
  }
  deleteprojects(id: number) {
    return this.http.delete(this.baseURL + id)
  }
}
