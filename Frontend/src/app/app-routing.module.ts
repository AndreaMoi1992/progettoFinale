import { RegisterComponent } from './components/register/register.component';
import { MoviesParseComponent } from './routes/movies-parse/movies-parse.component';
import { MoviesapiComponent } from './routes/moviesapi/moviesapi.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomepageComponent } from './routes/welcomepage/welcomepage.component';


import { DetailsMovieApiComponent } from './routes/details-movie-api/details-movie-api.component';
import { MoviesDatabaseListComponent } from './routes/movies-database-list/movies-database-list.component';
import { MoviesDatabaseDetailsComponent } from './routes/movies-database-details/movies-database-details.component';
import { CommentComponentComponent } from './components/comment-component/comment-component.component';




const routes: Routes = [
  { path: "", redirectTo : '/welcome', pathMatch: 'full' },
  { path: "welcome", component : WelcomepageComponent },
  { path: "dashboard", component : MoviesParseComponent },
  { path: "login", component: LoginPageComponent },
  { path: "movies/Api/List", component: MoviesapiComponent },
  { path: "movie/Api/Details/:id", component: DetailsMovieApiComponent },
  { path: "movies/Database/List", component: MoviesDatabaseListComponent },
  { path: "movies/Database/Details/:id", component: MoviesDatabaseDetailsComponent },
  { path: "register", component: RegisterComponent },
  { path: "CommentComponent", component: CommentComponentComponent },

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
