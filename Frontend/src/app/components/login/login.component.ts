import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../jwt-auth/auth/auth.service';
import { TokenStorageService } from '../../jwt-auth/auth/token-storage.service';
import { AuthLoginInfo } from '../../jwt-auth/auth/login-info';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed$ : BehaviorSubject<boolean>;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  username$: String;
  userLoggedId$: String;
  userId: number;


  constructor(private authService: AuthService, public tokenStorage: TokenStorageService) {
    const isLoginFailed = sessionStorage.getItem('loginfail') === 'true';
    this.isLoginFailed$ = new BehaviorSubject(isLoginFailed);
    const username = sessionStorage.getItem('usernameLogged');
    this.username$ = username;
    const UserId = sessionStorage.getItem('customer_id');
    this.userLoggedId$ = UserId;
    var userIdString = sessionStorage.getItem("customer_id"); ///Get value as string
    this.userId = parseInt(userIdString)//Returns userId in number
  }

  ngOnInit() {
    window.sessionStorage.setItem('loginfail', 'false');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.authService.getUserIdByUsername(this.username$).subscribe(response => {
        this.tokenStorage.saveUserId(response.id)
      }
      )
    }


  }

  onSubmit() {
      this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);


    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        window.sessionStorage.setItem('usernameLogged', this.form.username)
        window.sessionStorage.setItem('loginfail', 'false');

        this.isLoggedIn = true;
        this.reloadPage();
      },
      error => {
        if(error.status == "401"){
          this.errorMessage = "Utente non trovato"
          window.sessionStorage.setItem('loginfail', 'true');
        }

      }
    );

  }

  reloadPage() {
    window.location.reload();
  }
  logout() {
    this.tokenStorage.signOut();
    this.reloadPage();
  }
}

