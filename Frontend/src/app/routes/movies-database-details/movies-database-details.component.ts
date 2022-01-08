import { commentDotnetData } from './../../models/dotnetData.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MovieData } from 'src/app/models/data.model';
import { MovieApiInterface, MovieDatabaseInterface} from 'src/app/models/apiMovie.model';

import { MoviesApiService } from 'src/app/services/moviesapi.service';
import { NgForm } from '@angular/forms';
import { DotnetServiceService } from 'src/app/services/dotnet-service.service';
import { MovieDatabaseServiceService } from 'src/app/services/movie-database-service.service';
import { RatingsService } from 'src/app/services/ratings.service';
import { RatingData, Ratings } from 'src/app/models/rating.model';
import { RatingsDatabaseService } from 'src/app/services/ratingsDatabase.service';



@Component({
  selector: 'app-movies-database-details',
  templateUrl: './movies-database-details.component.html',
  styleUrls: ['./movies-database-details.component.css']
})
export class MoviesDatabaseDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dataService: DataService, private apiService: MoviesApiService,
    private moviesDatabaseService: MovieDatabaseServiceService, private ratingService: RatingsDatabaseService, private dotnetService: DotnetServiceService, private router : Router) { }

  dataApiEntry: MovieApiInterface;
  dataMovieEntry: MovieDatabaseInterface;
  moviesdetails: MovieDatabaseInterface;

  moviesDatabase: Array<MovieDatabaseInterface>;

  dotnetData: commentDotnetData;
  commentList: Array<commentDotnetData>;
  commentRappresentation: Array<commentDotnetData>;


  filmPath : string = "https://image.tmdb.org/t/p/w500";
  filmPathHTML :string;

  idpath: number;
  ratedOption : string;

  // Rating
  ratingData: RatingData;
  data: Ratings;
  vote: any = 0;

  datiForm: any;
  commento: string;

  counter: number=0;

  viewComments=false;
  moviesDataLoader=false;


  public visualizzaCommento: boolean =false;
  public visualizzaCondizione: boolean =false;


  ngOnInit(): void {

    this.idpath = this.route.snapshot.params['id'];
    this.findVote();
    this.fetchEntry();
    this.visualizzaCommento=false;
    this.visualizzaCondizione=false;
    this.moviesDataLoader=true;
    this.findComment();


  }

  findVote(){
    this.ratingService.getRatingDatabaseData().subscribe( (res: any ) => {
      this.ratingData = res;

      this.data=this.ratingData.data;

      for(let i in this.data){
        this.counter++;

      }
      for(let i=0; i<this.counter; i++){

        if(this.data[i].movie_id==this.idpath){
          this.vote= this.vote+this.data[i].rating;
        }
      }
    })

  }

  fetchEntry(){
    this.moviesDatabaseService.getMovieDatabaseData().subscribe( (res: any ) => {
      this.moviesDatabase = res;

      for(let i in this.moviesDatabase){
        if(this.idpath==this.moviesDatabase[i].idmovie){
          this.moviesdetails=this.moviesDatabase[i];
          this.filmPathHTML=this.moviesdetails.image_path;
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

  changeStatus(){

    this.visualizzaCommento=!this.visualizzaCommento;
    this.visualizzaCondizione=false;

  }

  findComment(){
      this.dotnetService.getDotnetDataAll().subscribe( (response : any) => {
        this.commentList = response;

        var j=0;

        this.commentRappresentation=[];

        for(let i=0; i<this.commentList.length; i++){

          if(this.commentList[i].movieId==this.idpath){
            this.commentRappresentation[j]=this.commentList[i];
            j++;

          }

        }

        if(this.commentRappresentation.length>0){
          this.viewComments=true;
        }
        this.moviesDataLoader=true;
      })

  }

  onSubmit(form : NgForm){

    this.dotnetData ={id:1, userId:12, movieId:13,  body:""}

    this.commento=form.form.value.commento;

    if(this.commento.length<20){
      this.visualizzaCondizione=true;
    }
    else{

      this.visualizzaCondizione=false;

      this.dotnetData.movieId=this.moviesdetails.idmovie;

      this.dotnetData.userId=666;
      this.dotnetData.body=this.commento;


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



