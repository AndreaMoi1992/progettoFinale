import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public isLoggedIn$: BehaviorSubject<boolean>;
  public userLoggedId$: String;
  public userId: number;



  constructor() {
    const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
    this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
    const UserId = sessionStorage.getItem('customer_id');
    this.userLoggedId$ = UserId;
    var userIdString = sessionStorage.getItem("customer_id"); ///Get value as string
    this.userId = parseInt(userIdString)//Returns userId in number
  }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.setItem('loggedIn', 'true');
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
    window.sessionStorage.setItem('customer_id', userId);
  }
}
