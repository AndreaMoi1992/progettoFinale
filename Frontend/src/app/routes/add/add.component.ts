import { TokenStorageService } from './../../jwt-auth/auth/token-storage.service';
import { LoginComponent } from './../../components/login/login.component';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MovieData } from './../../models/data.model'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router, public tokenStorage : TokenStorageService) { }

  ngOnInit(): void {

  }

  dataEntry : MovieData;

  genres = ['Horror','Adventure','Comedy','Fantasy','Crime','Romance']
  ratedOptions = ['Yes', 'No']



  onSubmit(form : NgForm){
    this.dataEntry = form.form.value;
    console.log(form)
    console.log(this.dataEntry);

    if(form.form.value.rated==='Yes'){
      this.dataEntry.rated=true;
    }else{
      this.dataEntry.rated=false;
    }

    this.dataService.addEntry(this.dataEntry).subscribe(response => {
      console.log(response);
      this.router.navigate(['/dashboard']);
    },
    (err) => {
      //fai qualcosa
    }
    )
  }
}
