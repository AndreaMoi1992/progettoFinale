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
  ricaricaPagina: boolean =false;
  verificaDatabase: Array<MovieDatabaseInterface>;
  displayMovies : MovieDatabaseInterface [];
  imageURL: string;
  movieDatabase : MovieDatabaseInterface;

  //Variabile a cui viene assegnata la libreria di movies dell'api
  movies: MovieApiInterface;
  //Variabile a cui vengono assegnati i movies dell'api
  resultsApi: MovieDatabaseInterface;
  //Variabile a cui viengono assegnati i ratings dei gilm
  ratingData: RatingData;
  customersData: CustomerData;

  film1: MovieDatabaseInterface;
  film2: MovieDatabaseInterface;
  filmPath: string = "https://image.tmdb.org/t/p/w500";
  film1Path: string;
  film2Path: string;


  choice$: string;
  public userLoggedId$: string;
  public userId : number;


  titoloFilm1: string;
  titoloFilm2: string;

  counter: number = 0;
  idFilm1: number;
  idFilm2: number;

  constructor(private ratingService: RatingsService, public authService: AuthService,
    private moviesApi: MoviesApiService,private moviesDatabaseService: MovieDatabaseServiceService,private ratingServiceDatabase: RatingsDatabaseService) {
    const Choice = sessionStorage.getItem('choice');
    this.choice$ = Choice;

    const UserId = sessionStorage.getItem('customer_id');
    this.userLoggedId$ = UserId;
    if(this.userLoggedId$ == "2"){
      sessionStorage.setItem('customer_id', '2');
    }else{
      sessionStorage.setItem('customer_id', '1');
    }
    var userIdString = sessionStorage.getItem("customer_id"); ///Get value as string
    this.userId = parseInt(userIdString)//Returns userId in number

  }

  ngOnInit(): void {
    this.databaseGeneration();
  }

  databaseGeneration() {

    if(this.choice$=="api"){
      this.generateFilmsApi();
    }
    if(this.choice$=="database"){
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
      console.log(this.movies);

      this.resultsApi = this.movies.results;


      //Conta dei film all'interno dell'array
      for (let i in this.resultsApi) {
        this.counter++;
      }

      // Generazione casuale dell'id del primo film
      this.idFilm1 = Math.floor(Math.random() * this.counter) + 0;


      for (let i = 0; i < this.counter; i++) {
        // Se nell'array dell'api c'è un indice uguale all'id del film generato
        if (this.idFilm1 == i) {
          // film1 è uguale al film in quella posizione
          this.film1 = this.resultsApi[i];
          this.film1Path = this.filmPath.concat(this.resultsApi[i].backdrop_path);
          this.titoloFilm1 = this.film1.title;
        }
      }

      // Generazione casuale dell'id del secondo film
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
          this.film2Path = this.filmPath.concat(this.resultsApi[i].backdrop_path);
          this.titoloFilm2 = this.film2.title;
        }
      }
    },
      error => console.log(error)
    )


  }

  onClickFilm1() {

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
        this.film2Path = this.filmPath.concat(this.resultsApi[i].backdrop_path);
        this.titoloFilm2 = this.film2.title;
      }
    }

    //Aggiungi votazione al db customers
    var alreadyCreated: boolean = false;

    // Ricava la lista di ratings dal db
    this.ratingService.getRatingDatabaseData().subscribe((response: any) => {
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
        "customer_id": this.userId
      }

      for (let i in this.ratingData.data) {
        counter++
      }
      for (let i = 0; i < counter; i++) {
        if (counter > 0 && this.film1.id == this.ratingData.data[i].movie_id) {
          alreadyCreated = true;
          this.ratingData.data[i].rating++
          this.ratingService.editRatingDatabaseEntry(this.ratingData.data[i]).subscribe(response => {
            this.ratingService.addCustomerDatabaseEntry(Customer).subscribe(response => {
            }), err => {
              console.log(err);
            };
          }), err => {
            console.log(err);
          };
        }
      }
      if (alreadyCreated == false) {
        this.ratingService.addRatingDatabaseEntry(RatingToAdd).subscribe(response => {
          this.ratingService.addCustomerDatabaseEntry(Customer).subscribe(response => {
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
  onClickFilm2() {


    this.idFilm1 = Math.floor(Math.random() * this.counter) + 0;

    if (this.idFilm2 == this.idFilm1 && this.idFilm2 != this.counter) {
      this.idFilm1++;
    } else if (this.idFilm1 == this.counter) {
      this.idFilm1--;
    }
    for (let i = 0; i < this.counter; i++) {
      if (this.idFilm1 == i) {
        this.film1 = this.resultsApi[i];
        this.film1Path = this.filmPath.concat(this.resultsApi[i].backdrop_path);
        this.titoloFilm1 = this.film1.title;
      }
    }



    //Aggiungi votazione al db
    var alreadyCreated: boolean = false;
    this.ratingService.getRatingDatabaseData().subscribe((response: any) => {
      this.ratingData = response;

      var counter = 0;


      var Customer: Customers =
      {
        "id": null,
        //Da aggiustare con springboot
        "customer_id": this.userId,
        "movie_id": this.film2.id,

      }

      // Rating da aggiungere se ancora il film non è stato votato
      var RatingToAdd: Ratings =
      {
        "id": null,
        "movie_id": this.film2.id,
        "rating": 1
      }



      for (let i in this.ratingData.data) {
        counter++
      }
      for (let i = 0; i < counter; i++) {
        if (counter > 0 && this.film2.id == this.ratingData.data[i].movie_id) {
          alreadyCreated = true;
          this.ratingData.data[i].rating++
          this.ratingService.editRatingDatabaseEntry(this.ratingData.data[i]).subscribe(response => {
            this.ratingService.addCustomerDatabaseEntry(Customer).subscribe(response => {
            }), err => {
              console.log(err);
            };

          }), err => {
            console.log(err);
          };
        }
      }
      if (alreadyCreated == false) {
        this.ratingService.addRatingDatabaseEntry(RatingToAdd).subscribe(response => {
          this.ratingService.addCustomerDatabaseEntry(Customer).subscribe(response => {
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
  generateFilmsDatabase(){


    console.log("DATABASE")
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

  onClickFilm1Database(){

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
        "customer_id": this.userId
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

  onClickFilm2Database(){

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
        "customer_id": this.userId
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
