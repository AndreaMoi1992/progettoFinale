import { MovieDatabaseInterface } from './../../models/apiMovie.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MovieApiInterface } from '../../models/apiMovie.model';

import { MovieDatabaseServiceService } from 'src/app/services/movie-database-service.service';

@Component({
  selector: 'app-movies-database-list',
  templateUrl: './movies-database-list.component.html',
  styleUrls: ['./movies-database-list.component.css']
})
export class MoviesDatabaseListComponent implements OnInit {

  moviesDataLoader=false;

  movies : MovieApiInterface;
  resultsApi : MovieDatabaseInterface;


  constructor( private moviesDatabase: MovieDatabaseServiceService, private router : Router) { }

  ngOnInit(): void {

    this.getMovieListDatabase();

  }

  getMovieListDatabase(){

      this.moviesDatabase.getMovieDatabaseData().subscribe( (response : any) => {
        this.movies = response;
        this.moviesDataLoader=true;
        this.resultsApi = this.movies.results;
        console.log(this.movies)


      })

  }


  goToMovieDatabaseDetails(id){
    this.router.navigateByUrl('/moviesDatabaseDetails/'+ id);
  }

}






