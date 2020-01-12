import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  userService: UsersService;

  constructor(userService : UsersService, private servicioCarpeta: ApiService,) { 
      this.userService = userService;
  }
  ngOnInit() {
  }

  logout(){
    this.userService.logout();
  }
  
}
