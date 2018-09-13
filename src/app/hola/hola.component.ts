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
  username: string;

  logout(){
    this.authService.FinAuth(this.username).subscribe(
      data => {
      this.token.signOut();
      this.router.navigate(['./login'])
      }
    )
  }


  
}
