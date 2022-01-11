import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../jwt-auth/auth/auth.service';
import { SignUpInfo } from '../../jwt-auth/auth/signup-info';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed$ : BehaviorSubject<boolean>;
  userLogged: string;

  errorMessage = '';

  constructor(private authService: AuthService, private router : Router) {
    const isSignUpFailed = sessionStorage.getItem('signupfail') === 'true';
    this.isSignUpFailed$ = new BehaviorSubject(isSignUpFailed);

  }

  ngOnInit() {
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
      },
      error => {
        console.log(error)
        if(error.status === 200){
          this.isSignedUp = true;
          window.sessionStorage.setItem('signupfail', 'false');
          this.router.navigate(['/login']);
        }else if(error.status === 400){
          this.errorMessage = "Email o Username gia' utilizzati";
          window.sessionStorage.setItem('signupfail', 'true');
        }else{
          this.errorMessage = error.error.text
          window.sessionStorage.setItem('signupfail', 'true');
        }
      }
    );

  }
}
