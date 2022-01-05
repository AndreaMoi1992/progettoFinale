import { MovieDatabaseInterface } from './../../models/apiMovie.model';

import { MoviesApiService } from './../../services/moviesapi.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MovieApiInterface } from '../../models/apiMovie.model';
import { RatingsService } from 'src/app/services/ratings.service';
import { RatingData } from 'src/app/models/rating.model';


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

  constructor(private ratingService: RatingsService, private moviesApi: MoviesApiService, private router : Router) { }

  ngOnInit(): void {
    this.findApiFilms()
    

  }



  findApiFilms(){
    this.moviesApi.getMovies().subscribe(response => {
      this.moviesDataLoader=true;
      this.movies = response;
      this.resultsApi = this.movies.results;
    },
    error => console.log(error)
    )

  }

  goToMovieDetails(id){
    this.router.navigateByUrl('/movieApiDetails/'+ id);
  }


}
