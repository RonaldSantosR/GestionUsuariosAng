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

  constructor(private router:Router, private authService: AuthService, private token:TokenStorage) { }

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
  // username: string;
  // pasword: string;

  // logout(){
  //   this.authService.FinAuth(this.username, this.pasword).subscribe(
  //     data => {
  //     this.token.signOut();
  //     console.log("TODO VA BIEN");
  //     this.router.navigate(['./login'])
  //     }
  //   )
  // }



}
