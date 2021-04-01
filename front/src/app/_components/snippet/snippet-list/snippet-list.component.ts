import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor() { }

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
}
