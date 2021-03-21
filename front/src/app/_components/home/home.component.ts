import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/Auth.service';
import { Snippet } from 'src/app/_models/snippet';
import { SnippetService } from 'src/app/_services/snippet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // variables
  public search: string;
  public autoCompleteResults: string[];

  public snippets: Snippet[] = [];

  constructor(
    private authService: AuthService,
    private snippetService: SnippetService
  ) { }

  ngOnInit() {
    this.snippetService.getAll<Snippet>().subscribe(
      e   => {
        this.snippets = e;
        for(let i=0; i<2; i++) {
          this.snippets.push(new Snippet());
        }
        console.log(this.snippets);
      },
      err => {
        console.error(err);
    });
  }

  /**
   * Check if user is loggedIn
   */
  public isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
