import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';

import swal from 'sweetalert2'




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  forma: FormGroup;
  error = "";
  count = 0;
  segundos = 5;

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

    console.log(this.count);

    if (this.forma.get("usuario").value === null || this.forma.get("usuario").value.length === 0 ||
      this.forma.get("contraseña").value === null || this.forma.get("contraseña").value.length === 0) {
      console.log("Ingrese todos los datos");
      swal({
        title: 'ERROR',
        position: 'top',
        text: 'Por favor, ingrese todos los datos',
        type: 'error',
        allowOutsideClick: false
      })
      this.count++;

    } else {

      this.authService.attemptAuth(this.forma.value.usuario, this.forma.value.contraseña).subscribe(
        data => {
          if (data) {
            console.log(this.forma);
            this.token.saveToken(data.token);
            //window.location.href = data.link;
            this.router.navigate(['./hola'])
          }
        },
        error => {
          switch (error.status) {
            case 403:
              swal({
                title: 'ERROR',
                position: 'top',
                text: 'El Usuario se encuentra inactivo',
                type: 'warning',
                allowOutsideClick: false
              })
              this.count++;
              break;
            case 401:
              swal({
                title: 'ERROR',
                position: 'top',
                text: 'El Usuario y/o Password son incorrectos',
                type: 'error',
                allowOutsideClick: false
              })
              this.count++;
              break;
            default:
              swal({
                title: 'ERROR',
                position: 'top',
                text: 'ERROR INTERNO DE SERVIDOR',
                type: 'error',
                allowOutsideClick: false
              })
              break;
          }
        this.bloquear()
        }
      );
    }
    this.bloquear();
  }

  bloquear(){
    if (this.count === 3) {
      swal({
        title: 'ADVERTENCIA',
        position: 'top',
        text: 'Ha intentado ingresar mas veces de lo permitido, espere un momento',
        type: 'info',
        allowOutsideClick: false,//no cerrar
        timer: 5000,
        showConfirmButton: false //quitar botón
      })
      this.mostrarSegundos();
      setTimeout(() => {
        this.count = 0;
      }, 5000);
      this.segundos = 5;
      return;
    }

  }

  mostrarSegundos() {
    setTimeout(() => {
      this.segundos--;
      if (this.segundos > 0) {
        this.mostrarSegundos();
      }
    }, 1000)
  }




}
