import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { activities, activityModel, AssignManagerModel, CustomersList, employeeProjectActivieAssign, projects, projectsAssine, TimeClock } from 'src/app/model/timer';
import { AccountService } from 'src/app/shared/_services/account-service';
import { MessageService } from 'src/app/shared/_services/message.service';
import { TimerActivitiesService } from 'src/app/shared/_services/timer-activities.service';
import { TimerProjectsService } from 'src/app/shared/_services/timer-projects.service';
import { TimnerProjectAssineService } from 'src/app/shared/_services/timner-project-assine.service';

@Component({
  selector: 'app-timer-assign-project-employee',
  templateUrl: './timer-assign-project-employee.component.html',
  styleUrls: ['./timer-assign-project-employee.component.css']
})
export class TimerAssignProjectEmployeeComponent implements OnInit {

  form: any = {}
  projectlist: projects[]
  userlist: CustomersList[]
  projetAssine: projectsAssine[]
  emplist: employeeProjectActivieAssign[]
  assignManagerList: AssignManagerModel[] = []
  timeClocklist: TimeClock[]
  userList:[]
  username = ''
  checkbox = true
  constructor(
    private customeService: AccountService,
    private projectService: TimerProjectsService,
    private projectAssineService: TimnerProjectAssineService,
    private activitieServices: TimerActivitiesService,
    private toster: ToastrService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getTimerProjectList()
    this.getuserlist()
    this.getTimerProjectAssine()
    this.username = this.messageService.getmessage()
    if(this.username==='')
    {
      this.router.navigate(['resourceManager'])
    }
  }
  add() {
    if (this.checkEmpty()) {
      if (!this.checkDataPresentOrNot(this.form.projectCode)) {
        this.getprojectAssine()
      }
      else {
        alert('Selcted Project Already Exist')
      }
    }
    else {
      alert('Empty Input Not Accepted')
    }
  }
  getprojectAssine() {
    //console.log('add')
    let projetAssine: projectsAssine
    projetAssine = new projectsAssine()
    projetAssine.permission = this.form.projectCode
    projetAssine.user = this.username
    projetAssine.type = "TimerProjectAssined"
    this.addprojectassine(projetAssine)
    this.addAssignManager(this.form.projectCode)
  }
  addAssignManager(projectCode: any) {
    let activities: any[] = []
    let assginlist = new AssignManagerModel()
    assginlist.projects = projectCode
    this.activitieServices.gettimeactivities().subscribe(
      data => {

        data.data.map((item: any) => {
          if (item.projectCode === projectCode) {
            activities.push(item.activitiesCode)
          }
        });
        this.projectAssineService.gettimeprojectsAssine().subscribe(
          data => {

            //console.log(activities.length)
            data.data.map((itemselect: any) => {
              if (itemselect.user === this.username && itemselect.type === "TimerProjectAssined" && itemselect.permission === projectCode) {
                assginlist.projectsId = itemselect.id
              }

            })
            for (let i = 0; i < activities.length; i++) {

              if (i === 0) {

                assginlist.activities1Select = false
                assginlist.activities1 = activities[i]
                data.data.map((itemselect: any) => {
                  if (itemselect.user === this.username && itemselect.type === projectCode && itemselect.permission === activities[i]) {
                    assginlist.activities1Id = itemselect.id
                    assginlist.activities1Select = true
                  }

                })

              }
              else if (i === 1) {
                assginlist.activities2Select = false
                assginlist.activities2 = activities[i]
                data.data.map((itemselect: any) => {
                  if (itemselect.user === this.username && itemselect.type === projectCode && itemselect.permission === activities[i]) {
                    assginlist.activities2Select = true
                    assginlist.activities2Id = itemselect.id
                  }
                })
              }
              else if (i === 2) {
                assginlist.activities3Select = false
                assginlist.activities3 = activities[i]
                data.data.map((itemselect: any) => {
                  if (itemselect.user === this.username && itemselect.type === projectCode && itemselect.permission === activities[i]) {
                    assginlist.activities3Select = true
                    assginlist.activities3Id = itemselect.id
                  }

                })
              }
              else if (i === 3) {
                assginlist.activities4Select = false
                assginlist.activities4 = activities[i]
                data.data.map((itemselect: any) => {
                  if (itemselect.user === this.username && itemselect.type === projectCode && itemselect.permission === activities[i]) {
                    assginlist.activities4Select = true
                    assginlist.activities4Id = itemselect.id
                  }
                })
              }
              else if (i === 4) {
                assginlist.activities5Select = false
                assginlist.activities5 = activities[i]
                data.data.map((itemselect: any) => {
                  if (itemselect.user === this.username && itemselect.type === projectCode && itemselect.permission === activities[i]) {
                    assginlist.activities5Select = true
                    assginlist.activities5Id = itemselect.id
                  }

                })
              }
              else {
                console.log('activities more then 5 items')
                break
              }
            }
            // console.log(assginlist)
            this.assignManagerList.push(assginlist)
          })

      },
      err => {
        console.log(err.error)
      }
    )

  }
  RemoveDataArray() {
    console.log(this.assignManagerList.length)
  }
  addprojectassine(data: any) {

    this.projectAssineService.posttimeprojectsAssine(data).pipe(first())
      .subscribe(data => {
        // console.log(data);
        let ref = document.getElementById('cancel')
        if (ref === null) {
          console.log('ref-error')
        }
        else {
          ref.click(),
            this.toster.success("Project Assine Sucessfully")
        }

      })
  }

