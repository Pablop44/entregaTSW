import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cadenas: any = [];
  idiomaActual: any = [];
  formUser:User ={
    username:null,
    password:null
  };

  loginNotification:string ="";

  usersService:UsersService;
  
  constructor(usersService:UsersService, private router : Router, private servicioCarpeta: ApiService) { 
    this.usersService = usersService;
  }

  ngOnInit() {
    this.cambiarIdioma('es');
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
          this.loginNotification = "Las credenciales no pueden ser vacías o son incorrectas";
        }
      );
  }

  cambiarIdioma(valor){
    this.idiomaActual = valor;
    console.log(valor);
    this.servicioCarpeta.cambiarIdioma(valor).
        subscribe(
          response =>{console.log(response), this.cadenas = response;},
          error => {console.log(error)}
        );
  }
}
