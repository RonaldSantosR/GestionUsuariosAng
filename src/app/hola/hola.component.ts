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


  

  logout(){
    console.log("botón logout apretado");
    this.authService.FinAuth().subscribe(
      data => {
        this.token.signOut();
        console.log("pasó subscribe");
        this.router.navigate(['./login'])
             }
     );

  }

  

}
