import { LoginComponent } from './../../components/login/login.component';
import { BehaviorSubject } from 'rxjs';
import { RatingsDatabaseService } from './../../services/ratingsDatabase.service';
import { Customers, CustomerData } from './../../models/customer.model';
import { MovieDatabaseInterface } from './../../models/apiMovie.model';
import { RatingData, Ratings } from './../../models/rating.model';
import { RatingsService } from './../../services/ratings.service';

import { MoviesApiService } from './../../services/moviesapi.service';

import { Component, OnInit } from '@angular/core';
import { MovieApiInterface } from '../../models/apiMovie.model';
import { MovieDatabaseServiceService } from '../../services/movie-database-service.service';
import { TokenStorageService } from '../../jwt-auth/auth/token-storage.service';


const CUSTOMER_KEY = 'customer_id';
const API = 'api';
const DATABASE = 'database';
const CHOICE = 'choice';
const FILM1 = 'film1';
const FILM2 = 'film2';

@Component({
  selector: 'app-movies-parse',
  templateUrl: './movies-parse.component.html',
  styleUrls: ['./movies-parse.component.css']
})
export class MoviesParseComponent implements OnInit {
  moviesDataLoader = false;
  ricaricaPagina: boolean = false;
  verificaDatabase: Array<MovieDatabaseInterface>;
  displayMovies: MovieDatabaseInterface[];
  imageURL: string;
  movieDatabase: MovieDatabaseInterface;

  //Variabile a cui viene assegnata la libreria di movies dell'api
  movies: MovieApiInterface;
  //Variabile a cui vengono assegnati i movies dell'api
  resultsApi: MovieDatabaseInterface;
  //Variabile a cui viengono assegnati i ratings dei gilm
  ratingData: RatingData;
  customersData: CustomerData;
  customersVoting: Customers[] = [];

  film1: MovieDatabaseInterface;
  film2: MovieDatabaseInterface;
  filmPath: string = "https://image.tmdb.org/t/p/w500";
  film1Path: string;
  film2Path: string;

  choice$: string;
  private userLoggedId$: string;
  private userId: number;

  titoloFilm1: string;
  titoloFilm2: string;

  counter: number = 0;
  idFilm1: number;
  idFilm2: number;

  constructor(private ratingService: RatingsService, public tokenService: TokenStorageService,
    private moviesApi: MoviesApiService, private moviesDatabaseService: MovieDatabaseServiceService, private ratingServiceDatabase: RatingsDatabaseService) {
    const Choice = sessionStorage.getItem(CHOICE);
    this.choice$ = Choice;
    const UserId = sessionStorage.getItem(CUSTOMER_KEY);
    this.userLoggedId$ = UserId;
    var userIdString = sessionStorage.getItem(CUSTOMER_KEY); ///Get value as string
    this.userId = parseInt(userIdString)//Returns userId in number

  }
  ngOnInit(): void {
    this.databaseGeneration();
  }


