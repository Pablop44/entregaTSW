import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }
  public carpetaRaiz(){
    return this.httpClient.get(`http://localhost/mvcblog/rest/carpeta/admin`);
  }

  public carpeta(a){
    return this.httpClient.get(`http://localhost/mvcblog/rest/carpeta/admin/`+a);
  }
  public ficheroRaiz(){
    return this.httpClient.get(`http://localhost/mvcblog/rest/carpeta/admin/fichero`);
  }
  public fichero(a){
    return this.httpClient.get(`http://localhost/mvcblog/rest/carpeta/admin/fichero/`+a);
  }
}
