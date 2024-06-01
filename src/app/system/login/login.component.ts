import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    //   let userLoginData = JSON.parse(sessionStorage.getItem("admin.example.com") || '');
    //   console.log(userLoginData)
    //   if (userLoginData != '') {
    //     alert("login success")
    //     //this.router.navigate(['/timeclock'])
    //   }
    //   else{
    //     alert("login not success")
    //   }
    // }
    //window.location.href = 'http://localhost:4200/'
  }
}
