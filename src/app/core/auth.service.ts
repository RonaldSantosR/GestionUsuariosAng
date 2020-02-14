import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from './token.storage';
import { Dominio } from '../model/dominio.model';

@Injectable()
export class AuthService {

  baseUrl: 'http://localhost:8333/';

  headers: HttpHeaders;

  constructor(private http: HttpClient, private token:TokenStorage) { }

  attemptAuth(ussername: string, password: string, idAcceso:number): Observable<any> {
    this.headers = new HttpHeaders({
      "Authorization": "Basic " + btoa(ussername + ':' + password)
    })
    
    return this.http.post<any>('http://localhost:8333/login/token/' + 1, null, {headers: this.headers});
  }

  attemptAuthActiveDirectory(ussername: string, password: string, idAcceso:number, objectoDominio:Dominio): Observable<any> {
    this.headers = new HttpHeaders({
      "Authorization": "Basic " + btoa(ussername + ':' + password)
    })
    
    return this.http.post<any>('http://localhost:8333/login/token/' + 1, objectoDominio, {headers: this.headers});
  }
  
  FinAuth(): Observable<any> {
    console.log(this.token.getToken())
    let jwt = this.token.getToken();
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    let sesion = decodedJwtData.idSesion
    console.log('idSesion :: '+sesion);

    return this.http.post<any>('http://localhost:8333/login/cerrarsession', sesion);
    
  }
  

}
