import { Injectable } from '@angular/core';
import { EncrDecrServiceService } from './encr-decr-service.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_PASSKEY = 'auth-passuser';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(
    private EncrDecr: EncrDecrServiceService
  ) { }
  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user:any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getPass(): string  {
    return this.EncrDecr.get('795130$#@$^@1ERF', sessionStorage.getItem(USER_PASSKEY) || '{}');
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || '{}');
  }

}
