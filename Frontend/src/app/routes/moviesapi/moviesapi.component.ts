import { MovieDatabaseInterface } from './../../models/apiMovie.model';

import { MoviesApiService } from './../../services/moviesapi.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MovieApiInterface } from '../../models/apiMovie.model';
import { RatingsService } from 'src/app/services/ratings.service';
import { RatingData, Ratings } from 'src/app/models/rating.model';
import { ListDatabase } from 'src/app/models/listDatabase.model';
import { TokenStorageService } from '../../jwt-auth/auth/token-storage.service';


@Component({
  selector: 'app-moviesapi',
  templateUrl: './moviesapi.component.html',
  styleUrls: ['./moviesapi.component.css']
})
export class MoviesapiComponent implements OnInit {

  moviesDataLoader=false;

  movies : MovieApiInterface;
  resultsApi : MovieDatabaseInterface;

  // Rating
  ratingData: RatingData;
  vote: any = 0;

  data: Ratings;

  elementiLista: Array<ListDatabase>=new Array();
  orderedRatingElementLista: Array<ListDatabase>=new Array();

  counterApiMovies:number=0;
  counterApiRatings:number=0;

  constructor(private ratingService: RatingsService, private moviesApi: MoviesApiService, private router : Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    this.findApiFilms()

  }



  findApiFilms(){
    this.moviesApi.getMovies().subscribe(response => {
      this.moviesDataLoader=true;
      this.movies = response;
      this.resultsApi = this.movies.results;

      // Recupero le votazioni presenti nella tabella del database adibito alle votazioni
      this.ratingService.getRatingDatabaseData().subscribe( (res: any ) => {
        this.ratingData = res;
        this.data=this.ratingData.data;

        // Conta gli elementi presenti nella tabella delle votazioni
        for(let i in this.resultsApi){
          this.counterApiMovies++;
        }

        // Conta gli elementi presenti nella tabella delle votazioni
        for(let i in this.ratingData.data){
          this.counterApiRatings++;
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
        for(let i=0;i<this.counterApiMovies;i++){
          this.elementiLista[i]={
            title:this.resultsApi[i].title,
            backdrop_path:this.resultsApi[i].backdrop_path,
            movieId:this.resultsApi[i].id,
            // Inizialmente il voto è 0 perchè andranno presi nell'altra tabella
            voto:0,
            release_date: this.resultsApi[i].release_date
          }
        }

        // Vengono confrontati i film con la tabella delle votazioni, ogni volta che è presente una votazione
        // viene sommato il voto e poi inserito nel movie id corrispondente e salvato
        for(let i=0;i<this.counterApiMovies;i++){
          let ratingFilm=0;
          for(let j=0; j<this.counterApiRatings;j++){
            if(this.elementiLista[i].movieId==this.ratingData.data[j].movie_id){
              ratingFilm=ratingFilm+this.ratingData.data[j].rating;
            }
          this.elementiLista[i].voto=ratingFilm;
          }
        }

        // Votazioni ordinate in maniera decrescente
        this.orderedRatingElementLista=this.elementiLista.sort((a,b)=> (-a['voto']+b['voto']));
      })
    })

  }

  goToMovieDetails(id){
    this.router.navigateByUrl('/movie/Api/Details/'+ id);
  }
  isLoggedIn() {
    return this.tokenStorage.getLoggedIn();
  }


}
