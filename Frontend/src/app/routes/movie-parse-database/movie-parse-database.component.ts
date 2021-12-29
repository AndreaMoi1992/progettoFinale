import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { MoviesApiService } from './../../services/moviesapi.service';
import { MovieDatabaseInterface, ResultInterface } from './../../models/apiMovie.model';
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
  resultsApi : ResultInterface;
  movieDatabase : MovieDatabaseInterface;

  displayMovies : MovieDatabaseInterface [];

  film1 : MovieDatabaseInterface;
  film2 : MovieDatabaseInterface;
  filmPath : string = "https://image.tmdb.org/t/p/w500";
  film1Path : string;
  film2Path : string;

  constructor(public authService: AuthService ,public moviesDatabaseService: MovieDatabaseServiceService,private moviesApi: MoviesApiService, private router : Router) { }

  ngOnInit(): void {

    // Se si cambia l'API si deve togliere il commento

    //this.addFilmDatabase();

    this.generateFilms();

  }

  generateFilms(){

    var counter = 0;
    var idFilm1;
    var idFilm2;

    this.moviesDatabaseService.getMovieDatabaseData().subscribe(response =>{
      this.moviesDataLoader=true;
      this.displayMovies=response;

      let grandezza= this.displayMovies.length;
      idFilm1 = Math.floor(Math.random() * grandezza) + 0 ;

      for(let i=0;i<grandezza;i++){
        if(idFilm1 == i){
          this.film1 = this.displayMovies[i];
          this.film1Path =this.displayMovies[i].image_path;
        }
      }

      console.log(this.film1Path);
      console.log(this.film1);

      idFilm2 = Math.floor(Math.random() * grandezza) + 0 ;

      if(idFilm1 == idFilm2 && idFilm1 != counter){
        idFilm2++;
      }else if(idFilm1 == grandezza){
        idFilm2--;
      }

      for(let i=0;i<grandezza;i++){
        if(idFilm2 == i){
          this.film2 = this.displayMovies[i];
          this.film2Path =this.displayMovies[i].image_path
        }
      }
    })
  }

  addFilmDatabase(){

    var counter = 0;
    this.moviesApi.getMarvelList().subscribe(response=> {
      this.movies = response;
      this.resultsApi = this.movies.results;
      console.log(this.resultsApi)

      console.log(this.resultsApi[0]);
      for(let i in this.resultsApi){
        counter++;
      }

      for(let i=0; i<counter; i++){

        this.imageURL=this.filmPath.concat(this.resultsApi[i].backdrop_path);

        this.movieDatabase=this.resultsApi[i];
        this.movieDatabase.image_path=this.imageURL;

        console.log(this.movieDatabase);

        this.moviesDatabaseService.addMovieDatabaseEntry(this.movieDatabase).subscribe(response => {
          console.log(response);
          //this.router.navigate(['/dashboard']);
        },
        (err) => {
          //fai qualcosa
        }
        )
      }
    })
  }
}

