import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { MoviesApiService } from './../../services/moviesapi.service';
import { ResultInterface } from './../../models/apiMovie.model';
import { Component, OnInit } from '@angular/core';
import { MovieApiInterface } from '../../models/apiMovie.model';

@Component({
  selector: 'app-movies-parse',
  templateUrl: './movies-parse.component.html',
  styleUrls: ['./movies-parse.component.css']
})
export class MoviesParseComponent implements OnInit {
  moviesDataLoader=false;

  movies : MovieApiInterface;
  resultsApi : ResultInterface;

  film1 : ResultInterface;
  film2 : ResultInterface;
  filmPath : string = "https://image.tmdb.org/t/p/w500";
  film1Path : string;
  film2Path : string;

  titoloFilm1: string;
  titoloFilm2: string;

  counter: number = 0;
  idFilm1: number;
  idFilm2: number;

  constructor(public authService: AuthService,private moviesApi: MoviesApiService, private router : Router) { }

  ngOnInit(): void {

    this.generateFilms();

  }

  generateFilms(){


    this.moviesApi.getMarvelList().subscribe(response => {
      this.moviesDataLoader=true;
      this.movies = response;

      this.resultsApi = this.movies.results;


      //Conta dei film all'interno dell'array
      for(let i in this.resultsApi){
        this.counter++;
      }

      this.idFilm1 = Math.floor(Math.random() * this.counter) + 0 ;

      for(let i=0;i<this.counter;i++){
        if(this.idFilm1 == i){
          this.film1 = this.resultsApi[i];
          this.film1Path = this.filmPath.concat(this.resultsApi[i].backdrop_path);
          this.titoloFilm1 = this.film1.title;
        }
      }

      this.idFilm2 = Math.floor(Math.random() * this.counter) + 0 ;

      if(this.idFilm1 == this.idFilm2 && this.idFilm1 != this.counter){
        this.idFilm2++;
      }else if(this.idFilm1 == this.counter){
        this.idFilm2--;
      }
      console.log(this.movies);

      for(let i=0;i<this.counter;i++){
        if(this.idFilm2 == i){
          this.film2 = this.resultsApi[i];
          this.film2Path = this.filmPath.concat(this.resultsApi[i].backdrop_path);
          this.titoloFilm2 = this.film2.title;
        }
      }
    },
    error => console.log(error)
    )


  }

  onClickFilm1(){

    this.idFilm2 = Math.floor(Math.random() * this.counter) + 0 ;

    if(this.idFilm1 == this.idFilm2 && this.idFilm1 != this.counter){
      this.idFilm2++;
    }else if(this.idFilm1 == this.counter){
      this.idFilm2--;
    }
    console.log(this.movies);
    for(let i=0;i<this.counter;i++){
      if(this.idFilm2 == i){
        this.film2 = this.resultsApi[i];
        this.film2Path = this.filmPath.concat(this.resultsApi[i].backdrop_path);
        this.titoloFilm2 = this.film2.title;
      }
    }
  }
  onClickFilm2(){

    this.idFilm1 = Math.floor(Math.random() * this.counter) + 0 ;

    if(this.idFilm1 == this.idFilm2 && this.idFilm1 != this.counter){
      this.idFilm2++;
    }else if(this.idFilm1 == this.counter){
      this.idFilm2--;
    }
    console.log(this.movies);
    for(let i=0;i<this.counter;i++){
      if(this.idFilm1 == i){
        this.film1 = this.resultsApi[i];
        this.film1Path = this.filmPath.concat(this.resultsApi[i].backdrop_path);
        this.titoloFilm1 = this.film1.title;
      }
    }
  }


}
