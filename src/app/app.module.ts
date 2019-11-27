import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';

// Routing module for router service
import { AppRoutingModule } from './app-routing.module';

// Forms module
import { FormsModule } from '@angular/forms';

// Components
import { LoginComponent } from './login/login.component';
import { CarpetaComponent } from './carpeta/carpeta.component';
import { FicheroComponent } from './fichero/fichero.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarpetaComponent,
    FicheroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }