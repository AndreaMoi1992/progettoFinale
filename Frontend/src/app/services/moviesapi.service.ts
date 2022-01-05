import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieApiInterface } from '../models/apiMovie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  private baseURL = 'https://api.themoviedb.org/4/';
  private apiKey = "2b2766b0cfd098a794608333b59c9e3e";

  constructor( private http : HttpClient) { }

  getMovies(){
      return this.http.get<MovieApiInterface>(this.baseURL+"list/2?api_key="+this.apiKey);
  }
  getMarvelList(){
    return this.http.get<MovieApiInterface>(this.baseURL+"list/1?api_key="+this.apiKey);
  }


}
