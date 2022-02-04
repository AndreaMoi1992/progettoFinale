import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../jwt-auth/auth/auth.service';
import { SignUpInfo } from '../../jwt-auth/auth/signup-info';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from 'src/app/jwt-auth/auth/token-storage.service';

const EMAIL = 'email'
const USERNAME = 'username'
const NAME = 'name'
const PASSWORD = 'password'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  userLogged: string;

  emailSbagliata: boolean = false;
  nomeSbagliato: boolean = false;
  usernameSbagliata: boolean = false;
  passwordSbagliata: boolean = false;
  public showPasswordOnPress: boolean;

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/login'])
        .then(() => {
          this.reloadPage()
        });
    }
  }

  onSubmit() {
    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    );

    if (this.signupInfo.password.length > 40) {
      this.wrongInsert(PASSWORD);
      this.errorMessage = "Password troppo lunga";
      this.isSignUpFailed = true;
    } else if (this.signupInfo.password.length < 6) {
      this.wrongInsert(PASSWORD);
      this.errorMessage = "Password troppo corta";
      this.isSignUpFailed = true;
    } else if(this.signupInfo.name.length > 20) {
      this.wrongInsert(NAME);
      this.errorMessage = "Nome troppo lungo";
      this.isSignUpFailed = true;
    }else{
      this.authService.signUp(this.signupInfo).subscribe(
        data => {
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/login']);
        },
        error => {
          if (error.error.includes("Username")) {
            this.wrongInsert(USERNAME);
            this.errorMessage = "Username gia' utilizzato";
            this.isSignUpFailed = true;
          } else if (error.error.includes("Email")) {
            this.wrongInsert(EMAIL);
            this.errorMessage = "Email gia' utilizzata";
            this.isSignUpFailed = true;
          }
        }
      )
    }
  }
  reloadPage() {
    window.location.reload();
  }
  wrongInsert(wrongInsert : string) {
    this.passwordSbagliata = false;
    this.emailSbagliata = false;
    this.usernameSbagliata = false;
    this.nomeSbagliato = false;
    if(wrongInsert == EMAIL){
      this.emailSbagliata = true;
    }
    if(wrongInsert == USERNAME){
      this.usernameSbagliata = true;
    }
    if(wrongInsert == NAME){
      this.nomeSbagliato = true;
    }
    if(wrongInsert == PASSWORD){
      this.passwordSbagliata = true;
    }
  }
}
