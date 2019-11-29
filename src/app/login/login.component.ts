import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formUser:User ={
    username:null,
    password:null
  };

  loginNotification:string ="";

  usersService:UsersService;
  
  constructor(usersService:UsersService, private router : Router) { 
    this.usersService = usersService;
  }

  ngOnInit() {
    
  }

  onSubmit(){
    this.usersService.login(this.formUser.username, this.formUser.password)
      .subscribe(
        response=>{
          this.loginNotification = "";
          this.usersService.setLoggedUser(this.formUser.username, this.formUser.password);
          this.router.navigateByUrl("/carpeta/"+this.formUser.username);

        },
        error=>{
          console.log(error);
          this.loginNotification = error.error;
        }
      );
  }
}
