import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../_services/auth.service";
import { TokenStorageService } from "../_services/token-storage.service";



/*@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private router: Router, private tokenStorage: TokenStorageService) { }

    
   
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       // logged in so return true
        //console.warn('cecek auth guard:'+this.tokenStorage.getUser().roles)
        if (this.tokenStorage.getToken()) {
            
            return true
        }
        


        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'],{ queryParams: { returnUrl: state.url}});
        return false;
    }

    
}
*/
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private token: TokenStorageService,
    private authService: AuthService
  ) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.token.getToken() != null) {
      const roles = next.data['role'] as Array<string>;
      if (roles) {
        const match = this.token.getUser().roles
        if (match == roles) {
          return true;
        } else {
          // tslint:disable-next-line: quotemark
          alert("unauthorise routing session logout");
          this.router.navigate(['/logout']);
          this.logout()
          //this.router.navigate(['/login']);
          // this.router.navigate(['/forbidden']);
          return false;
        }
      } else {
        return true;
      }
    }
    this.router.navigate(['']);
    return false;
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    })
  }
}

