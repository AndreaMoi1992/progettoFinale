
import { Customers, CustomerData } from './../models/customer.model';
import { RatingData, Ratings } from './../models/rating.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RatingsDatabaseService {

  baseRatingsURL = 'http://localhost:8000/api/rating_dbs';
  baseCustomersURL = 'http://localhost:8000/api/customer_dbs';

  constructor( private http : HttpClient) { }

  getRatingDatabaseData () {
    return this.http.get<RatingData>(this.baseRatingsURL)
  }

  getRatingDatabaseEntryById( id ) {
    return this.http.get<RatingData>(this.baseRatingsURL + "/" + id)
  }
  getRatingDatabaseEntryByMovieId( id ) {
    return this.http.get<RatingData>(this.baseRatingsURL + "/movie_id/" + id)
  }

  addRatingDatabaseEntry = (dataRatingDatabase: Ratings) => {
    return this.http.post<RatingData>(this.baseRatingsURL, {
      "movie_id": dataRatingDatabase.movie_id,
      "rating": dataRatingDatabase.rating
    });
  };
  editRatingDatabaseEntry = (dataRatingDatabase: Ratings) => {
    return this.http.put(this.baseRatingsURL + '/'+ dataRatingDatabase.id, {
      "movie_id": dataRatingDatabase.movie_id,
      "rating": dataRatingDatabase.rating
    });
  };


  getCustomersDatabaseData () {
    return this.http.get<CustomerData>(this.baseCustomersURL)
  }
  addCustomerDatabaseEntry = (dataCustomerDatabase: Customers) => {
    return this.http.post<CustomerData>(this.baseCustomersURL, {
      "customer_id": dataCustomerDatabase.customer_id,
      "movie_id": dataCustomerDatabase.movie_id,

    });
  };


}





