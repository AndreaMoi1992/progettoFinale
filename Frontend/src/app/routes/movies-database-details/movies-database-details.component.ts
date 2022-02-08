import { commentDotnetData } from './../../models/dotnetData.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieApiInterface, MovieDatabaseInterface} from 'src/app/models/apiMovie.model';

import { MoviesApiService } from 'src/app/services/moviesapi.service';
import { NgForm } from '@angular/forms';
import { DotnetServiceService } from 'src/app/services/dotnet-service.service';
import { MovieDatabaseServiceService } from 'src/app/services/movie-database-service.service';
import { RatingsService } from 'src/app/services/ratings.service';
import { RatingData, Ratings } from 'src/app/models/rating.model';
import { RatingsDatabaseService } from 'src/app/services/ratingsDatabase.service';
import { TokenStorageService } from '../../jwt-auth/auth/token-storage.service';
import { AuthService } from '../../jwt-auth/auth/auth.service';



@Component({
  selector: 'app-movies-database-details',
  templateUrl: './movies-database-details.component.html',
  styleUrls: ['./movies-database-details.component.css']
})
export class MoviesDatabaseDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: MoviesApiService,
    private moviesDatabaseService: MovieDatabaseServiceService, private ratingService: RatingsDatabaseService, private dotnetService: DotnetServiceService, private router : Router, private tokenStorage: TokenStorageService,private authService: AuthService) { }

  dataApiEntry: MovieApiInterface;
  dataMovieEntry: MovieDatabaseInterface;
  moviesdetails: MovieDatabaseInterface;

  moviesDatabase: Array<MovieDatabaseInterface>;

  dotnetData: commentDotnetData;
  commentList: Array<commentDotnetData>;
  commentRappresentation: Array<commentDotnetData>;
  username:string = "";
  userList: Array<any>;
  commentUsername: Array<string>;

  filmPath : string = "https://image.tmdb.org/t/p/w500";
  filmPathHTML :string;

  idpath: number;
  ratedOption : string;

  // Rating
  ratingData: RatingData;
  data: Ratings;
  vote: any = 0;

  datiForm: any;
  commento: string;

  counter: number=0;

  viewComments=false;
  moviesDataLoader=false;


  public visualizzaCommento: boolean =false;
  public visualizzaCondizione: boolean =false;


  ngOnInit(): void {

    // Id movie preso dal path
    this.idpath = this.route.snapshot.params['id'];

    // Calcola il voto corrispondente al film scelto prendendo i dati dal database
    this.findVote();

    // Cerca i dati corrispondenti al film nel database
    this.fetchEntry();

    // Specchietto per inserimento commento
    this.visualizzaCommento=false;

    // Se la stringa inserita è minore di 20 caratteri viene modificata in true
    this.visualizzaCondizione=false;

    // Schermata di caricamento
    this.moviesDataLoader=true;

    // Cerca nel database se ci sono commenti corrispondenti al movie id considerato
    this.findComment();
  }

  findVote(){
    // Richiama i dati dal database
    this.ratingService.getRatingDatabaseData().subscribe( (res: any ) => {
      this.ratingData = res;

      // Prende le votazioni presenti nel database
      this.data=this.ratingData.data;

      // Conta gli elementi presenti nella tabella del database
      for(let i in this.data){
        this.counter++;
      }

      // Per tutti gli elementi presenti nel database
      for(let i=0; i<this.counter; i++){

        // Se gli elementi presenti nel database sonoo corrispondenti al path
        if(this.data[i].movie_id==this.idpath){

          // aggiorna la votazione
          this.vote= this.vote+this.data[i].rating;
        }
      }
    })

  }

  fetchEntry(){
    // Preleva i dati dal database
    this.moviesDatabaseService.getMovieDatabaseData().subscribe( (res: any ) => {
      this.moviesDatabase = res;

       // Cerca il film scelto nella pagina precedente tramite l'idpath e ne ricava i dettagli
      for(let i in this.moviesDatabase){

        // Se l'idpath e l'id movie presente nel database coincidono allora:
        if(this.idpath==this.moviesDatabase[i].idmovie){

          // Dettagli del film
          this.moviesdetails=this.moviesDatabase[i];

          // Path dell'immagine corrispondente
          this.filmPathHTML=this.moviesdetails.image_path;
        }
      }
    })
  }



  // Controlla del tasto per l'inserimento del commento
  changeStatus(){

    this.visualizzaCommento=!this.visualizzaCommento;
    this.visualizzaCondizione=false;

  }
  // Cerca i commenti all'interno della tabella gestita da dotnet
  findComment() {
    // Get
    this.dotnetService.getDotnetDataAll().subscribe((resDot: any) => {
      this.commentList = resDot;
      this.authService.getAll().subscribe(resSpring => {
        this.userList = resSpring;
        // Contatore per l'inserimento dei commenti trovati nell'array
        var j = 0;
        // Inizializzo un array per salvare i commenti
        this.commentRappresentation = [];
        this.commentUsername = [];
        // Cerca all'interno della tabella Commenti
        for (let i = 0; i < this.commentList.length; i++) {
          // Se l'idmovie dei film coincidono allora aggiungi il commento corrispondente
          if (this.commentList[i].movieId == this.idpath) {
            for (let x = 0; x < this.userList.length; x++) {
              if (this.commentList[i].userId == this.userList[x].id) {
                this.commentUsername[j] = this.userList[x].username
              }
            }
            this.commentRappresentation[j] = this.commentList[i];
            j++;
          }
        }
        // Se sono presenti commenti allora visualizzali nella pagina HTML
        if (this.commentRappresentation.length > 0) {
          this.viewComments = true;
        }
        // Non mostrare più il caricamento della pagina
        this.moviesDataLoader = true;
      })
    })
  }

  // Carica il commento inserito nel database
  onSubmit(form : NgForm){

    // Inizializza un array di "prova"
    this.dotnetData ={id:1,userId:12, movieId:13,  body:""}

    // Salva la stringa inserita nel form
    this.commento=form.form.value.commento;

    // Se il commento inserito ha una lunghezza minore di 20 caratteri
    // mostra la condizione minima di inserimento
    if(this.commento.length<20){
      this.visualizzaCondizione=true;
    }

    // Se il commento inserito è della dimensione corretta
    else{

      // Nascondi l'avviso di dimensione minima
      this.visualizzaCondizione=false;

      // Salva in movie Id
      this.dotnetData.movieId=this.moviesdetails.idmovie;

      // Salva l'user id
      this.dotnetData.userId = this.tokenStorage.userId;

      // Inserisce il commento
      this.dotnetData.body=this.commento;


      this.dotnetService.addDotnetEntry(this.dotnetData).subscribe(response => {

        window.location.reload();

      },
      (err) => {
        //fai qualcosa
      }
      )
    }
  }
  isLoggedIn() {
    return this.tokenStorage.getLoggedIn();
  }
}



