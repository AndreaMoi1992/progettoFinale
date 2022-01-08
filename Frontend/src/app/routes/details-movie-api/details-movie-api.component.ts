import { TokenStorageService } from './../../jwt-auth/auth/token-storage.service';
import { commentDotnetData } from './../../models/dotnetData.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MovieData } from 'src/app/models/data.model';
import { MovieApiInterface, MovieDatabaseInterface } from 'src/app/models/apiMovie.model';
import { MoviesApiService } from 'src/app/services/moviesapi.service';
import { NgForm } from '@angular/forms';
import { DotnetServiceService } from 'src/app/services/dotnet-service.service';
import { RatingData } from 'src/app/models/rating.model';
import { RatingsService } from 'src/app/services/ratings.service';


@Component({
  selector: 'app-details-movie-api',
  templateUrl: './details-movie-api.component.html',
  styleUrls: ['./details-movie-api.component.css']
})
export class DetailsMovieApiComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dataService: DataService, private apiService: MoviesApiService,
    private ratingService: RatingsService, private dotnetService: DotnetServiceService, private router : Router, public tokenStorage : TokenStorageService) { }

  dataApiEntry: MovieApiInterface;
  dataMovieEntry: MovieDatabaseInterface;

  // USA QUESTO NELL'HTML
  moviesdetails: MovieDatabaseInterface;
  dotnetData: commentDotnetData;
  commentList: Array<commentDotnetData>;
  commentRappresentation: Array<commentDotnetData>;

  // Rating
  ratingData: RatingData;
  vote: any = 0;


  filmPath : string = "https://image.tmdb.org/t/p/w500";
  filmPathHTML :string;

  idpath: number;
  ratedOption : string;

  datiForm: any;
  commento: string;

  viewComments=false;
  moviesDataLoader=false;


  public visualizzaCommento: boolean =false;
  public visualizzaCondizione: boolean =false;

  counterRatingDatabase:number=0;


  ngOnInit(): void {

    // Id movie preso dal path
    this.idpath = this.route.snapshot.params['id'];

    // Calcola il voto corrispondente al film scelto prendendo i dati dal database
    this.findVote();

    // Cerca i dati corrispondenti al film nel database
    this.fetchEntry()

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

      // Conta gli elementi presenti nella tabella del database
      for(let i in this.ratingData.data){
        this.counterRatingDatabase++;
      }

      // Inizializzo un contatore per la votazione del film
      let ratingFilm=0;

      // Confronta il movie id preso nella pagina con quelli corrispondenti alle votazioni nel database
      for(let i=0;i<this.counterRatingDatabase;i++){

        // Se i movie id del film scelto nel path e quello presente nel database sono uguali
        // allora aggiungo la votazione salvata nella tabella
        if(this.idpath==this.ratingData.data[i].movie_id){
          ratingFilm=ratingFilm+this.ratingData.data[i].rating
        }
      }
      // Salvo il voto corrispondente nella variabile corrispondente della pagina html
      this.vote=ratingFilm;
    })

  }

  fetchEntry(){

    // Preleva i dati dal database
    this.apiService.getMovies().subscribe( (res: any ) => {
      this.dataApiEntry = res;
      this.dataMovieEntry = this.dataApiEntry.results;

      // Cerca il film scelto nella pagina precedente tramite l'idpath e ne ricava i dettagli
      for(let i in this.dataMovieEntry){

        // Se l'idpath e l'id movie presente nel database coincidono allora:
        if(this.idpath==this.dataMovieEntry[i].id){

          // Dettagli del film
          this.moviesdetails=this.dataMovieEntry[i];

          // Path dell'immagine corrispondente
          this.filmPathHTML=this.filmPath.concat(this.moviesdetails.backdrop_path);
        }
      }

    })
  }

  delete(){
    this.dataService.deleteEntry(this.idpath)
    .subscribe(data => {
      this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
      this.router.navigate(['/dashboard']);
    });
  }

  // Controlla del tasto per l'inserimento del commento
  changeStatus(){

    this.visualizzaCommento=!this.visualizzaCommento;
    this.visualizzaCondizione=false;

  }

  // Cerca i commenti all'interno della tabella gestita da dotnet
  findComment(){

    // Get
    this.dotnetService.getDotnetDataAll().subscribe( (response : any) => {
      this.commentList = response;

      // Contatore per l'inserimento dei commenti trovati nell'array
      var j=0;

      // Inizializzo un array per salvare i commenti
      this.commentRappresentation=[];

      // Cerca all'interno della tabella Commenti
      for(let i=0; i<this.commentList.length; i++){

        // Se l'idmovie dei film coincidono allora aggiungi il commento corrispondente
        if(this.commentList[i].movieId==this.idpath){
          this.commentRappresentation[j]=this.commentList[i];
          j++;
        }
      }

      // Se sono presenti commenti allora visualizzali nella pagina HTML
      if(this.commentRappresentation.length>0){
        this.viewComments=true;
      }

      // Non mostrare più il caricamento della pagina
      this.moviesDataLoader=true;
    })
  }

  // Carica il commento inserito nel database
  onSubmit(form : NgForm){

    // Inizializza un array di "prova"
    this.dotnetData ={id:1, userId: 2, movieId:13,  body:""}

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
      this.dotnetData.movieId=this.moviesdetails.id;

      // Salva l'user id
      this.dotnetData.userId = this.tokenStorage.userId;

      // Inserisce il commento
      this.dotnetData.body=this.commento;

      // Salvataggio nel database
      this.dotnetService.addDotnetEntry(this.dotnetData).subscribe(response => {

        window.location.reload();

      },
      (err) => {
        //fai qualcosa
      }
      )
    }


  }
}







