import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/Auth.service';
import { File } from 'src/app/_models/file';
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
  public loading: boolean = true;

  public fileToDisplay: File;

  constructor(
    private authService: AuthService,
    private snippetService: SnippetService
  ) { }

  ngOnInit() {
    this.snippetService.getAll<Snippet>().subscribe(
      e => {
        this.snippets = e;
        this.loading = false;
      },
      err => {
        console.error(err);
      }
    );
  }

  public displayFileDetail(file: File): void {
    this.fileToDisplay = file;
  }

  /**
   * Check if user is loggedIn */
  public isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  /**
   * expand selected snippet and reduce others
   * @param id snippet ID */
  public selectSnippet(id: string) {
    if (id == undefined)
    {
      this.reduceSnippets();
    } else {
      let snippet: Snippet = this.snippets.find(s => s.Id === id);
      console.log('selected snippet:', snippet);
      if (snippet) {
        this.reduceSnippets();
        snippet.selected = true;
      }
    }
  }

  /**
   * Set selected attribut of snippets to false */
  private reduceSnippets(): void {
    this.snippets.map(s => s.selected = false);
  }
}
