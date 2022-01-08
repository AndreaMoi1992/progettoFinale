import { commentDotnetData } from './../../models/dotnetData.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MovieData } from 'src/app/models/data.model';
import { MovieApiInterface, MovieDatabaseInterface } from 'src/app/models/apiMovie.model';
import { MoviesApiService } from 'src/app/services/moviesapi.service';
import { NgForm } from '@angular/forms';
import { DotnetServiceService } from 'src/app/services/dotnet-service.service';
import { RatingData } from 'src/app/models/rating.model';
import { RatingsService } from 'src/app/services/ratings.service';


@Component({
  selector: 'app-details-movie-api',
  templateUrl: './details-movie-api.component.html',
  styleUrls: ['./details-movie-api.component.css']
})
export class DetailsMovieApiComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dataService: DataService, private apiService: MoviesApiService,
    private ratingService: RatingsService, private dotnetService: DotnetServiceService, private router : Router) { }

  dataApiEntry: MovieApiInterface;
  dataMovieEntry: MovieDatabaseInterface;

  // USA QUESTO NELL'HTML
  moviesdetails: MovieDatabaseInterface;
  dotnetData: commentDotnetData;
  commentList: Array<commentDotnetData>;
  commentRappresentation: Array<commentDotnetData>;

  // Rating
  ratingData: RatingData;
  vote: any = 0;


  filmPath : string = "https://image.tmdb.org/t/p/w500";
  filmPathHTML :string;

  idpath: number;
  ratedOption : string;

  datiForm: any;
  commento: string;

  viewComments=false;
  moviesDataLoader=false;


  public visualizzaCommento: boolean =false;
  public visualizzaCondizione: boolean =false;

  counterRatingDatabase:number=0;


  ngOnInit(): void {

    this.idpath = this.route.snapshot.params['id'];
    this.findVote();
    this.fetchEntry()
    this.visualizzaCommento=false;
    this.visualizzaCondizione=false;
    this.moviesDataLoader=true;
    this.findComment();


  }

  findVote(){
    this.ratingService.getRatingDatabaseData().subscribe( (res: any ) => {
      this.ratingData = res;

      // Conta gli elementi presenti nella tabella del database
      for(let i in this.ratingData.data){
        this.counterRatingDatabase++;
      }
      console.log(this.counterRatingDatabase);

      let ratingFilm=0;
      for(let i=0;i<this.counterRatingDatabase;i++){
        if(this.idpath==this.ratingData.data[i].movie_id){
          ratingFilm=ratingFilm+this.ratingData.data[i].rating
        }
      }
      this.vote=ratingFilm;
    })

  }

  fetchEntry(){
    this.apiService.getMovies().subscribe( (res: any ) => {
      this.dataApiEntry = res;
      this.dataMovieEntry = this.dataApiEntry.results;

      for(let i in this.dataMovieEntry){
        if(this.idpath==this.dataMovieEntry[i].id){
          this.moviesdetails=this.dataMovieEntry[i];
          this.filmPathHTML=this.filmPath.concat(this.moviesdetails.backdrop_path);
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

      this.dotnetData.movieId=this.moviesdetails.id;

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







