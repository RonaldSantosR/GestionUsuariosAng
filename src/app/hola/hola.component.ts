import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';

@Component({
  selector: 'app-hola',
  templateUrl: './hola.component.html',
  styleUrls: ['./hola.component.css']
})
export class HolaComponent implements OnInit {

  constructor(private router:Router, 
              private authService: AuthService, 
              private token:TokenStorage
              ) { }


  ngOnInit() {
  }


  usser: string;
  pass: string;

  logout(){
    this.usser = this.token.getToken();
    console.log(this.usser);

    this.authService.FinAuth;
 
    this.token.signOut();

    this.router.navigate(['./login'])

  }

  

}
