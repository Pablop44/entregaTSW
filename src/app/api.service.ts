import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { UsersService } from './users.service';
import { Carpeta } from 'src/app/models/Carpeta';
import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';
import { Form, FormGroup } from '@angular/forms';

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

  deleteCarpeta(){
    if(this.carpetaActual == "NULL"){
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Authorization': 'Basic ' + btoa(this.userService.loggedUser.username+':'+this.userService.loggedUser.password) })
      };
      return this.httpClient.delete(this.restUrl+"/carpeta/"+this.userService.loggedUser.username, httpOptions);
    }else{
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Authorization': 'Basic ' + btoa(this.userService.loggedUser.username+':'+this.userService.loggedUser.password) })
      };
      return this.httpClient.delete(this.restUrl+"/carpeta/subfile/"+this.carpetaActual, httpOptions);
    }
    
  }

  upload(formData: FormData) {

    formData.append('padre', this.carpetaActual);
    formData.append('autor', this.userService.loggedUser.username);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
      headers: new HttpHeaders({'Authorization': 'Basic ' + btoa(this.userService.loggedUser.username+':'+this.userService.loggedUser.password) })
    };

    

    return this.httpClient.post<any>(this.restUrl+"/fichero" ,formData, options);
  }

  deleteFichero(a) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': 'Basic ' + btoa(this.userService.loggedUser.username+':'+this.userService.loggedUser.password) })
    };
    return this.httpClient.delete(this.restUrl+"/fichero/"+a, httpOptions);
  }

  descargarFichero(a) {
    return this.httpClient.get(this.restUrl+"/fichero/"+a);
  }

}
