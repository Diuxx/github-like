import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// services
import { AuthService } from 'src/app/shared/services/Auth.service';
import { SnippetService } from 'src/app/_services/snippet.service';

// models
import { File } from 'src/app/_models/file';
import { Snippet } from 'src/app/_models/snippet';

// utils
import * as _ from 'lodash';
import { Router } from '@angular/router';

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
  public filteredSnippetList: Snippet[] = [];

  public loading: boolean = true;

  public fileToDisplay: File;

  constructor(
    private authService: AuthService,
    private snippetService: SnippetService,
    private ref: ChangeDetectorRef,
    private router: Router  
  ) {
    $("#search-input").on('input', e => {
      let val: string = (<HTMLInputElement>e.target).value;
      this.filteredSnippetList = this.snippets.filter(s => {
        return s.Title.toLowerCase().includes(val.toLowerCase()) || s.Desc.toLowerCase().includes(val.toLowerCase()) || s.User?.Name.toLowerCase().includes(val.toLowerCase()) || s.Languages?.some(l => l.Name.toLowerCase().includes(val.toLowerCase()))
      });

      // rduce all snippets
      this.reduceSnippets();

      // navigate home
      this.router.navigate([`/home`]);
    });
  }

  ngOnInit() {
    this.snippetService.getAll<Snippet>().subscribe(
      e => {
        this.snippets = e;
        this.filteredSnippetList = _.cloneDeep(this.snippets);
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
      let snippet: Snippet = this.filteredSnippetList.find(s => s.Id === id);
      if (snippet) {
        this.reduceSnippets();
        snippet.selected = true;
      }
    }
    this.ref.detectChanges();
  }

  /**
   * Set selected attribut of snippets to false */
  private reduceSnippets(): void {
    this.filteredSnippetList.map(s => s.selected = false);
  }
}
