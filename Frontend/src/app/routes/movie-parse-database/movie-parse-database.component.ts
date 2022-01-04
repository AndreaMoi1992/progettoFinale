import { RatingsDatabaseService } from './../../services/ratingsDatabase.service';
import { Customers } from './../../models/customer.model';
import { RatingData, Ratings } from './../../models/rating.model';
import { RatingsService } from './../../services/ratings.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { MoviesApiService } from './../../services/moviesapi.service';
import { MovieDatabaseInterface } from './../../models/apiMovie.model';
import { Component, OnInit } from '@angular/core';
import { MovieApiInterface } from '../../models/apiMovie.model';
import { MovieDatabaseServiceService } from 'src/app/services/movie-database-service.service';

@Component({
  selector: 'app-movie-parse-database',
  templateUrl: './movie-parse-database.component.html',
  styleUrls: ['./movie-parse-database.component.css']
})
export class MovieParseDatabaseComponent implements OnInit {

  moviesDataLoader=false;

  imageURL: string;

  movies : MovieApiInterface;
  resultsApi : MovieDatabaseInterface;
  ratingData: RatingData;

  movieDatabase : MovieDatabaseInterface;
  verificaDatabase: Array<MovieDatabaseInterface>;



  displayMovies : MovieDatabaseInterface [];

  film1 : MovieDatabaseInterface;
  film2 : MovieDatabaseInterface;
  filmPath : string = "https://image.tmdb.org/t/p/w500";
  film1Path : string;
  film2Path : string;

  titoloFilm1: string;
  titoloFilm2: string;

  counter: number = 0;
  idFilm1: number;
  idFilm2: number;

  constructor(public authService: AuthService ,public moviesDatabaseService: MovieDatabaseServiceService,private moviesApi: MoviesApiService,private ratingServiceDatabase: RatingsDatabaseService) {

  }

  ricaricaPagina: boolean =false;



  ngOnInit(): void {

    this.inserimentoDatabase();

    this.generateFilms();

  }

  generateFilms(){



    this.moviesDatabaseService.getMovieDatabaseData().subscribe(response =>{
      this.moviesDataLoader=true;
      this.displayMovies=response;

      let grandezza= this.displayMovies.length;

      this.idFilm1 = Math.floor(Math.random() * grandezza) + 0 ;

      for(let i=0;i<grandezza;i++){
        if(this.idFilm1 == i){
          this.film1 = this.displayMovies[i];
          this.film1Path =this.displayMovies[i].image_path;
          this.titoloFilm1=this.film1.title;
        }
      }



      this.idFilm2 = Math.floor(Math.random() * grandezza) + 0 ;

      if(this.idFilm1 == this.idFilm2 && this.idFilm1 != this.counter){
        this.idFilm2++;
      }else if(this.idFilm1 == grandezza){
        this.idFilm2--;
      }

      for(let i=0;i<grandezza;i++){
        if(this.idFilm2 == i){
          this.film2 = this.displayMovies[i];
          this.film2Path =this.displayMovies[i].image_path;
          this.titoloFilm2=this.film2.title;
        }
      }
    })
  }

  addFilmDatabase(){


    this.moviesApi.getMarvelList().subscribe(response=> {
      this.movies = response;
      this.resultsApi = this.movies.results;

      var counter = 0;
      for(let i in this.resultsApi){
        counter++;
      }



      for(let i=0; i<counter; i++){
        this.imageURL=this.filmPath.concat(this.resultsApi[i].backdrop_path);
        this.movieDatabase=this.resultsApi[i];

        this.movieDatabase.idmovie=this.resultsApi[i].id;
        this.movieDatabase.image_path=this.imageURL;
        this.moviesDatabaseService.addMovieDatabaseEntry(this.movieDatabase).subscribe(response => {
        },
        (err) => {
        })
      }
      window.location.reload();
    })
  }

  inserimentoDatabase(){
    this.moviesDatabaseService.getMovieDatabaseData().subscribe( (response : any) => {
      this.verificaDatabase = response;


      if(this.verificaDatabase.length==0){
        this.addFilmDatabase();
        this.ricaricaPagina=true;
      }
    })


  }

