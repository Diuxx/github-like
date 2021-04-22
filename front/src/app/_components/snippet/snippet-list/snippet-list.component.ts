import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

// models
import { File } from 'src/app/_models/file';
import { Snippet } from 'src/app/_models/snippet';

// lib utils
import * as _ from 'lodash';

@Component({
  selector: 'app-snippet-list',
  templateUrl: './snippet-list.component.html',
  styleUrls: ['./snippet-list.component.scss']
})
export class SnippetListComponent {

  // inputs
  private _snippets: Snippet[] = [];
  @Input()
  public set snippets(v : Snippet[]) {
    this._snippets = v;
  }
  public get snippets() : Snippet[] {
    return this._snippets;
  }
    
  // outputs
  @Output() onFileSelected = new EventEmitter<File>();

  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }

  /**
   * Select snippet to display
   * @param snippet snippet to display
   */
  public selectSnippet(snippet: Snippet): void {
    this.snippets.map(s => {
      if (s != snippet) s.selected = false;
    });
  }

  /**
   * Share file details
   * @param file 
   */
  public displayFileDetail(file: File): void {
    this.onFileSelected.emit(file);
  }

  public removeSnippet(snippet: Snippet): void {
    let snippetIndex = this.snippets.findIndex(s => s.Id == snippet.Id);
    this.snippets.splice(snippetIndex, 1);

    console.log(`snippet index ${snippetIndex}`);
    
    // reload
    this.router.navigate(['/home']);
     
    // display message
    this.messageService.add({ 
      severity: 'success',
      detail: `Snippet ${snippet.Title} has been deleted`
    });
  }
}