  onClickChoiceDatabase() {
    sessionStorage.setItem(CHOICE, DATABASE);
    this.moviesDataLoader = false;
    window.location.reload()
  }
  onClickChoiceApi() {
    sessionStorage.setItem(CHOICE, API);
    this.moviesDataLoader = false;
    window.location.reload()
  }
  databaseGeneration() {

    if (this.choice$ == API) {
      this.generateFilmsApi();
    }
    if (this.choice$ == DATABASE) {
      this.inserimentoDatabase();
      this.generateFilmsDatabase();
    }
  }
  generateFilmsApi() {
    console.log(API.toUpperCase())

    // Fai una get per ottenere la lista dei film dell'api
    this.moviesApi.getMovies().subscribe(response => {
      this.moviesDataLoader = true;
      this.movies = response;
      this.resultsApi = this.movies.results;
      this.counter = this.count(this.resultsApi)

      this.generateFilm1();
      this.generateFilm2();
    },
      error => console.log(error)
    )


  }
  onClickFilm1() {
    document.getElementById(FILM1).setAttribute("disabled","disabled");
    setTimeout(function(){document.getElementById(FILM1).removeAttribute("disabled")},1000);
    var ratingService = this.choices(FILM1);
    this.addVote(ratingService,this.film1);
  }
  onClickFilm2() {

    document.getElementById(FILM2).setAttribute("disabled","disabled");
    setTimeout(function(){document.getElementById(FILM2).removeAttribute("disabled")},1000);
    var ratingService = this.choices(FILM2);
    this.addVote(ratingService,this.film2);
  }
  choices(film : String) {
    var ratingService;
    if (this.choice$ == API) {
      if(film == FILM1){
        this.generateFilm2();
      }else if(film == FILM2){
        this.generateFilm1();
      }

      ratingService = this.ratingService

    } else if (this.choice$ == DATABASE) {
      if(film == FILM1){
        this.generateFilm2Database()
      }else if(film == FILM2){
        this.generateFilm1Database()
      }

      ratingService = this.ratingServiceDatabase
    }


    return ratingService;
  }
  addVote(ratingService: any, film : MovieDatabaseInterface) {
    // Ricava la lista di ratings dal db
    ratingService.getRatingDatabaseData().subscribe((response: RatingData) => {
      // La risposta viene assegnata a ratingData
      this.ratingData = response;
      var ratings = this.ratingData.data
      ratingService.getCustomersDatabaseData().subscribe((res: CustomerData) => {
        this.customersData = res;
        var customers = this.customersData.data
        this.voteCheck(ratings, customers, film, ratingService);
      }, (err) => {
        console.log(err);
      }
      )
    },
      (err) => {
        console.log(err);
      }
    )
  }
  generateFilmsDatabase() {
    console.log(DATABASE.toUpperCase())
    this.moviesDatabaseService.getMovieDatabaseData().subscribe(response => {
      this.moviesDataLoader = true;
      this.displayMovies = response;
      this.generateFilm1Database();
      this.generateFilm2Database();
    })
  }
  addFilmDatabase() {
    this.moviesApi.getMarvelList().subscribe(response => {
      this.movies = response;
      this.resultsApi = this.movies.results;

      var counter = this.count(this.resultsApi);

      for (let i = 0; i < counter; i++) {
        this.imageURL = this.filmPath.concat(this.resultsApi[i].backdrop_path);
        this.movieDatabase = this.resultsApi[i];

        this.movieDatabase.idmovie = this.resultsApi[i].id;
        this.movieDatabase.image_path = this.imageURL;
        this.moviesDatabaseService.addMovieDatabaseEntry(this.movieDatabase).subscribe(response => {
        },
          (err) => {
          })
      }
      window.location.reload();
    })
  }
  inserimentoDatabase() {
    this.moviesDatabaseService.getMovieDatabaseData().subscribe((response: any) => {
      this.verificaDatabase = response;
      if (this.verificaDatabase.length == 0) {
        this.addFilmDatabase();
        this.ricaricaPagina = true;
      }
    })
  }
  findDoubleMovieId(rating: Ratings, customers: Customers[]) {
    let elementFound = false;
    let count = this.count(customers);

    for (let i = 0; i < count; i++) {
      if (customers[i].movie_id === rating.movie_id) {
        return true;
      }
    }
    return elementFound;
  }
  editRating(ratings: Ratings, customers: Customers, ratingService: any) {
    ratings.rating++
    ratingService.editRatingDatabaseEntry(ratings).subscribe(response => {

    }), err => {
      console.log(err);
    };
    ratingService.addCustomerDatabaseEntry(customers).subscribe(response => {
    }), err => {
      console.log(err);
    };
  }
  addRating(rating: Ratings, customers: Customers, ratingService: any) {
    ratingService.addRatingDatabaseEntry(rating).subscribe(response => {
    }), err => {
      console.log(err);
    };
    ratingService.addCustomerDatabaseEntry(customers).subscribe(response => {
    }), err => {
      console.log(err);
    };
  }
  count(itemToCount: any) {
    var count = 0;
    for (let i in itemToCount) {
      count++
    }
    return count;
  }
  generateFilm1() {
    this.idFilm1 = Math.floor(Math.random() * this.counter) + 0;

    if (this.idFilm2 == this.idFilm1 && this.idFilm2 != this.counter) {
      this.idFilm1++;
    } else if (this.idFilm1 == this.idFilm2 && this.idFilm1 == this.counter) {
      this.idFilm1--;
    }
    for (let i = 0; i < this.counter; i++) {
      // Se nell'array dell'api c'è un indice uguale all'id del film generato
      if (this.idFilm1 == i) {
        // film1 è uguale al film in quella posizione
        this.film1 = this.resultsApi[i];
        this.film1.idmovie = this.resultsApi[i].id
        this.film1Path = this.filmPath.concat(this.resultsApi[i].backdrop_path);
        this.titoloFilm1 = this.film1.title;
      }
    }
  }
  generateFilm2() {
    // Al click del pulsante del primo film genera un id per il secondo film
    this.idFilm2 = Math.floor(Math.random() * this.counter) + 0;

    // Se l'id del primo film è uguale all'id del secondo e l'id del primo film è diverso dall'ultimo indice dell'array dei film dell'api
    if (this.idFilm1 == this.idFilm2 && this.idFilm1 != this.counter) {
      //Aggiungi 1 all'id del secondo film
      this.idFilm2++;
      // Invece se l'id del primo film è uguale all'id del secondo e l'id del primo film è uguale all'ultimo indice dell'array dei film dell'api
    } else if (this.idFilm1 == this.idFilm2 && this.idFilm1 == this.counter) {
      //Togli 1 all'id del secondo film
      this.idFilm2--;
    }
    for (let i = 0; i < this.counter; i++) {
      // Se nell'array dell'api c'è un indice uguale all'id del film generato
      if (this.idFilm2 == i) {
        // film2 è uguale al film in quella posizione
        this.film2 = this.resultsApi[i];
        this.film2.idmovie = this.resultsApi[i].id
        this.film2Path = this.filmPath.concat(this.resultsApi[i].backdrop_path);
        this.titoloFilm2 = this.film2.title;
      }
    }
  }
  generateFilm1Database() {
    let grandezza = this.displayMovies.length;
    this.idFilm1 = Math.floor(Math.random() * grandezza) + 0;
    if (this.idFilm1 == this.idFilm2 && this.idFilm1 != grandezza) {
      this.idFilm1++;
    } else if (this.idFilm1 == this.idFilm2 && this.idFilm1 == grandezza) {
      this.idFilm1--;
    }

    for (let i = 0; i < grandezza; i++) {
      if (this.idFilm1 == i) {
        this.film1 = this.displayMovies[i];
        this.film1.idmovie = this.displayMovies[i].idmovie
        this.film1Path = this.displayMovies[i].image_path;
        this.titoloFilm1 = this.film1.title;
      }
    }


  }
  generateFilm2Database() {
    let grandezza = this.displayMovies.length;
    this.idFilm2 = Math.floor(Math.random() * grandezza) + 0;

    if (this.idFilm1 == this.idFilm2 && this.idFilm1 != grandezza) {
      this.idFilm2++;
    } else if (this.idFilm1 == this.idFilm2 && this.idFilm1 == grandezza) {
      this.idFilm2--;
    }

    for (let i = 0; i < grandezza; i++) {
      if (this.idFilm2 == i) {
        this.film2 = this.displayMovies[i];
        this.film2.idmovie = this.displayMovies[i].idmovie
        this.film2Path = this.displayMovies[i].image_path;
        this.titoloFilm2 = this.film2.title;
      }
    }
  }
  pushCustomerVotes(counterCustomers: number, customers: Customers) {
    for (let i = 0; i < counterCustomers; i++) {
      if (this.userId == customers[i].customer_id) {
        this.customersVoting.push(customers[i]);
      }
    }
  }
  voteCheck(ratings: Ratings, customers: Customers, film: MovieDatabaseInterface, ratingService: any) {
    var alreadyCreated = false;
    var counterRatings = this.count(ratings);
    var counterCustomers = this.count(customers);


    var RatingToAdd: Ratings =
    {
      "id": null,
      "movie_id": film.idmovie,
      "rating": 1
    }

    var Customer: Customers =
    {
      "id": null,
      "movie_id": film.idmovie,
      //Da aggiustare con springboot
      "customer_id": this.userId
    }

    // Conta i ratings e controlla se il film votato è stato già aggiunto. Se è stato aggiunto
    // guarda chi ha votato quel film e controlla se l'user id ha già votato quel film


    this.pushCustomerVotes(counterCustomers, customers);

    for (let i = 0; i < counterRatings; i++) {
      if (film.idmovie == ratings[i].movie_id) {
        alreadyCreated = true;
        var found = this.findDoubleMovieId(ratings[i], this.customersVoting);
        if (found == false) {
          this.editRating(ratings[i], Customer, ratingService)
          console.log("Hai votato questo film : " + film.title)
          break
        } if (found) {
          console.log("Hai già votato " + film.title)
          break
        }
      }
      if (alreadyCreated) break;
    }
    if (alreadyCreated == false) {
      this.addRating(RatingToAdd, Customer, ratingService);
      console.log("Hai votato questo film : " + film.title)
    }

  }
}