  onClickFilm1(){

    let grandezza= this.displayMovies.length;
    this.idFilm2 = Math.floor(Math.random() * grandezza) + 0 ;
    if(this.idFilm1 == this.idFilm2 && this.idFilm1 != grandezza){
      this.idFilm2++;
    }else if(this.idFilm1 == grandezza){
      this.idFilm2--;
    }

    for(let i=0;i<grandezza;i++){
      if(this.idFilm2 == i){
        this.film2 = this.displayMovies[i];
        this.film2Path =this.displayMovies[i].image_path;
        this.titoloFilm2=this.film2.title;
      }
    }
    //Aggiungi votazione al db, Funzioni da cambiare quando verranno aggiunte le due tabelle in più perche i movie_id sono diversi anche se i film sono uguali
    var alreadyCreated: boolean = false;

    // Ricava la lista di ratings dal db
    this.ratingServiceDatabase.getRatingDatabaseData().subscribe((response: any) => {
      // La risposta viene assegnata a ratingData
      this.ratingData = response;

      var counter = 0;

      var RatingToAdd: Ratings =
      {
        "id": null,
        "movie_id": this.film1.id,
        "rating": 1
      }

      var Customer: Customers =
      {
        "id": null,
        "movie_id": this.film1.id,
        //Da aggiustare con springboot
        "customer_id": this.authService.userId
      }
      for (let i in this.ratingData.data) {
        counter++
      }
      for (let i = 0; i < counter; i++) {
        if (counter > 0 && this.film1.id == this.ratingData.data[i].movie_id) {
          alreadyCreated = true;
          this.ratingData.data[i].rating++
          this.ratingServiceDatabase.editRatingDatabaseEntry(this.ratingData.data[i]).subscribe(response => {
            this.ratingServiceDatabase.addCustomerDatabaseEntry(Customer).subscribe(response => {
            }), err => {
              console.log(err);
            };
          }), err => {
            console.log(err);
          };
        }
      }
      if (alreadyCreated == false) {
        this.ratingServiceDatabase.addRatingDatabaseEntry(RatingToAdd).subscribe(response => {
          this.ratingServiceDatabase.addCustomerDatabaseEntry(Customer).subscribe(response => {
          }), err => {
            console.log(err);
          };
        }), err => {
          console.log(err);
        };
      }
    },
      (err) => {
        console.log(err);
      }
    )
  }

  onClickFilm2(){

    let grandezza= this.displayMovies.length;
    this.idFilm1 = Math.floor(Math.random() * grandezza) + 0 ;
    if(this.idFilm1 == this.idFilm2 && this.idFilm1 != grandezza){
      this.idFilm1++;
    }else if(this.idFilm1 == grandezza){
      this.idFilm1--;
    }

    for(let i=0;i<grandezza;i++){
      if(this.idFilm1 == i){
        this.film1 = this.displayMovies[i];
        this.film1Path =this.displayMovies[i].image_path;
        this.titoloFilm1=this.film1.title;
      }
    }
    //Aggiungi votazione al db, Funzioni da cambiare quando verranno aggiunte le due tabelle in più perche i movie_id sono diversi anche se i film sono uguali
    var alreadyCreated: boolean = false;

    // Ricava la lista di ratings dal db
    this.ratingServiceDatabase.getRatingDatabaseData().subscribe((response: any) => {
      // La risposta viene assegnata a ratingData
      this.ratingData = response;

      var counter = 0;

      var RatingToAdd: Ratings =
      {
        "id": null,
        "movie_id": this.film2.id,
        "rating": 1
      }

      var Customer: Customers =
      {
        "id": null,
        "movie_id": this.film2.id,
        //Da aggiustare con springboot
        "customer_id": this.authService.userId
      }

      for (let i in this.ratingData.data) {
        counter++
      }
      for (let i = 0; i < counter; i++) {
        if (counter > 0 && this.film2.id == this.ratingData.data[i].movie_id) {
          alreadyCreated = true;
          this.ratingData.data[i].rating++
          this.ratingServiceDatabase.editRatingDatabaseEntry(this.ratingData.data[i]).subscribe(response => {
            this.ratingServiceDatabase.addCustomerDatabaseEntry(Customer).subscribe(response => {
            }), err => {
              console.log(err);
            };
          }), err => {
            console.log(err);
          };

        }
      }
      if (alreadyCreated == false) {
        this.ratingServiceDatabase.addRatingDatabaseEntry(RatingToAdd).subscribe(response => {
          this.ratingServiceDatabase.addCustomerDatabaseEntry(Customer).subscribe(response => {
          }), err => {
            console.log(err);
          };
        }), err => {
          console.log(err);
        };
      }
    },
      (err) => {
        console.log(err);
      }
    )
  }

}

