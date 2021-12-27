import { MustbeloggedComponent } from './components/mustbelogged/mustbelogged.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './routes/add/add.component';
import { DetailsComponent } from './routes/details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './routes/edit/edit.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { WelcomepageComponent } from './routes/welcomepage/welcomepage.component';

import { GenrepipePipe } from './pipes/genrepipe/genrepipe.pipe';
import { FilterbygenreComponent } from './routes/filterbygenre/filterbygenre.component';
import { MoviesapiComponent } from './routes/moviesapi/moviesapi.component';
import { MoviesParseComponent } from './routes/movies-parse/movies-parse.component';
import { MovieParseDatabaseComponent } from './routes/movie-parse-database/movie-parse-database.component';
import { DetailsMovieApiComponent } from './routes/details-movie-api/details-movie-api.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddComponent,
    DetailsComponent,
    EditComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    LoginPageComponent,
    LoadingScreenComponent,
    WelcomepageComponent,
    GenrepipePipe,
    FilterbygenreComponent,
    MoviesapiComponent,
    MoviesParseComponent,
    MustbeloggedComponent,
    MovieParseDatabaseComponent,
    DetailsMovieApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
