import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { File } from 'src/app/_models/file';
import { Snippet } from 'src/app/_models/snippet';

@Component({
  selector: 'app-snippet-list',
  templateUrl: './snippet-list.component.html',
  styleUrls: ['./snippet-list.component.scss']
})
export class SnippetListComponent {

  // inputs
  @Input() snippets: Snippet[] = [];

  // outputs
  @Output() onFileSelected = new EventEmitter<File>();

  constructor(
    private router: Router
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
  }
}
