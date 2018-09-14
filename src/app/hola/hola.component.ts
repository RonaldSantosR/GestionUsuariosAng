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
/*
  login(): void {
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        this.token.saveToken(data.token);
        console.log(this.username + " || " + this.password);
      this.router.navigate(['./hola'])
      }
    );
  }
*/
  

  usser: string;
  pass: string;

  logout(){
    this.usser = this.token.getToken();
    console.log(this.usser);

      this.token.signOut();

    this.router.navigate(['./login'])





    // console.log(this.usser + " || " + this.pass);
    // this.authService.FinAuth(this.usser, this.pass).subscribe(
    //   data => {
    //   this.token.signOut();
    //   console.log("TODO VA BIEN");
    //   console.log(this.usser + " || " + this.pass);
    //   this.router.navigate(['./login'])
    //   }
    // )



  }


}
