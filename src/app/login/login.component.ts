import { Component } from '@angular/core';
import { NgForm}  from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthService} from '../core/auth.service';
import {TokenStorage} from '../core/token.storage';


// const TOKEN_KEY = 'AuthTokenChris';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, 
              public dialog: MatDialog, 
              private authService: AuthService, 
              private token: TokenStorage) {
  }

  login(forma:NgForm): void {

    console.log("1º Formulario posteado");
    console.log("2º ngForm", forma);
    console.log("3º valor", forma.value);
    console.log("4º valor", forma.value.nombre);


    this.authService.attemptAuth(forma.value.nombre, forma.value.password).subscribe(
      data => {
        this.token.saveToken(data.token);
      console.log(forma.value.nombre + " || " + forma.value.password);
        this.router.navigate(['./hola'])
    }
  );
}


}
