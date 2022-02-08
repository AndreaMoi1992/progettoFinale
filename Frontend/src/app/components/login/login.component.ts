import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../jwt-auth/auth/auth.service';
import { TokenStorageService } from '../../jwt-auth/auth/token-storage.service';
import { AuthLoginInfo } from '../../jwt-auth/auth/login-info';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const CUSTOMER_KEY = 'customer_id';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  userLoggedId$: String;
  userId: number;
  public showPasswordOnPress: boolean;




  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
    const UserId = sessionStorage.getItem(CUSTOMER_KEY);
    this.userLoggedId$ = UserId;
    var userIdString = sessionStorage.getItem(CUSTOMER_KEY); ///Get value as string
    this.userId = parseInt(userIdString)//Returns userId in number
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveLoggedIn();
        this.tokenStorage.saveUsername(data.username);
        this.authService.getUserIdByUsername(this.tokenStorage.getUsername()).subscribe(response => {
          this.tokenStorage.saveUserId(response.id)
          this.tokenStorage.saveRole(response.role[0].name)
        }
        )
        this.isLoginFailed = false;
        this.router.navigate(['/dashboard'])
          .then(() => {
            this.reloadPage()
          });
      },
      error => {
        if (error.status == "401") {
          this.errorMessage = "Dati non validi"
          this.isLoginFailed = true;
        }
      }
    );
  }
  reloadPage() {
    window.location.reload();
  }
  isLoggedIn(){
    return this.tokenStorage.getLoggedIn()
  }
}

