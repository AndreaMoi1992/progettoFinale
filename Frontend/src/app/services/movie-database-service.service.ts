import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDatabaseInterface } from '../models/apiMovie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieDatabaseServiceService {

  baseMovieDatabaseURL = 'http://localhost:3000/movieDatabase';

  constructor( private http : HttpClient) { }

  getMovieDatabaseData () {
    return this.http.get<Array<MovieDatabaseInterface>>(this.baseMovieDatabaseURL)
  }

  getMovieDatabaseEntryById( id ) {
    return this.http.get<MovieDatabaseInterface>(this.baseMovieDatabaseURL + "/" + id)
  }

  addMovieDatabaseEntry = (dataMovieDatabase: MovieDatabaseInterface) => {
    return this.http.post<MovieDatabaseInterface>(this.baseMovieDatabaseURL, {

      "backdrop_path": dataMovieDatabase.backdrop_path,
      "idmovie": dataMovieDatabase.idmovie,
      "media_type": dataMovieDatabase.media_type,
      "original_language": dataMovieDatabase.original_language,
      "overview": dataMovieDatabase.overview,
      "popularity": dataMovieDatabase.popularity,
      "release_date": dataMovieDatabase.release_date,
      "title": dataMovieDatabase.title,
      "video": dataMovieDatabase.video,
      "image_path": dataMovieDatabase.image_path,
    });
  };



  deleteMovieDatabaseEntry( id ){
    return this.http.delete(this.baseMovieDatabaseURL + "/" + id)
  }

  editMovieDatabaseEntry = (dataMovieDatabase: MovieDatabaseInterface) => {
    return this.http.put(this.baseMovieDatabaseURL + '/' + dataMovieDatabase.id, {
      "backdrop_path": dataMovieDatabase.backdrop_path,
      "idmovie": dataMovieDatabase.idmovie,
      "media_type": dataMovieDatabase.media_type,
      "original_language": dataMovieDatabase.original_language,
      "overview": dataMovieDatabase.overview,
      "popularity": dataMovieDatabase.popularity,
      "release_date": dataMovieDatabase.release_date,
      "title": dataMovieDatabase.title,
      "video": dataMovieDatabase.video,
      "image_path": dataMovieDatabase.image_path,
    });
  };
}





