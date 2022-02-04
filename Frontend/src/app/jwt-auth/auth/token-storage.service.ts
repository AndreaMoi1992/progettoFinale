import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const CUSTOMER_KEY = 'customer_id';
const LOGGEDIN_KEY = 'loggedIn';
const ROLE_KEY = 'role';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public isLoggedIn$: BehaviorSubject<boolean>;
  public userLoggedId$: String;
  public userId: number;
  public role: string;

  constructor() {
    const isLoggedIn = sessionStorage.getItem(LOGGEDIN_KEY) === 'true';
    this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
    const UserId = sessionStorage.getItem(CUSTOMER_KEY);
    this.userLoggedId$ = UserId;
    var userIdString = sessionStorage.getItem(CUSTOMER_KEY); ///Get value as string
    this.userId = parseInt(userIdString)//Returns userId in number
    this.role = localStorage.getItem('role');
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
  public getRole(): string {
    return sessionStorage.getItem(ROLE_KEY);
  }
  public saveUserId(userId: string) {
    window.sessionStorage.setItem(CUSTOMER_KEY, userId);
  }
  public getUserId(): number {
    var userIdString = sessionStorage.getItem(CUSTOMER_KEY); ///Get value as string
     //Returns userId in number
    return parseInt(userIdString);
  }
  public saveRole(role : string) {
    window.sessionStorage.setItem(ROLE_KEY, role);
  }
}
