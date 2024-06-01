import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { activities, projects, userListModel } from 'src/app/model/timer';
import { TimerActivitiesService } from 'src/app/shared/_services/timer-activities.service';
import { TimerProjectsService } from 'src/app/shared/_services/timer-projects.service';
import { TimnerProjectAssineService } from 'src/app/shared/_services/timner-project-assine.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  // timeactivities: Array<activities> = [] 
  timeactivities: activities[]
  Globletimeactivities: activities[]
  projectList: projects[]
  isadmin = true
  form: any = {}
  activityOpt: Array<userListModel> = []
  Selectpoj = 'All'
  constructor(
    private timeactivitiservice: TimerActivitiesService,
    private projectService: TimerProjectsService,
    private toster: ToastrService,
    private permissionService: TimnerProjectAssineService
  ) { }

  ngOnInit(): void {
    this.getactivities()
    this.getprojectlsit()
  }
  Search() {
    if (this.Selectpoj === 'All') {
      this.Globletimeactivities = this.timeactivities
    }
    else {
      this.Globletimeactivities = this.timeactivities
      this.Globletimeactivities = this.Globletimeactivities.filter(item => item.projectCode === this.Selectpoj)
    }
  }
  getprojectlsit() {
    this.projectService.gettimeprojects().subscribe(
      data => {
        this.projectList = data.data
        //console.log(this.projectList)
      },
      err => {
        console.log(err.error)
      }
    )
  }
  getactivities() {
    //this.timeactivities.length=0
    this.timeactivitiservice.gettimeactivities().subscribe(
      data => {
        //console.log("run again")
        this.timeactivities = data.data
        this.Globletimeactivities = this.timeactivities
        //console.log(this.timeactivities)
      },
      err => {
        console.log(err.error)

      }
    )
  }

  add() {
    if (this.checkEmpty()) {
      if (!this.checkDataPresentOrNot(this.form.projectCode, this.form.activitiesCode, this.form.activitiesname)) {
        if (!this.checkActPresentOrNot(this.form.projectCode, this.form.activitiesCode)) {
          if (!this.checkActNamePresentOrNot(this.form.projectCode, this.form.activitiesname)) {
            this.postAct()
          }
          else {
            alert('Prject Code And Activity Name ALready Presnt')
          }
        }
        else {
          alert('Prject Code And Activity Code ALready Presnt')
        }
      }
      else {
        alert('Prject Code And Activity Code And Activity Name ALready Presnt')
      }
    }
    else {
      alert('Empty input not Accepted')
    }
  }
  postAct() {
    let activitie = new activities()
    activitie.activitiesCode = this.form.activitiesCode
    activitie.activitiesDescription = this.form.activitiesDescription
    activitie.activitiesname = this.form.activitiesname
    activitie.projectCode = this.form.projectCode
    //console.log(activitie)
    this.timeactivitiservice.posttimeactivities(activitie).pipe(first())
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
  deleteactivity(obj: any) {
    //console.log(obj)
    this.permissionService.gettimeprojectsAssine().subscribe(
      data => {
       // console.log('poj :' + obj.id)
        this.deleteAct(obj.id)

        data.data.map((item: any) => {
          if (item.type === obj.projectCode && item.permission === obj.activitiesCode) {
            //console.log('act :' + item.id)
            this.deletePer(item.id)
          }
        })
        this.toster.success('Remove Successfully')

      },
      err => {
        console.log(err.error)
      }
    )


  }
  deleteAct(id: any) {

    this.timeactivitiservice.deleteActivities(id).pipe(first())
      .subscribe(data => {
        // this.toster.success('Product Deleted')
        this.ngOnInit()
      })

  }
  deletePer(id: any) {

    this.permissionService.deleteprojectsAssine(id).pipe(first())
      .subscribe(data => {
        // this.toster.success('Remove Successfully')

      })

  }
  checkDataPresentOrNot(pojCode: string, actCode: string, actName: string): boolean {
    let result = false
    this.timeactivities.map((item: any) => {
      //console.log(item)
      if (item.activitiesCode === actCode && item.projectCode === pojCode && item.activitiesname === actName) {
        result = true
      }

    })
    return result
  }
  checkActPresentOrNot(pojcode: string, actCode: string): boolean {
    let result = false
    //console.log(poj)
    this.timeactivities.map((item: any) => {
      //console.log(item.projectCode)
      if (item.projectCode === pojcode && item.activitiesCode === actCode) {
        result = true
      }

    })
    return result
  }
  checkActNamePresentOrNot(pojCode: string, actName: string): boolean {
    let result = false
    //console.log(pojName)
    this.timeactivities.map((item: any) => {
      //console.log(item)
      if (item.projectCode === pojCode && item.activitiesname === actName) {
        result = true
      }

    })
    return result
  }
  checkEmpty(): boolean {
    let result = false
    // console.log(this.form.projectCode)
    // console.log(this.form.activitiesCode)
    // console.log(this.form.activitiesname)
    // console.log(this.form.activitiesDescription)
    if (this.ValidatorChecker(this.form.projectCode) && this.ValidatorChecker(this.form.activitiesCode) && this.ValidatorChecker(this.form.activitiesname) && this.ValidatorChecker(this.form.activitiesDescription)) {
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
