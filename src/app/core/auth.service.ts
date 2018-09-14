import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from './token.storage';

@Injectable()
export class AuthService {

  baseUrl: 'http://localhost:9082/';

  headers: HttpHeaders;

  constructor(private http: HttpClient, private token:TokenStorage) {

    // this.headers.append("Content-Type", "application/json");
    // this.headers.append("Authorization", "Bearer " + this.token.getToken());
    // this.headers.append("Authorization", "Bearer " + token.getToken());

  }

  attemptAuth(ussername: string, password: string): Observable<any> {
    this.headers = new HttpHeaders({
      "Authorization": "Basic " + btoa(ussername + ':' + password)  
    })
    console.log(btoa(ussername + ':' + password ));
    const credentials = {username: ussername, password: password};
    console.log('attempAuth ::');
    console.log(ussername, password + " A");
    return this.http.post<any>('http://localhost:9082/login/generate-token', credentials, {headers: this.headers});
  }

  // FinAuth(ussername: string, password: string): Observable<any> {
  //   const creden = {usser: ussername, password:password};
  //   console.log('FinAuth :: ' + ussername + ' ' + password);
  //   return this.http.post<any>('http://localhost:9082/login/cerrarsession', creden);
  // }

}