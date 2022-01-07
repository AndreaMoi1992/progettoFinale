import { BehaviorSubject } from 'rxjs';
import { RatingsDatabaseService } from './../../services/ratingsDatabase.service';
import { Customers, CustomerData } from './../../models/customer.model';
import { MovieDatabaseInterface } from './../../models/apiMovie.model';
import { RatingData, Ratings } from './../../models/rating.model';
import { RatingsService } from './../../services/ratings.service';
import { AuthService } from './../../services/auth.service';
import { MoviesApiService } from './../../services/moviesapi.service';

import { Component, OnInit } from '@angular/core';
import { MovieApiInterface } from '../../models/apiMovie.model';
import { MovieDatabaseServiceService } from '../../services/movie-database-service.service';



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

  constructor(private ratingService: RatingsService, public authService: AuthService,
    private moviesApi: MoviesApiService, private moviesDatabaseService: MovieDatabaseServiceService, private ratingServiceDatabase: RatingsDatabaseService) {
    const Choice = sessionStorage.getItem('choice');
    this.choice$ = Choice;



    const UserId = sessionStorage.getItem('customer_id');
    this.userLoggedId$ = UserId;
    if (this.userLoggedId$ == "2") {
      sessionStorage.setItem('customer_id', '2');
    } else if (this.userLoggedId$ == "1") {
      sessionStorage.setItem('customer_id', '1');
    } else {
      sessionStorage.setItem('customer_id', '3');
    }
    var userIdString = sessionStorage.getItem("customer_id"); ///Get value as string
    this.userId = parseInt(userIdString)//Returns userId in number

  }

  ngOnInit(): void {
    this.databaseGeneration();

  }

  databaseGeneration() {

    if (this.choice$ == "api") {
      this.generateFilmsApi();
    }
    if (this.choice$ == "database") {
      this.inserimentoDatabase();
      this.generateFilmsDatabase();
    }
  }


  generateFilmsApi() {
    console.log("API")

    // Fai una get per ottenere la lista dei film dell'api
    this.moviesApi.getMovies().subscribe(response => {
      this.moviesDataLoader = true;
      this.movies = response;
      this.resultsApi = this.movies.results;
      this.counter=this.count(this.resultsApi)

      this.generateFilm1();
      this.generateFilm2();
    },
      error => console.log(error)
    )


  }

  onClickFilm1() {

    this.generateFilm2();

    //Aggiungi votazione al db customers
    // Ricava la lista di ratings dal db
    this.ratingService.getRatingDatabaseData().subscribe((response: RatingData) => {
      // La risposta viene assegnata a ratingData
      this.ratingData = response;
      var ratings = this.ratingData.data
      this.ratingService.getCustomersDatabaseData().subscribe((res: CustomerData) => {
        this.customersData = res;
        var customers = this.customersData.data
        this.voteCheckFilm1(ratings,customers);
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
  onClickFilm2() {


    this.generateFilm1();

    //Aggiungi votazione al db
    // Ricava la lista di ratings dal db
    this.ratingService.getRatingDatabaseData().subscribe((response: RatingData) => {
      // La risposta viene assegnata a ratingData
      this.ratingData = response;
      var ratings = this.ratingData.data
      this.ratingService.getCustomersDatabaseData().subscribe((res: CustomerData) => {
        this.customersData = res;
        var customers = this.customersData.data

       this.voteCheckFilm2(ratings,customers);
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
    console.log("DATABASE")
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

      var counter = 0;
      for (let i in this.resultsApi) {
        counter++;
      }



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

  onClickFilm1Database() {

    this.generateFilm2Database()
    //Aggiungi votazione al db, Funzioni da cambiare quando verranno aggiunte le due tabelle in più perche i movie_id sono diversi anche se i film sono uguali


    // Ricava la lista di ratings dal db
    this.ratingServiceDatabase.getRatingDatabaseData().subscribe((response: RatingData) => {
      // La risposta viene assegnata a ratingData
      this.ratingData = response;
      var ratings = this.ratingData.data
      this.ratingServiceDatabase.getCustomersDatabaseData().subscribe((res: CustomerData) => {
        this.customersData = res;
        var customers = this.customersData.data
        this.voteCheckFilm1Database(ratings,customers);
      }, (err) => {
        console.log(err);
      }
      )
    },
      (err) => {
        console.log(err);
      }
    )
    //sessionStorage.setItem('alreadyCreated', 'no');

  }

  onClickFilm2Database() {
    this.generateFilm1Database()
    //Aggiungi votazione al db, Funzioni da cambiare quando verranno aggiunte le due tabelle in più perche i movie_id sono diversi anche se i film sono uguali
    // Ricava la lista di ratings dal db
    this.ratingServiceDatabase.getRatingDatabaseData().subscribe((response: RatingData) => {
      // La risposta viene assegnata a ratingData
      this.ratingData = response;
      var ratings = this.ratingData.data
      this.ratingServiceDatabase.getCustomersDatabaseData().subscribe((res: CustomerData) => {
        this.customersData = res;
        var customers = this.customersData.data
        this.voteCheckFilm2Database(ratings,customers);
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

  findDoubleMovieId(rating: Ratings, customers: Customers[]) {
    let elementFound = false;
    let count = 0;
    for (let i in customers) {
      count++
    }

    for (let i = 0; i < count; i++) {
      if (customers[i].movie_id === rating.movie_id) {
        return true;
      }
    }
    return elementFound;
  }
  editRating(ratings: Ratings, customers: Customers) {
    ratings.rating++
    this.ratingService.editRatingDatabaseEntry(ratings).subscribe(response => {

    }), err => {
      console.log(err);
    };
    this.ratingService.addCustomerDatabaseEntry(customers).subscribe(response => {
    }), err => {
      console.log(err);
    };
  }
  addRating(rating: Ratings, customers: Customers) {
    this.ratingService.addRatingDatabaseEntry(rating).subscribe(response => {
    }), err => {
      console.log(err);
    };
    this.ratingService.addCustomerDatabaseEntry(customers).subscribe(response => {
    }), err => {
      console.log(err);
    };
  }
  editRatingDatabase(ratings: Ratings, customers: Customers) {
    ratings.rating++
    this.ratingServiceDatabase.editRatingDatabaseEntry(ratings).subscribe(response => {

    }), err => {
      console.log(err);
    };
    this.ratingServiceDatabase.addCustomerDatabaseEntry(customers).subscribe(response => {
    }), err => {
      console.log(err);
    };
  }
  addRatingDatabase(rating: Ratings, customers: Customers) {
    this.ratingServiceDatabase.addRatingDatabaseEntry(rating).subscribe(response => {
    }), err => {
      console.log(err);
    };
    this.ratingServiceDatabase.addCustomerDatabaseEntry(customers).subscribe(response => {
    }), err => {
      console.log(err);
    };
  }

  count(itemToCount:any){
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
  generateFilm1Database(){
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
        this.film1.idmovie = this.displayMovies[i].id
        this.film1Path = this.displayMovies[i].image_path;
        this.titoloFilm1 = this.film1.title;
      }
    }

  }
  generateFilm2Database(){
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
        this.film2.idmovie = this.displayMovies[i].id
        this.film2Path = this.displayMovies[i].image_path;
        this.titoloFilm2 = this.film2.title;
      }
    }
  }
  pushCustomerVotes(counterCustomers: number, customers : Customers){
    for (let i = 0; i < counterCustomers; i++) {
      if (this.userId == customers[i].customer_id) {
        this.customersVoting.push(customers[i]);
      }
    }
  }
  voteCheckFilm1(ratings : Ratings,customers: Customers){
    var alreadyCreated = false;
    var counterRatings = this.count(ratings);
    var counterCustomers = this.count(customers);


    var RatingToAdd: Ratings =
    {
      "id": null,
      "movie_id": this.film1.idmovie,
      "rating": 1
    }

    var Customer: Customers =
    {
      "id": null,
      "movie_id": this.film1.idmovie,
      //Da aggiustare con springboot
      "customer_id": this.userId
    }

    // Conta i ratings e controlla se il film votato è stato già aggiunto. Se è stato aggiunto
    // guarda chi ha votato quel film e controlla se l'user id ha già votato quel film


    this.pushCustomerVotes(counterCustomers,customers);

    for (let i = 0; i < counterRatings; i++) {
      if (this.film1.idmovie == ratings[i].movie_id) {
        alreadyCreated = true;
        var found = this.findDoubleMovieId(ratings[i], this.customersVoting);
        if (found == false) {
          this.editRating(ratings[i], Customer)
          console.log("Hai votato questo film : " + this.film1.title)
          break
        } if (found) {
          console.log("Hai già votato " + this.film1.title)
          break
        }
      }
      if (alreadyCreated) break;
    }
    if (alreadyCreated == false) {
      this.addRating(RatingToAdd, Customer);
      console.log("Hai votato questo film : " + this.film1.title)
    }

  }
  voteCheckFilm2(ratings : Ratings,customers: Customers){
    var alreadyCreated: boolean = false;
    var counterRatings = this.count(ratings);
    var counterCustomers = this.count(customers);
    var RatingToAdd: Ratings =
    {
      "id": null,
      "movie_id": this.film2.idmovie,
      "rating": 1
    }
    var Customer: Customers =
    {
      "id": null,
      "movie_id": this.film2.idmovie,
      //Da aggiustare con springboot
      "customer_id": this.userId
    }

    this.pushCustomerVotes(counterCustomers,customers);
    for (let i = 0; i < counterRatings; i++) {
      if (this.film2.idmovie == ratings[i].movie_id) {
        alreadyCreated = true;
        var found = this.findDoubleMovieId(ratings[i], this.customersVoting);
        if (found == false) {
          this.editRating(ratings[i], Customer)
          console.log("Hai votato questo film : " + this.film2.title)
          break
        } if (found) {
          console.log("Hai già votato " + this.film2.title)
          break
        }
      }
      if (alreadyCreated) break;
    }
    if (alreadyCreated == false) {
      this.addRating(RatingToAdd, Customer);
      console.log("Hai votato questo film : " + this.film2.title)
    }

  }
  voteCheckFilm1Database(ratings : Ratings,customers: Customers){
    var alreadyCreated = false;
    var counterRatings = this.count(ratings);
    var counterCustomers = this.count(customers);


    var RatingToAdd: Ratings =
    {
      "id": null,
      "movie_id": this.film1.idmovie,
      "rating": 1
    }

    var Customer: Customers =
    {
      "id": null,
      "movie_id": this.film1.idmovie,
      //Da aggiustare con springboot
      "customer_id": this.userId
    }

    // Conta i ratings e controlla se il film votato è stato già aggiunto. Se è stato aggiunto
    // guarda chi ha votato quel film e controlla se l'user id ha già votato quel film


    this.pushCustomerVotes(counterCustomers,customers);

    for (let i = 0; i < counterRatings; i++) {
      if (this.film1.idmovie == ratings[i].movie_id) {
        alreadyCreated = true;
        var found = this.findDoubleMovieId(ratings[i], this.customersVoting);
        if (found == false) {
          this.editRatingDatabase(ratings[i], Customer)
          console.log("Hai votato questo film : " + this.film1.title)
          break
        } if (found) {
          console.log("Hai già votato " + this.film1.title)
          break
        }
      }
      if (alreadyCreated) break;
    }
    if (alreadyCreated == false) {
      this.addRatingDatabase(RatingToAdd, Customer);
      console.log("Hai votato questo film : " + this.film1.title)
    }

  }
  voteCheckFilm2Database(ratings : Ratings,customers: Customers){
    var alreadyCreated: boolean = false;
    var counterRatings = this.count(ratings);
    var counterCustomers = this.count(customers);
    var RatingToAdd: Ratings =
    {
      "id": null,
      "movie_id": this.film2.idmovie,
      "rating": 1
    }
    var Customer: Customers =
    {
      "id": null,
      "movie_id": this.film2.idmovie,
      //Da aggiustare con springboot
      "customer_id": this.userId
    }

    this.pushCustomerVotes(counterCustomers,customers);
    for (let i = 0; i < counterRatings; i++) {
      if (this.film2.idmovie == ratings[i].movie_id) {
        alreadyCreated = true;
        var found = this.findDoubleMovieId(ratings[i], this.customersVoting);
        if (found == false) {
          this.editRatingDatabase(ratings[i], Customer)
          console.log("Hai votato questo film : " + this.film2.title)
          break
        } if (found) {
          console.log("Hai già votato " + this.film2.title)
          break
        }
      }
      if (alreadyCreated) break;
    }
    if (alreadyCreated == false) {
      this.addRatingDatabase(RatingToAdd, Customer);
      console.log("Hai votato questo film : " + this.film2.title)

    }

  }
}
