import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import { HolaComponent } from '../hola/hola.component';

const routes: Routes = [
  { path : '', component : LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'hola', component: HolaComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }