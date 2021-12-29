import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MovieData } from 'src/app/models/data.model';
import { MovieApiInterface, ResultInterface } from 'src/app/models/apiMovie.model';
import { ApiService } from 'src/app/services/api.service';
import { MoviesApiService } from 'src/app/services/moviesapi.service';
import { NgForm } from '@angular/forms';
import { DotnetServiceService } from 'src/app/services/dotnet-service.service';
import { commentDotnetData } from 'src/app/models/dotnetData.model';

@Component({
  selector: 'app-details-movie-api',
  templateUrl: './details-movie-api.component.html',
  styleUrls: ['./details-movie-api.component.css']
})
export class DetailsMovieApiComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dataService: DataService, private apiService: MoviesApiService,
    private dotnetService: DotnetServiceService, private router : Router) { }

  dataApiEntry: MovieApiInterface;
  dataMovieEntry: ResultInterface;
  moviesdetails: ResultInterface;
  dotnetData: commentDotnetData;


  filmPath : string = "https://image.tmdb.org/t/p/w500";
  filmPathHTML :string;

  idpath: number;
  ratedOption : string;

  datiForm: any;
  commento: string;

  moviesDataLoader=false;


  public visualizzaCommento: boolean =false;
  public visualizzaCondizione: boolean =false;


  ngOnInit(): void {
    this.idpath = this.route.snapshot.params['id'];
    this.fetchEntry()
    this.visualizzaCommento=false;
    this.visualizzaCondizione=false;
    this.moviesDataLoader=true;

  }

  fetchEntry(){
    this.apiService.getMarvelList().subscribe( (res: any ) => {
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







