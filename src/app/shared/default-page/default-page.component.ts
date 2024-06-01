import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';
import { EncrDecrServiceService } from '../_services/encr-decr-service.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css']
})
export class DefaultPageComponent implements OnInit {


  app_roles = '';
  isLoggedIn = false;
  showAdminBoard = true;
  showModeratorBoard = false;
  username: string;
  isLoginFailed = false;
  errorMessage = '';
  user: string
  pass: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private EncrDecr: EncrDecrServiceService
  ) {

  }

  ngOnInit(): void {
    let userLoginData = this.tokenStorage.getUser().accessToken || ''
    //console.log(userLoginData)
    if (userLoginData != '') {
      // console.log(userLoginData)
      this.tokenStorage.saveToken(userLoginData)
      this.isLoggedIn = true
      //this.router.navigate(['/timeclock'])
    }
    else {
      this.isLoggedIn = false
      this.router.navigate(['login'])
    }
  }

  // logout(): void {
  //   this.tokenStorageService.signOut();
  //   window.location.reload();
  // }

  // onActivate(event) {
  //   let scrollToTop = window.setInterval(() => {
  //     let pos = window.pageYOffset;
  //     if (pos > 0) {
  //       window.scrollTo(0, pos - 20); // how far to scroll on each step
  //     } else {
  //       window.clearInterval(scrollToTop);
  //     }
  //   }, 16);
  // }


}
