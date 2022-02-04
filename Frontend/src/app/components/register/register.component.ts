import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../jwt-auth/auth/auth.service';
import { SignUpInfo } from '../../jwt-auth/auth/signup-info';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from 'src/app/jwt-auth/auth/token-storage.service';

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

  errorMessage = '';

  constructor(private authService: AuthService, private router : Router, private tokenStorage: TokenStorageService) {
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

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      },
      error => {
        if(error.status === 400){
          this.errorMessage = "Email o Username gia' utilizzati";
          this.isSignUpFailed = true;
        }else{
          this.isSignUpFailed = true;
        }
      }
    );

  }
  reloadPage() {
    window.location.reload();
  }
}
