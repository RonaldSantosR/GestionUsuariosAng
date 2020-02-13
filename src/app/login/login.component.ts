import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService } from '../core/auth.service';


import swal from 'sweetalert2'
import { Dominio } from '../model/dominio.model';
import { Subscription } from 'rxjs';
import { DominioService } from '../shared/dominio.service';
import { TipoAccesoEnum } from '../enum/tipoacceso.enum';

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
  dominio: Dominio;

  dominioSubscription: Subscription;

  ngOnInit() {
    this.cargarDatosVista();
    this.loginForm = new FormGroup({
      'acceso': new FormControl('1', Validators.required),
      'dominio': new FormControl(null),
      'usuario': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'contraseña': new FormControl('', Validators.required)
    }, this.validarDominio.bind(this))
     
  }



  cargarDatosVista() {
    this.dominios = this.dominioService.getDominios();

    this.dominioSubscription = this.dominioService.dominiosChanged.subscribe(
      dominios => {
        this.dominios = dominios
      }
    )

  }



  login(loginForm: FormGroup) {
    
    let usuariologin = this.loginForm.get("usuario").value
    let usuariostring = usuariologin.toString();
    let usuario = usuariostring.toUpperCase();

    let contraseñalogin = this.loginForm.get("contraseña").value
    let contraseñastring = contraseñalogin.toString();
    let contraseña = contraseñastring.toUpperCase();
  
    if (this.loginForm.get("acceso").value == 1) {

      if (usuario === null || usuario.length === 0 || contraseña === null || contraseña.length === 0) {
        swal({
          title: 'ERROR',
          position: 'top',
          text: 'Por favor, ingrese todos los datos',
          type: 'error',
          allowOutsideClick: false          
        })
        this.count++;
        this.loginForm.setValue
        this.loginForm.controls['usuario'].reset();
        this.loginForm.controls['contraseña'].reset();
      } else {
        this.authService.attemptAuth(this.loginForm.get("usuario").value, this.loginForm.value.contraseña, TipoAccesoEnum.REGULAR).subscribe(
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
                this.loginForm.controls['usuario'].reset();
                this.loginForm.controls['contraseña'].reset();
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
                this.loginForm.controls['usuario'].reset();
                this.loginForm.controls['contraseña'].reset();
                break;
              default:
                swal({
                  title: 'ERROR',
                  position: 'top',
                  text: 'ERROR INTERNO DE SERVIDOR',
                  type: 'error',
                  allowOutsideClick: false
                })
                this.loginForm.controls['usuario'].reset();
                this.loginForm.controls['contraseña'].reset();
                break;
            }
            this.validarBloque();
            return;
          }
        );
      }

    } else {

      let dominio = loginForm.get("dominio").value;
      this.dominio = dominio
      if (dominio === null || dominio.length === 0 ||  usuario === null || usuario.length === 0 || 
          contraseña === null || contraseña.length === 0) {
        swal({
          title: 'ERROR',
          position: 'top',
          text: 'Por favor, ingrese todos los datos',
          type: 'error',
          allowOutsideClick: false
        })
        this.loginForm.controls['usuario'].reset();
        this.loginForm.controls['contraseña'].reset();
        this.count++;
      } else {
        this.authService.attemptAuthActiveDirectory(this.loginForm.value.usuario, this.loginForm.value.contraseña, TipoAccesoEnum.ACTIVE_DIRECTORY, this.dominio).subscribe(
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
                this.loginForm.controls['usuario'].reset();
                this.loginForm.controls['contraseña'].reset();
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
                this.loginForm.controls['usuario'].reset();
                this.loginForm.controls['contraseña'].reset();
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
                this.loginForm.controls['usuario'].reset();
                this.loginForm.controls['contraseña'].reset();
                break;
            }
            this.validarBloque();
            return;
          }
        );
      }

    }

    this.validarBloque();

  }



  validarBloque() {
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



  validarDominio(form: FormGroup): { [key: string]: boolean } | null {
    if (form.value.acceso === '2' && form.value.dominio === null) {
      return { 'ingreseDominio': true }
    }
    return null;
  }



}
