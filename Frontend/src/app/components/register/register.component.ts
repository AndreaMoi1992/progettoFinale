import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../jwt-auth/auth/auth.service';
import { SignUpInfo } from '../../jwt-auth/auth/signup-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  userLogged: string;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router : Router) {

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
          this.isSignUpFailed = false;
          this.router.navigate(['/login']);
        }else{
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      }
    );

  }
}
