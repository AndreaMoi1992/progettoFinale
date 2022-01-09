import { MovieDatabaseInterface } from './../../models/apiMovie.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MovieApiInterface } from '../../models/apiMovie.model';

import { MovieDatabaseServiceService } from 'src/app/services/movie-database-service.service';
import { ListDatabase } from 'src/app/models/listDatabase.model';
import { RatingData, Ratings } from 'src/app/models/rating.model';
import { RatingsDatabaseService } from 'src/app/services/ratingsDatabase.service';
import { TokenStorageService } from '../../jwt-auth/auth/token-storage.service';

@Component({
  selector: 'app-movies-database-list',
  templateUrl: './movies-database-list.component.html',
  styleUrls: ['./movies-database-list.component.css']
})
export class MoviesDatabaseListComponent implements OnInit {

  moviesDataLoader=false;

  movies : MovieApiInterface;
  resultsApi : MovieDatabaseInterface;

  elementiLista: Array<ListDatabase>=new Array();
  element:ListDatabase

  orderedRatingElementLista: Array<ListDatabase>=new Array();


  ratingData: RatingData;
  data: Ratings;

  counterMovies:number=0;
  counterRatingDatabase:number=0;

  constructor(private ratingService: RatingsDatabaseService, private moviesDatabase: MovieDatabaseServiceService, private router : Router, public tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    this.getMovieListDatabase();

  }

  getMovieListDatabase(){
      //Prende la lista di film presenti nel database
      this.moviesDatabase.getMovieDatabaseData().subscribe( (response : any) => {
        // la salva nella variabile movies, array di interfaccia "MovieApiInterface"
        this.movies = response;
        this.moviesDataLoader=true;
        this.resultsApi = this.movies.results;

        // Recupero le votazioni presenti nella tabella del database adibito alle votazioni
        this.ratingService.getRatingDatabaseData().subscribe( (res: any ) => {
          this.ratingData = res;
          this.data=this.ratingData.data;

          // Conta gli elementi presenti nella tabella del database
          for(let i in this.movies){
            this.counterMovies++;
          }
          // Conta gli elementi presenti nella tabella del database
          for(let i in this.ratingData.data){
            this.counterRatingDatabase++;
          }

          // Inizializzo un array "ListDatabase"
          this.elementiLista[0]={
            title:"",
            backdrop_path:"",
            movieId:0,
            voto:0,
            release_date: ""
          }

          // Inserisce nell'array le informazioni presenti nei film nel database
          for(let i=0;i<this.counterMovies;i++){
            this.elementiLista[i]={
              title:this.movies[i].title,
              backdrop_path:this.movies[i].backdrop_path,
              movieId:this.movies[i].idmovie,
              // Inizialmente il voto è 0 perchè andranno presi nell'altra tabella
              voto:0,
              release_date: this.movies[i].release_date
            }
          }

          // Vengono confrontati i film con la tabella delle votazioni, ogni volta che è presente una votazione
          // viene sommato il voto e poi inserito nel movie id corrispondente e salvato
          for(let i=0;i<this.counterMovies;i++){

            // Contatore per i voti
            let ratingFilm=0;

            // Per ogni film si scorre lungo tutto il database per le corrispondenze
            for(let j=0; j<this.counterRatingDatabase;j++){

              // Se c'è corrispondenza aggiorna la votazione
              if(this.elementiLista[i].movieId==this.ratingData.data[j].movie_id){
                ratingFilm=ratingFilm+this.ratingData.data[j].rating;
              }

              // Salva il voto
              this.elementiLista[i].voto=ratingFilm;
            }
          }

          // Votazioni ordinate in maniera decrescente
          this.orderedRatingElementLista=this.elementiLista.sort((a,b)=> (-a['voto']+b['voto']));

        })
      })
  }

  // Si viene rimandati alla pagina dei dettagli
  goToMovieDatabaseDetails(id){
    this.router.navigateByUrl('/moviesDatabaseDetails/'+ id);
  }

}






