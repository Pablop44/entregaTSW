import { Injectable } from '@angular/core';
import { User } from './models/User';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';
import {Router} from "@angular/router"
import { UserRegistro } from './models/UserRegistro';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  loggedUser:User = new User();
  isLogged:boolean = false;

  private restUrl = 'http://localhost/mvcblog/rest';  

  constructor(private http: HttpClient, private router: Router) { 
    this.loginWithStorageUser();

  }

  login(username, password){

    return this.http.get(this.restUrl+"/user/"+username, {
      responseType:'text',
      headers: new HttpHeaders({
        
        'Authorization': 'Basic ' + btoa(username+':'+password)
      })
    });
    
  }

  setLoggedUser(username, password){
    console.log(username);
    console.log(password);
    this.isLogged = true;
    this.loggedUser.username = username;
    this.loggedUser.password = password;
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  }

  loginWithStorageUser():boolean{
    if(localStorage.getItem("username")!= null){
      this.isLogged = true;
      this.loggedUser.username = localStorage.getItem("username");
      this.loggedUser.password = localStorage.getItem("password");
      return true;
    }

    return false;

  }

  logout(){
    this.isLogged = false;
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    this.router.navigate(['/login'])
  }

  registro(username, password, nombre, appellidos, email, uso){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      })
    };
    const userToSend : UserRegistro = {
      username: username,
      password: password,
      nombre: nombre,
      apellidos: appellidos,
      email: email,
      uso: uso
    }

    console.log(userToSend);

    return this.http.post(this.restUrl+"/user", userToSend, httpOptions);

  }
  
}
