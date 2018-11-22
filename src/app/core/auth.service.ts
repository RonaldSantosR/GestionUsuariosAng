import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from './token.storage';

@Injectable()
export class AuthService {

  baseUrl: 'http://192.168.1.213:8082/';

  headers: HttpHeaders;

  constructor(private http: HttpClient, private token:TokenStorage) {


  }

  attemptAuth(ussername: string, password: string): Observable<any> {
    this.headers = new HttpHeaders({
      "Authorization": "Basic " + btoa(ussername + ':' + password)
    })
    
    return this.http.post<any>('http://192.168.1.213:8082/login/token', null, {headers: this.headers});
  }

  FinAuth(): Observable<any> {
    console.log(this.token.getToken())
    let jwt = this.token.getToken();
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    let sesion = decodedJwtData.idSesion
    console.log('idSesion :: '+sesion);

    return this.http.post<any>('http://192.168.1.213:8082/login/cerrarsession', sesion);
    
  }

  

}