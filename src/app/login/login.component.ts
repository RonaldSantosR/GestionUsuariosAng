import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';


//const TOKEN_KEY = 'AuthTokenChris';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  forma: FormGroup;
  error = "";
  count = 0;
  segundos = 3;
  // buttonDisabled: boolean = false;



  constructor(private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private token: TokenStorage) {


    this.forma = new FormGroup({
      'usuario': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'contraseña': new FormControl('', Validators.required)
    })
    console.log(this.forma);
  }


  login() {
    this.authService.attemptAuth(this.forma.value.usuario, this.forma.value.contraseña).subscribe(
      data => {
        if (data) {
          console.log(this.forma);
          this.token.saveToken(data.token);
          this.router.navigate(['./hola'])
        }
        else {
          this.error = "Usuario o Password incorrecto";
        }
      },
      error => {
        this.error = "Usuario o Password incorrecto 2";
      }
    );

    this.count ++;
    if (this.count === 3) {
      this.mostrarSegundos();
      setTimeout(() => {
        this.count=0;
      } , 3000);
    }
    
  }

  mostrarSegundos(){
    setTimeout(() =>{
      this.segundos--;
      if (this.segundos > 0) {
        this.mostrarSegundos();
      }      
    }, 1000)
  }

 

      // setTimeout(this.desactivarboton, 3000);



}
