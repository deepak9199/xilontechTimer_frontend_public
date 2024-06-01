import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserSharingService } from '../_services/user-sharing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  roles = ''
  username=''
  binaryImage: any;
  constructor(
    private authService:AuthService,
    private tokenStroage:TokenStorageService,
    
  ) { }

  ngOnInit(): void {
    this.username=this.tokenStroage.getUser().username
  }
  
  public reload()
  {
    window.location.reload();
  }
  public profile(){
    // if(this.roles=='ROLE_ADMIN')
    // {
    //   this.router.navigate(['portal/admin/profile'])
    // }
    // else if(this.roles=='ROLE_USER')
    // {
    //   this.router.navigate(['portal/user/profile'])
    // }
  }
  public home(){
    // if(this.roles=='ROLE_ADMIN')
    // {
    //   this.router.navigate(['portal/admin'])
    // }
    // else if(this.roles=='ROLE_USER')
    // {
    //   this.router.navigate(['portal/user'])
    // }
    
    window.location.href = 'http://localhost:4200/'
    this.authService.logout()
  }
  

}
