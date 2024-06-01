export class CustomersList {
    id: number;
    firstName: string;
    lastName: string;
    orgCode: string;
    user: string;
    accountAuthority: string;
    about: string;
    address: string;
    city: string;
    companyname: string;
    contactnumber: number
    country: string
    postalcode: number
}
export class TimeClock {
    id: number;
    user: string;
    status: string;
    timeType: string;
    date: string;
    sun: number;
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number;
    sat: number;
    totalworkinghour: number;
    activitiesCode: string;
    projectCode: string

}
export class activities {
    constructor() {
        this.id = 0
        this.activitiesCode = ""
        this.activitiesname = ""
        this.activitiesDescription = ""
        this.projectCode = ""
    }
    id: number;
    activitiesCode: string;
    activitiesname: string;
    activitiesDescription: string;
    projectCode: string;
}
export class projects {
    id: number;
    projectCode: string;
    projectname: string;
    projectDescription: string;

}
export class projectsAssine {
    constructor() {
        this.id = 0
        this.user = ""
        this.type = ""
        this.permission = ""
    }
    id: number;
    user: string;
    type: string;
    permission: string;

}
export class productsList {
    id: number;
    productCode: string;
    productDesc: string;
    productName: string;

}

export class employeeProjectActivieAssign {
    user: string
    projects: string[];
    activities: string[][];
    workingHrs:number
}
export class AssignManagerModel {
    // constructor() {
    //     this.projectsId = 0
    //     this.projects = ''
    //     this.activities1Select = false
    //     this.activities1Id = 0;
    //     this.activities1 = '';
    //     this.activities2Select = false
    //     this.activities2Id = 0;
    //     this.activities2 = '';
    //     this.activities3Select = false
    //     this.activities3Id = 0;
    //     this.activities3 = '';
    //     this.activities4Select = false
    //     this.activities4Id = 0;
    //     this.activities4 = '';
    //     this.activities5Select = false
    //     this.activities5Id = 0;
    //     this.activities5 = '';
    // }
    projectsId: number;
    projects: string;
    activities1Select: boolean
    activities1Id: number;
    activities1: string;
    activities2Select: boolean
    activities2Id: number;
    activities2: string;
    activities3Select: boolean
    activities3Id: number;
    activities3: string;
    activities4Select: boolean
    activities4Id: number;
    activities4: string;
    activities5Select: boolean
    activities5Id: number;
    activities5: string;
}
export class activityModel {
    activitiy: string;

}
export class userListModel {
    constructor(){
        this.user=''
    }
    user: string;
}
export class TimeApproveModel{
    status:string
    user:string
    workingHrs:number
    weekDate:string
    weekDateRange:string
}

