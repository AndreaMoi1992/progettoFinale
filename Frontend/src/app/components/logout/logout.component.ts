import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../jwt-auth/auth/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }
  getUsername() {
    return this.tokenStorage.getUsername()
  }
  getRole() {
    if(this.tokenStorage.getRole()=="ROLE_ADMIN"){
      return "ADMIN"
    }else if(this.tokenStorage.getRole()=="ROLE_PM"){
      return "Project Manager"
    }else if(this.tokenStorage.getRole()=="ROLE_USER"){
      return "USER"
    }else{
      return "Nessun ruolo"
    }

  }
  logout() {
    this.tokenStorage.signOut();
    this.reloadPage();
  }
  reloadPage() {
    window.location.reload();
  }
  isLoggedIn() {
    return this.tokenStorage.getLoggedIn();
  }
}
