import { RegisterComponent } from './components/register/register.component';
import { MoviesParseComponent } from './routes/movies-parse/movies-parse.component';
import { MoviesapiComponent } from './routes/moviesapi/moviesapi.component';
import { GenrepipePipe } from './pipes/genrepipe/genrepipe.pipe';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component'
import { AddComponent } from './routes/add/add.component';
import { DetailsComponent } from './routes/details/details.component';
import { EditComponent } from './routes/edit/edit.component';
import { WelcomepageComponent } from './routes/welcomepage/welcomepage.component';
import { FilterbygenreComponent } from './routes/filterbygenre/filterbygenre.component';

import { DetailsMovieApiComponent } from './routes/details-movie-api/details-movie-api.component';
import { MoviesDatabaseListComponent } from './routes/movies-database-list/movies-database-list.component';
import { MoviesDatabaseDetailsComponent } from './routes/movies-database-details/movies-database-details.component';



const routes: Routes = [
  { path: "", redirectTo : '/welcome', pathMatch: 'full' },
  { path: "welcome", component : WelcomepageComponent },
  { path: "dashboard", component : DashboardComponent },
  { path: "add", component : AddComponent },
  { path: "details/:id", component : DetailsComponent },
  { path: "edit/:id", component: EditComponent },
  { path: "login", component: LoginPageComponent },
  { path: "filterByGenre", component: FilterbygenreComponent },
  { path: "moviesapi", component: MoviesapiComponent },
  { path: "movieparse", component: MoviesParseComponent },
  { path: "movieApiDetails/:id", component: DetailsMovieApiComponent },
  { path: "moviesDatabaseList", component: MoviesDatabaseListComponent },
  { path: "moviesDatabaseDetails/:id", component: MoviesDatabaseDetailsComponent },
  { path: "register", component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
