import { Component } from '@angular/core';

import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgForm}  from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthService} from '../core/auth.service';
import {TokenStorage} from '../core/token.storage';


 //const TOKEN_KEY = 'AuthTokenChris';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  forma:FormGroup;
  count: number = 0;
  buttonDisabled: boolean = false;

  constructor(private router: Router, 
              public dialog: MatDialog, 
              private authService: AuthService, 
              private token: TokenStorage) {
                

                this.forma = new FormGroup({
                  'usuario' : new FormControl('',     [Validators.required,Validators.minLength(4)]), 
                  'contraseña' : new FormControl('',  Validators.required)
                })

              }


  login(){
      this.authService.attemptAuth(this.forma.value.usuario, this.forma.value.contraseña).subscribe(
           data => {
              this.token.saveToken(data.token);
              console.log(this.forma.value);
              console.log("El usuario ingresó y se creó su token");
              this.router.navigate(['./hola'])
                  }
          );
  }

  contar(contando : number){
      if(contando%3===0 && contando!=0){
        return this.buttonDisabled=true;
      }else
        return this.buttonDisabled=false;
  }



  
}
