import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from './token.storage';

@Injectable()
export class AuthService {

  baseUrl: 'http://localhost:9082/';

  headers = new HttpHeaders();

  constructor(private http: HttpClient, private token:TokenStorage) {

    this.headers.append("Content-Type", "application/json");
    this.headers.append("Authorization", "Bearer " + this.token.getToken());
    // this.headers.append("Authorization", "Bearer " + localStorage.getItem())

  }

  attemptAuth(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password};
    console.log('attempAuth ::');
    // console.log(ussername, password);
    return this.http.post<any>('http://localhost:9082/login/generate-token', credentials, {headers: this.headers});
  }

  FinAuth(ussername: string){
    const creden = {username: ussername};
    console.log('FinAuth ::');
    return this.http.post<any>('http://localhost:9082/login/cerrarsession', creden);
  }

}