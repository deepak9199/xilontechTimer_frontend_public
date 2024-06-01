import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  role=''
  constructor(
    private tokenStorage:TokenStorageService
  ) { }

  ngOnInit(): void {
    this.role=this.tokenStorage.getUser().roles[0];
  }

}
