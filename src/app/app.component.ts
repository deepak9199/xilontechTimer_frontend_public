import { Component, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './shared/_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'XilontechTimer';
  constructor(
    private tokenstorage:TokenStorageService
  ) { }
  @HostListener('window:message', ['$event'])
  
  onMessage(e: any) {
    //console.log(e.origin)
    if (e.origin == environment.studentURL) {
      //console.log("afasfaasffafafaa");
      //console.log(e.data);
      this.tokenstorage.saveUser(e.data)
    } else {
      //console.log("no message");
      return false;
    }
  }
}
