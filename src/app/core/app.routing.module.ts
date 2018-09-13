import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import { HolaComponent } from '../hola/hola.component';
import { LoginGuard } from './login.guard';
import { LogoutGuard } from './logout.guard';

const routes: Routes = [
  { path : '', component : LoginComponent},
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  { path: 'hola', component: HolaComponent, canActivate: [LoginGuard] }
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