import { LoginComponent } from './../login/login.component';
import { TokenStorageService } from './../../jwt-auth/auth/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mustbelogged',
  templateUrl: './mustbelogged.component.html',
  styleUrls: ['./mustbelogged.component.css']
})
export class MustbeloggedComponent implements OnInit {

  constructor( public tokenService : TokenStorageService ) { }

  ngOnInit() {
  }

}
