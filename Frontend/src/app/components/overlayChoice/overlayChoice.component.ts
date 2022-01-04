import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlayChoice',
  templateUrl: './overlayChoice.component.html',
  styleUrls: ['./overlayChoice.component.css']
})
export class OverlayChoiceComponent implements OnInit {

  public choice$: string;

  constructor() {
    const Choice = sessionStorage.getItem('choice');
    this.choice$ = Choice;
   }

  ngOnInit() {
    this.on()
  }

  api() {
    sessionStorage.setItem('choice', 'api');
    this.off();
    window.location.reload()
  }
  database() {
    sessionStorage.setItem('choice', 'database');
    this.off();
    window.location.reload()
  }


  on() {
    document.getElementById("overlay").style.display = "block";
  }

  off() {
    document.getElementById("overlay").style.display = "none";
  }

}
