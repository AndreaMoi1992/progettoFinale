import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/jwt-auth/auth/auth.service';
import { TokenStorageService } from 'src/app/jwt-auth/auth/token-storage.service';
import { commentDotnetData } from 'src/app/models/dotnetData.model';
import { DotnetServiceService } from 'src/app/services/dotnet-service.service';

const FILMID = 'filmid';

@Component({
  selector: 'app-comment-component',
  templateUrl: './comment-component.component.html',
  styleUrls: ['./comment-component.component.css']
})
export class CommentComponentComponent implements OnInit {

  idString: string;

  constructor(private route: ActivatedRoute, private dotnetService: DotnetServiceService, public authService: AuthService,public tokenStorage: TokenStorageService) {

  }

  commentList: Array<commentDotnetData>;
  userList: Array<any>;
  commentRappresentation: Array<commentDotnetData>;
  commentUsername: Array<string>;

  viewComments = false;
  moviesDataLoader = false;

  public visualizzaCommento: boolean = false;


  idpathComponent: number;

  ngOnInit(): void {
    // Id movie preso dal path
    this.idpathComponent = this.route.snapshot.params['id'];

    // Specchietto per inserimento commento
    this.visualizzaCommento = true;
    // Cerca nel database se ci sono commenti corrispondenti al movie id considerato
    this.findComment();

  }

  // Cerca i commenti all'interno della tabella gestita da dotnet
  findComment() {

    // Get
    this.dotnetService.getDotnetDataAll().subscribe((resDot: any) => {
      this.commentList = resDot;
      this.authService.getAll().subscribe(resSpring => {
        this.userList = resSpring;

        // Contatore per l'inserimento dei commenti trovati nell'array
        var j = 0;

        // Inizializzo un array per salvare i commenti
        this.commentRappresentation = [];
        this.commentUsername = [];


        // Cerca all'interno della tabella Commenti
        for (let i = 0; i < this.commentList.length; i++) {

          // Se l'idmovie dei film coincidono allora aggiungi il commento corrispondente
          if (this.commentList[i].movieId == this.idpathComponent) {
            for (let x = 0; x < this.userList.length; x++) {
              if (this.commentList[i].userId == this.userList[x].id) {
                this.commentUsername[j] = this.userList[x].username
              }
            }
            this.commentRappresentation[j] = this.commentList[i];
            j++;
          }
        }


        // Se sono presenti commenti allora visualizzali nella pagina HTML
        if (this.commentRappresentation.length > 0) {
          this.viewComments = true;
        }

        // Non mostrare più il caricamento della pagina
        this.moviesDataLoader = true;

      })
    })
  }
  deleteComment(id:number){
    this.dotnetService.deleteDotnetData(id).subscribe((resDot: any) => {window.location.reload();})
  }

}
