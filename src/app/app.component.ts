import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorage} from 'src/app/core/token.storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private token: TokenStorage) {
  }

  logout(){
    this.token.signOut();
    this.router.navigate(['./login'])
  }

}
