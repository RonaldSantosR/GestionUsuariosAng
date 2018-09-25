import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthTokenChris';
const REFRESH_TOKEN_KEY = 'AuthTokenRonald';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,  token);
  }

  public saveRefreshToken(refreshtoken: string){
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshtoken);
  }

  public getToken(): string {
    return window.localStorage.getItem(TOKEN_KEY);
  }
}
