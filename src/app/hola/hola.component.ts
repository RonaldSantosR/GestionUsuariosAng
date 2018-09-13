import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TokenStorage } from '../core/token.storage';

@Component({
  selector: 'app-hola',
  templateUrl: './hola.component.html',
  styleUrls: ['./hola.component.css']
})
export class HolaComponent implements OnInit {

  constructor(private router:Router, private token:TokenStorage) { }

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
  logout(){
    this.token.signOut();
    this.router.navigate(['./login'])
  }

}
