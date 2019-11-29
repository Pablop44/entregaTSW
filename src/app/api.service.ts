import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  public login(login, password){
    var data: String;
    data =  JSON.stringify({
      login,
      password
     })
    console.log(data);
    return this.httpClient.post(`http://localhost/mvcblog/rest/user/entrance`, 
      [data]
    );
  }
}
