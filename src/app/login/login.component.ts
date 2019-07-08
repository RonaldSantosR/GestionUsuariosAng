import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService } from '../core/auth.service';


import swal from 'sweetalert2'
import { Dominio } from '../model/dominio.model';
import { Subscription } from 'rxjs';
import { DominioService } from '../shared/dominio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private dominioService: DominioService
  ) { }

  loginForm: FormGroup;
  error = "";
  count = 0;
  segundos = 5;

  dominios: Dominio[] = [];

  dominioSubscription: Subscription;

  ngOnInit() {
    this.cargarDatosVista();
    this.loginForm = new FormGroup({
      'acceso': new FormControl('1', Validators.required),
      'dominio': new FormControl(null, Validators.required),
      'usuario': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'contraseña': new FormControl('', Validators.required)
    })
  }

  cargarDatosVista() {
    this.dominios = this.dominioService.getDominios();

    this.dominioSubscription = this.dominioService.dominiosChanged.subscribe(
      dominios => {
        this.dominios = dominios
      }
    )

  }


  login() {
    if (this.loginForm.get("acceso").value === 1) {

      if (this.loginForm.get("usuario").value === null || this.loginForm.get("usuario").value.length === 0 || this.loginForm.get("contraseña").value === null || this.loginForm.get("contraseña").value.length === 0) {
        swal({
          title: 'ERROR',
          position: 'top',
          text: 'Por favor, ingrese todos los datos',
          type: 'error',
          allowOutsideClick: false
        })
        this.count++;
      } else {
        this.authService.attemptAuth(this.loginForm.value.usuario, this.loginForm.value.contraseña).subscribe(
          data => {
            if (data) {
              window.location.href = data.ruta;
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
            this.validarBloquo();
            return;
          }
        );
      }

    } else {

      if (this.loginForm.get("dominio").value === null || this.loginForm.get("dominio").value.length === 0 || 
          this.loginForm.get("usuario").value === null || this.loginForm.get("usuario").value.length === 0 || 
          this.loginForm.get("contraseña").value === null || this.loginForm.get("contraseña").value.length === 0) {
        swal({
          title: 'ERROR',
          position: 'top',
          text: 'Por favor, ingrese todos los datos',
          type: 'error',
          allowOutsideClick: false
        })
        this.count++;
      } else {
        this.authService.attemptAuth(this.loginForm.value.usuario, this.loginForm.value.contraseña).subscribe(
          data => {
            if (data) {
              window.location.href = data.ruta;
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
            this.validarBloquo();
            return;
          }
        );
      }

    }



    this.validarBloquo();


  }

  validarBloquo() {
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
