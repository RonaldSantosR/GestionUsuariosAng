import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CustomMaterialModule} from './core/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './core/app.routing.module';
import { LoginComponent } from './login/login.component';
import {ErrorDialogComponent} from './core/error-dialog.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./core/auth.service";
import {Interceptor} from "./core/interceptor";
import {TokenStorage} from "./core/token.storage";
import { HolaComponent } from './hola/hola.component';
import { LoginGuard } from './core/login.guard';
import { LogoutGuard } from './core/logout.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorDialogComponent,
    HolaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule
  ],
  entryComponents: [ErrorDialogComponent],
  providers: [ErrorDialogComponent, AuthService, TokenStorage, LoginGuard, LogoutGuard,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
