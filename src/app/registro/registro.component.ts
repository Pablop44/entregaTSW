import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserRegistro } from 'src/app/models/UserRegistro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
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
  constructor(usersService:UsersService, private router : Router) {
     this.usersService = usersService }

  ngOnInit() {
  }

  onSubmit(){
    this.usersService.registro(this.formRegistro.username, this.formRegistro.password, this.formRegistro.nombre, this.formRegistro.apellidos, this.formRegistro.email, this.formRegistro.uso)
      .subscribe(
        response=>{
          this.loginNotification = "";
          this.router.navigateByUrl("/login/"+this.formRegistro.username);

        },
        error=>{
          console.log(error);
          this.loginNotification = error.error;
        }
      );
  }

}
