import { Injectable } from '@angular/core';


const TOKEN_KEY = 'Access Token';
const REFRESH_TOKEN_KEY = 'Refresh Token';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    //window.localStorage.removeItem(TOKEN_KEY);
    //window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.clear();
  }

  public saveToken(token: string , rt: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,  token);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, rt);
  }


  public getToken(): string {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public getRefreshToken(): string {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
  }
}
//hola