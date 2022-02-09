import { RegisterComponent } from './components/register/register.component';
import { OverlayChoiceComponent } from './components/overlayChoice/overlayChoice.component';
import { MustbeloggedComponent } from './components/mustbelogged/mustbelogged.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { WelcomepageComponent } from './routes/welcomepage/welcomepage.component';

import { MoviesapiComponent } from './routes/moviesapi/moviesapi.component';
import { MoviesParseComponent } from './routes/movies-parse/movies-parse.component';

import { DetailsMovieApiComponent } from './routes/details-movie-api/details-movie-api.component';
import { MoviesDatabaseListComponent } from './routes/movies-database-list/movies-database-list.component';
import { MoviesDatabaseDetailsComponent } from './routes/movies-database-details/movies-database-details.component';
import { CommentComponentComponent } from './components/comment-component/comment-component.component';
import { LogoutComponent } from './components/logout/logout.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    LoginPageComponent,
    LoadingScreenComponent,
    WelcomepageComponent,
    MoviesapiComponent,
    MoviesParseComponent,
    MustbeloggedComponent,
    DetailsMovieApiComponent,
    MoviesDatabaseListComponent,
    MoviesDatabaseDetailsComponent,
    OverlayChoiceComponent,
    RegisterComponent,
    CommentComponentComponent,
    LogoutComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
