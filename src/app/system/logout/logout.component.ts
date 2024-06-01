import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { UserSharingService } from 'src/app/shared/_services/user-sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userSharingService: UserSharingService,
  ) { }

  ngOnInit(): void {
    const iframe = document.createElement('IFRAME');
    iframe.id = 'student-ifr';
    iframe.style.display = "none";
    (<HTMLIFrameElement>iframe).src = environment.studentURL;
    document.body.appendChild(iframe);
    this.postAdminData(environment.studentURL, 'student');
    this.authService.logout()
    window.location.href = 'http://localhost:4200/logout'
    //this.logout()

  }
  postAdminData(linkURL: any, portal: any) {

    this.userSharingService.postCrossDomainMessage(linkURL, portal);
  }
  logout() {
    // const iframe = document.createElement('IFRAME');
    // iframe.id = 'student-ifr';
    // iframe.style.display = "none";
    // (<HTMLIFrameElement>iframe).src = environment.studentURL;
    // document.body.appendChild(iframe);
    // this.postAdminData(environment.studentURL, 'student');
    //window.location.href = 'http://localhost:4200/'
    // this.authService.logout()
    //window.location.href = 'http://localhost:4200/login'
  }

}
