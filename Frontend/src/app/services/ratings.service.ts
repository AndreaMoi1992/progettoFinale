import { RatingData, Ratings } from './../models/rating.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  baseURL = 'http://localhost:8000/api/ratings';

  constructor( private http : HttpClient) { }

  getRatingDatabaseData () {
    return this.http.get<RatingData>(this.baseURL)
  }

  getRatingDatabaseEntryById( id ) {
    return this.http.get<RatingData>(this.baseURL + "/" + id)
  }
  getRatingDatabaseEntryByMovieId( id ) {
    return this.http.get<RatingData>(this.baseURL + "/movie_id/" + id)
  }

  addRatingDatabaseEntry = (dataRatingDatabase: Ratings) => {
    return this.http.post<RatingData>(this.baseURL, {
      "movie_id": dataRatingDatabase.movie_id,
      "rating": dataRatingDatabase.rating
    });
  };
  editRatingDatabaseEntry = (dataRatingDatabase: Ratings) => {
    return this.http.put(this.baseURL + '/'+ dataRatingDatabase.id, {
      "movie_id": dataRatingDatabase.movie_id,
      "rating": dataRatingDatabase.rating
    });
  };

}





