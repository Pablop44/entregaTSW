import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CarpetaComponent } from './carpeta/carpeta.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'carpeta', component: CarpetaComponent },
  { path: 'carpeta/:uid', component: CarpetaComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
