import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const CUSTOMER_KEY = 'customer_id';
const LOGGEDIN_KEY = 'loggedIn';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public isLoggedIn$: BehaviorSubject<boolean>;
  public userLoggedId$: String;
  public userId: number;



  constructor() {
    const isLoggedIn = sessionStorage.getItem(LOGGEDIN_KEY) === 'true';
    this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
    const UserId = sessionStorage.getItem(CUSTOMER_KEY);
    this.userLoggedId$ = UserId;
    var userIdString = sessionStorage.getItem(CUSTOMER_KEY); ///Get value as string
    this.userId = parseInt(userIdString)//Returns userId in number
  }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.setItem(LOGGEDIN_KEY, 'true');
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
  public saveUserId(userId: string) {
    window.sessionStorage.setItem(CUSTOMER_KEY, userId);
  }
}
