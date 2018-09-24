import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';

import swal from 'sweetalert2'


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
    this.count++;

    if (this.count === 3) {
      swal('ADVERTENCIA',`Ha intentado ingresar mas veces de lo permitido, espere un momento` , 'warning')
      this.mostrarSegundos();
      setTimeout(() => {
        this.count = 0;
      }, 3000);
      return;
    }




    if (this.forma.get("usuario").value === null || this.forma.get("usuario").value.length === 0 ||
      this.forma.get("contraseña").value === null || this.forma.get("contraseña").value.length === 0) {
      console.log("Ingrese todos los datos");
      swal('ERROR',`Por favor, ingrese todos los datos`, 'error')
      return;
    }



    this.authService.attemptAuth(this.forma.value.usuario, this.forma.value.contraseña).subscribe(
      data => {
        if (data) {
          console.log(this.forma);
          this.token.saveToken(data.token);
          window.location.href = data.link;
          return;
        }
        // else {
        //   this.error = "Usuario o Password incorrecto aaaaaaaaaaaa";
        // }
      },
      error => {
        switch (error.status) {
          case 403:
            console.log("El usuario se encuentra inactivo");
            swal('ERROR',`El Usuario se encuentra inactivo`, 'info')
            break;
          case 401:
            swal('ERROR',`El Usuario o Contraseña son incorrectos`, 'error')
            console.log("Error 401: Usuario o password incorrecto");
            break;
          default:
            break;
        }
      }
    );





    
  }

  mostrarSegundos() {
    setTimeout(() => {
      this.segundos--;
      if (this.segundos > 0) {
        this.mostrarSegundos();
      }
    }, 1000)
  }



  // setTimeout(this.desactivarboton, 3000);



}
