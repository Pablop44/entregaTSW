import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Carpeta } from '../models/Carpeta';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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

  constructor(
    private servicioCarpeta: ApiService,
    private router : Router,
    private fb: FormBuilder
    ) {
      
     }

  ngOnInit() {
    this.formGroup = this.fb.group({
      nombreFichero: [''],
      labelfile:[''],
      file:['']
    })
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

  onSubmit(){
    this.servicioCarpeta.addCarpeta(this.formCarpeta)
      .subscribe(
        response =>{console.log(response); this.carpetaRaiz(); this.ficherosRaiz();},
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
    }
  }

  enviarFile(){
    const formData = new FormData();
    formData.append("nombreFichero", this.formGroup.get('nombreFichero').value);
    formData.append("file", this.formGroup.get('file').value);
    
    this.servicioCarpeta.upload(formData).
      subscribe(
        response =>{console.log(response); this.carpetaRaiz(); this.ficherosRaiz();},
        error => {console.log(error)}
      );
  }

}
