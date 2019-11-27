import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-carpeta',
  templateUrl: './carpeta.component.html',
  styleUrls: ['./carpeta.component.css']
})
export class CarpetaComponent implements OnInit {
  
  carpetas: any = [];
  ficheros: any = [];

  constructor(
    private servicioCarpeta: ApiService
    ) {
     }

  ngOnInit() {
    this.carpetaRaiz();
    this.ficherosRaiz();
  }

  carpetaRaiz(){
    this.servicioCarpeta.carpetaRaiz()
      .subscribe(
        response =>{
          console.log(response);
          this.carpetas = response;
        },
        error => {console.log(error);}
      );
  }

  ficherosRaiz(){
    this.servicioCarpeta.ficheroRaiz()
    .subscribe(
      response =>{
        console.log(response);
        this.ficheros = response;
      },
      error => {console.log(error);}
    );
  }

  carpeta(a){
    this.servicioCarpeta.carpeta(a)
      .subscribe(
        response =>{
          console.log(response);
          this.carpetas = response;
          
        },
        error => {console.log(error);}
      );
   
  }

  fichero(a){
    this.servicioCarpeta.fichero(a)
    .subscribe(
      response =>{
        console.log(response);
        this.ficheros = response;
      },
      error => {console.log(error);}
    );
  }

  cambiarRuta(a){
    this.carpeta(a);
    this.fichero(a);
  }

}
