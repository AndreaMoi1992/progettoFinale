import { Router } from '@angular/router';
import { UserData } from './../models/users.model';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {

  baseURL = 'http://localhost:3000/user';

  public isLoggedIn$: BehaviorSubject<boolean>;
  public userLogged$: string;
  public userLoggedId$: string;
  public userId : number;

  usernameInput: string;
  passwordInput: string;



  admin: UserData = {
    id: 1,
    username: "root",
    password: "root"
  }

  pippo: UserData = {
    id: 2,
    username: "pippo",
    password: "pippo2"
  }

  users: UserData[] = [this.admin, this.pippo];



  constructor(private router: Router) {
    const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
    this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
    const LoggedUser = sessionStorage.getItem('loggedUser');
    this.userLogged$ = LoggedUser;
    const UserId = sessionStorage.getItem('customer_id');
    this.userLoggedId$ = UserId;

  }

  login() {
    if (this.usernameInput != null && this.passwordInput != null) {

      if (this.searchInsideArray(this.usernameInput, this.passwordInput)) {

        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('loggedUser', this.usernameInput);
        if(this.usernameInput == "pippo"){
          sessionStorage.setItem('customer_id', '2');
        }else{
          sessionStorage.setItem('customer_id', '1');
        }



        var userIdString = sessionStorage.getItem("customer_id"); ///Get value as string
        this.userId = parseInt(userIdString)//Returns userId in number

        this.isLoggedIn$.next(true);
        this.router.navigate(['/dashboard']);

        // chiama il database utenti
        // trova l'utente con quella username e password
        // prendi l'user id e salvalo
        // cambia il cambo database "è loggato"

        //window.location.reload();


      }
    }

  }

  logout() {
    // logic
    sessionStorage.setItem('loggedIn', 'false');
    sessionStorage.setItem('loggedUser', '');
    this.isLoggedIn$.next(false);
    sessionStorage.clear()
  }

  searchInsideArray(username: string, password: string): boolean {
    for (let i = 0; i < this.users.length; i++) {
      if (username == this.users[i].username && password == this.users[i].password) {
        return true;
      }
    }
    return false;
  }
}
