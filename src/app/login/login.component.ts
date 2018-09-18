import { Component } from '@angular/core';

import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgForm}  from '@angular/forms';
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

  forma:FormGroup;

  constructor(private router: Router, 
              public dialog: MatDialog, 
              private authService: AuthService, 
              private token: TokenStorage) {



                
                this.forma = new FormGroup({
                  'usuario' : new FormControl('',     Validators.required),
                  'contraseña' : new FormControl('',  Validators.required)
                })





  }

  login(){

    console.log(this.forma.value);


    this.router.navigate(['./hola'])
}

//   login(forma:NgForm): void {

//     console.log("1º Formulario posteado");
//     console.log("2º FORMA: ", forma);
//     console.log("3º VALOR: ", forma.value);
//     console.log("4º USUARIO: ", forma.value.usuario);


//     this.authService.attemptAuth(forma.value.usuario, forma.value.contraseña).subscribe(
//       data => {
//         this.token.saveToken(data.token);
//       console.log(forma.value.usuario + " || " + forma.value.contraseña);
//         this.router.navigate(['./hola'])
//     }
//   );
// }


}