  getuserlist() {
    this.customeService.getAccounts().subscribe(data => {
      this.userlist = data.data
      //console.log(this.userlist)
    })
  }
  getTimerProjectList() {
    this.projectService.gettimeprojects().subscribe(data => {
      this.projectlist = data.data
      //console.log(this.projectlist)
    })
  }
  getTimerProjectAssine() {
    this.projectAssineService.gettimeprojectsAssine().subscribe(data => {
      data.data.map((item: any) => {
        //console.log(item)
        if (item.user === this.username && item.type === "TimerProjectAssined") {
          //console.log(item.permission)
          this.addAssignManager(item.permission)
        }

      })
      //console.log(this.projetAssine)
      //console.log(this.projectlist)
    })
    this.emplist = this.projectAssineService.getEmployeeList()
    //console.log(this.emplist)
  }
  getTimerActivityAssine(proj: string, act: string) {
    let result = false
    this.projectAssineService.gettimeprojectsAssine().subscribe(data => {
      data.data.map((item: any) => {
        if (item.user === this.username && item.type === proj && item.permission === act) {
          result = true
          //console.log(result)

        }

      })
    })
    return result
  }
  delete(id: any) {

    this.projectAssineService.deleteprojectsAssine(id).pipe(first())
      .subscribe(data => {
        // this.toster.success('Remove Successfully')

      })

  }
  deletePoj(obj: any) {
    console.log(obj.projectsId)
    this.assignManagerList = this.assignManagerList.filter(item => item != obj);
    console.log(this.assignManagerList)
    this.delete(obj.projectsId)
    if (obj.activities1Id != null) {
      this.delete(obj.activities1Id)
    }
    if (obj.activities2Id != null) {
      this.delete(obj.activities2Id)
    }
    if (obj.activities3Id != null) {
      this.delete(obj.activities3Id)
    }
    if (obj.activities4Id != null) {
      this.delete(obj.activities4Id)
    }
    if (obj.activities5Id != null) {
      this.delete(obj.activities5Id)
    }
    this.toster.success('Remove Successfully')
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
          // checkboxes[i].checked = true;
        }
      }
    }
    console.log(ele)
  }
  getAcrivitiesByProject(project: any) {
    let avtivitieslist: Array<activities> = []
    let result: Array<activityModel> = []

    this.activitieServices.gettimeactivities().subscribe(
      data => {

        data.data.map((item: any) => {
          if (item.projectCode === project) {
            result.push(item.activitiesCode)
          }
        });

      },
      err => {
        console.log(err.error)
      }
    )
  }
  addActivity(projectCode: string, activityCode: string, activityID: any, $event: any) {
    const isChecked = $event.target.checked
    if (isChecked === true) {
      let projetAssine: projectsAssine
      projetAssine = new projectsAssine()
      projetAssine.permission = activityCode
      projetAssine.user = this.username
      projetAssine.type = projectCode
      this.addprojectassine(projetAssine)
    }
    else {
      this.delete(activityID)
    }

  }
  changechecked() {
    if (this.checkbox === true) {
      this.checkbox = false
    }
    else {
      this.checkbox = true
    }
  }
  checkDataPresentOrNot(poj: string): boolean {
    let result = false
    this.assignManagerList.map((item: any) => {
      //console.log(item)
      if (item.projects === poj) {
        result = true
      }

    })
    return result
  }

  checkEmpty(): boolean {
    let result = false
    if (this.ValidatorChecker(this.form.projectCode)) {
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
