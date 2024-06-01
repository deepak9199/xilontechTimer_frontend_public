import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { projects } from 'src/app/model/timer';
import { TimerActivitiesService } from 'src/app/shared/_services/timer-activities.service';
import { TimerProjectsService } from 'src/app/shared/_services/timer-projects.service';
import { TimnerProjectAssineService } from 'src/app/shared/_services/timner-project-assine.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  isadmin = true
  form: any = {}
  timeproject: projects[]

  constructor(
    private timeprojectservice: TimerProjectsService,
    private timeactivitiservice: TimerActivitiesService,
    private permissionService: TimnerProjectAssineService,
    private toster: ToastrService
  ) { }

  ngOnInit(): void {
    this.timeproject=[]
    this.timeprojectservice.gettimeprojects().subscribe(
      data => {
        //console.log(data.data);
        this.timeproject = data.data
        //console.log(this.timeproject)
      },
    )
  }
  add() {
    if (this.checkEmpty()) {
      if (!this.checkProjectPresentOrNot(this.form.projectCode)) {
        if (!this.checkProjectNamePresentOrNot(this.form.projectname)) {
          if (!this.checkDataPresentOrNot(this.form.projectCode, this.form.projectname)) {
            this.postTimerProject()
          }
          else {
            alert('Prject Code And Project Name ALready Presnt')
          }
        }
        else {
          alert('Prject Name Already Present')
        }
      }
      else {
        alert('Project Code Already Present')
      }

    }
    else {
      alert('Empty Input Not Accepted')
    }

  }
  postTimerProject() {
    this.timeprojectservice.posttimeprojects(this.form).pipe(first())
      .subscribe(data => {
        //console.log('check add product :' + data);
        let ref = document.getElementById('cancel')
        if (ref === null) {
          console.log("null")
        }
        else {
          ref.click(),
            this.toster.success("Product Added Successfully"),
            this.ngOnInit()
        }


      })
  }
  update(project: any) {

  }
  DeleteProject(obj: any) {
    //console.log(obj)
    this.timeactivitiservice.gettimeactivities().subscribe(
      data => {
        //console.log('poj :' + obj.id)
        this.deletePoj(obj.id)
        data.data.map((itemAct: any) => {
          if (itemAct.projectCode === obj.projectCode) {
            //console.log('act :' + itemAct.id)
            this.deleteAct(itemAct.id)
            this.permissionService.gettimeprojectsAssine().subscribe(
              data => {
                data.data.map((itemPer: any) => {
                  if (itemPer.type === "TimerProjectAssined" && itemPer.permission === itemAct.projectCode) {
                    //console.log('perPoj :' + itemPer.id)
                    this.deletePerPoj(itemPer.id)
                  }
                  if (itemPer.type === itemAct.projectCode && itemPer.permission === itemAct.activitiesCode) {
                    //console.log('perAct :' + itemPer.id)
                    this.deletePerAct(itemPer.id)
                  }
                })
              },
              err => {
                console.log(err.error)
              }
            )
          }
        })
        // this.toster.success('Remove Successfully')
        // this.ngOnInit()
      },
      err => {
        console.log(err.error)
      }
    )
  }
  deletePoj(id: any) {

    this.timeprojectservice.deleteprojects(id).pipe(first())
      .subscribe(data => {
        this.toster.success('Remove Successfully')
        this.ngOnInit()
      })

  }
  deleteAct(id: any) {

    this.timeactivitiservice.deleteActivities(id).pipe(first())
      .subscribe(data => {
        // this.toster.success('Product Deleted')
        // this.ngOnInit()
      })

  }
  deletePerAct(id: any) {

    this.permissionService.deleteprojectsAssine(id).pipe(first())
      .subscribe(data => {
        // this.toster.success('Remove Successfully')

      })

  }
  deletePerPoj(id: any) {

    this.permissionService.deleteprojectsAssine(id).pipe(first())
      .subscribe(data => {
        // this.toster.success('Remove Successfully')

      })

  }
  checkDataPresentOrNot(poj: string, pojName: string): boolean {
    let result = false
    this.timeproject.map((item: any) => {
      //console.log(item)
      if (item.activitiesCode === pojName && item.projectCode === poj) {
        result = true
      }

    })
    return result
  }
  checkProjectPresentOrNot(poj: string): boolean {
    let result = false
    //console.log(poj)
    this.timeproject.map((item: any) => {
      //console.log(item.projectCode)
      if (item.projectCode === poj) {
        result = true
      }

    })
    return result
  }
  checkProjectNamePresentOrNot(pojName: string): boolean {
    let result = false
    //console.log(pojName)
    this.timeproject.map((item: any) => {
      //console.log(item)
      if (item.projectname === pojName) {
        result = true
      }

    })
    return result
  }
  checkEmpty(): boolean {
    let result = false
    if (this.ValidatorChecker(this.form.projectCode) && this.ValidatorChecker(this.form.projectname) && this.ValidatorChecker(this.form.projectDescription)) {
      result = true
    }
    return result
  }
  ValidatorChecker(data: any) {

    if (typeof data === "undefined" || data === null) {
      return false
    }
    else {
      return true
    }


  }
}
