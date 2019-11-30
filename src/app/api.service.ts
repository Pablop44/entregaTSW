import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from './users.service';
import { Carpeta } from 'src/app/models/Carpeta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  carpetaActual: string  = 'NULL';
  private restUrl = 'http://localhost/mvcblog/rest';  
  constructor(private httpClient: HttpClient, private userService : UsersService) { }

  public carpetaRaiz(){
    this.carpetaActual = 'NULL';
    return this.httpClient.get(this.restUrl+`/carpeta/`+this.userService.loggedUser.username);
  }

  public carpeta(a){
    this.carpetaActual = a;
    console.log(this.restUrl+`/carpeta/`+this.userService.loggedUser.username+a);
    return this.httpClient.get(this.restUrl+`/carpeta/`+this.userService.loggedUser.username+`/`+a);
  }
  public ficheroRaiz(){
    return this.httpClient.get(this.restUrl+`/carpeta/`+this.userService.loggedUser.username+`/fichero`);
  }
  public fichero(a){
    return this.httpClient.get(this.restUrl+`/carpeta/`+this.userService.loggedUser.username+`/fichero/`+a);
  }

  addCarpeta(carpeta:Carpeta){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.userService.loggedUser.username+':'+this.userService.loggedUser.password) })
    };
    const CarpetaToSend : Carpeta = {
      uid: null,
      nombre: carpeta.nombre,
      padre: this.carpetaActual,
      fecha: null,
      autor: this.userService.loggedUser.username,
    }

    console.log(CarpetaToSend);

    return this.httpClient.post(this.restUrl+"/carpeta", CarpetaToSend, httpOptions);

  }

  deleteCarpeta(CarpetaUid){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': 'Basic ' + btoa(this.userService.loggedUser.username+':'+this.userService.loggedUser.password) })
    };

    return this.httpClient.delete(this.restUrl+"/carpeta/"+CarpetaUid, httpOptions);
  }

}
