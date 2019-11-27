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
  
  constructor(
    private servicioCarpeta: ApiService
    ) {
     }

  ngOnInit() {
    this.carpetaRaiz();
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

  cambiarRuta(a){
    this.carpeta(a);
  }

}
