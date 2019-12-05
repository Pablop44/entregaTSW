import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Carpeta } from '../models/Carpeta';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-carpeta',
  templateUrl: './carpeta.component.html',
  styleUrls: ['./carpeta.component.css']
})
export class CarpetaComponent implements OnInit {
  
  carpetas: any = [];
  ficheros: any = [];
  formCarpeta = new Carpeta();
  formGroup: FormGroup;
  usersService:UsersService;
  carpetaActual: String = "Raíz";

  constructor(
    usersService:UsersService,
    private servicioCarpeta: ApiService,
    private router : Router,
    private fb: FormBuilder,
    
    ) {
      this.usersService = usersService;
     }

  ngOnInit() {
    this.formGroup = this.fb.group({
      nombreFichero: [''],
      labelfile:[''],
      file:[null]
    })
    if(!this.usersService.isLogged){
      this.router.navigateByUrl("/login");
    }else{
      this.carpetaRaiz();
      this.ficherosRaiz();
    }
  }

  carpetaRaiz(){
    if(!this.usersService.isLogged){
      this.router.navigateByUrl("/login");
    }else{
    this.servicioCarpeta.carpetaRaiz()
      .subscribe(
        response =>{
          console.log(response);
          this.carpetaActual = "Raíz";
          this.carpetas = response;
        },
        error => {console.log(error);}
      );
    }
  }

  ficherosRaiz(){
    if(!this.usersService.isLogged){
      this.router.navigateByUrl("/login");
    }else{
      this.servicioCarpeta.ficheroRaiz()
      .subscribe(
        response =>{
          console.log(response);
          this.ficheros = response;
        },
        error => {console.log(error);}
      );
    }
  }

  carpeta(a){
    if(!this.usersService.isLogged){
      this.router.navigateByUrl("/login");
    }else{
      this.servicioCarpeta.carpeta(a)
        .subscribe(
          response =>{
            console.log(response);
            this.carpetas = response;
            
          },
          error => {console.log(error);}
        );
    }
  }

  fichero(a){
    if(!this.usersService.isLogged){
      this.router.navigateByUrl("/login");
    }else{
      this.servicioCarpeta.fichero(a)
      .subscribe(
        response =>{
          console.log(response);
          this.ficheros = response;
        },
        error => {console.log(error);}
      );
    }
  }

  cambiarRuta(a,b){
    this.carpetaActual = b;
    this.carpeta(a);
    this.fichero(a);
  }

  onSubmit(){
      this.servicioCarpeta.addCarpeta(this.formCarpeta)
        .subscribe(
          response =>{console.log(response); 
            this.carpetaRaiz();
            this.ficherosRaiz();},
          error => {console.log(error)}
        );
  }

  deleteCarpeta(){
      this.servicioCarpeta.deleteCarpeta()
        .subscribe(
          response =>{console.log(response); this.carpetaRaiz(); this.ficherosRaiz();},
          error => {console.log(error)}
        );
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      document.getElementById('labelfile').innerHTML = file.name;
      this.formGroup.get('file').setValue(file);
    }
  }

  enviarFile(){
      const formData = new FormData();
      formData.append("nombreFichero", this.formGroup.get('nombreFichero').value);
      formData.append("file", this.formGroup.get('file').value);
      
      this.servicioCarpeta.upload(formData).
        subscribe(
          response =>{console.log(response); this.carpetaRaiz(); this.ficherosRaiz();},
          error => {console.log(error); this.carpetaRaiz(); this.ficherosRaiz();}
        );
  }


  eliminarFichero(a){
    if(!this.usersService.isLogged){
      this.router.navigateByUrl("/login");
    }else{
      this.servicioCarpeta.deleteFichero(a).
        subscribe(
          response =>{console.log(response); this.carpetaRaiz(); this.ficherosRaiz();},
          error => {console.log(error)}
        );
    }
  }

  descargarFichero(a){
    window.open("http://localhost/mvcblog/rest/fichero/"+a);
    /*
      this.servicioCarpeta.descargarFichero(a).
      subscribe(
        response =>{console.log(response); this.carpetaRaiz(); this.ficherosRaiz();},
        error => {console.log(error)}
      );
    */
  }

}
