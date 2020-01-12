import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserRegistro } from 'src/app/models/UserRegistro';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  idiomaActual: any = [];
  cadenas: any = [];
  formRegistro:UserRegistro ={
    username:null,
    password:null,
    nombre:null,
    apellidos:null,
    email:null,
    uso:null
  };
  loginNotification:string ="";
  usersService:UsersService;
  constructor(usersService:UsersService, private router : Router, private servicioCarpeta: ApiService) {
     this.usersService = usersService }

  ngOnInit() {
    this.cambiarIdioma('es');
  }

  onSubmit(){
    this.usersService.registro(this.formRegistro.username, this.formRegistro.password, this.formRegistro.nombre, this.formRegistro.apellidos, this.formRegistro.email, this.formRegistro.uso)
      .subscribe(
        response=>{
          this.loginNotification = "";
          this.router.navigateByUrl("/login");

        },
        error=>{
          console.log(error);
          this.loginNotification = error.error;
        }
      );
  }
  cambiarIdioma(valor){
    console.log(valor);
    this.idiomaActual = valor;
    this.servicioCarpeta.cambiarIdioma(valor).
        subscribe(
          response =>{console.log(response),this.cadenas = response;},
          error => {console.log(error)}
        );
  }
  

}
