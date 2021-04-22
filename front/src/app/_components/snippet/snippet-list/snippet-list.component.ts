import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

// models
import { File } from 'src/app/_models/file';
import { Snippet } from 'src/app/_models/snippet';

// lib utils
import * as _ from 'lodash';
import { FileService } from 'src/app/_services/file.service';

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

  public selectedSnippet: Snippet;
    
  // outputs
  @Output() onFileSelected = new EventEmitter<File>();

  // variables
  public snippetNewFileDisplay: boolean = false;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private fileService: FileService,
    private ref: ChangeDetectorRef
  ) { }

  public cancelFileCreation(): void {
    this.snippetNewFileDisplay = false;
  }

  public createNewFile(file: any): void {
    this.fileService.post<File>(file)
    .subscribe(
      f => {
      let createdFile: File = f;
      createdFile.Language = file.Language;
      this.selectedSnippet.Files.push(createdFile);
      this.snippetNewFileDisplay = false;

      // detect changes
      this.ref.detectChanges();

      // display message
      this.messageService.add({ 
        severity: 'success',
        detail: `${createdFile.FileName} has been created`
      });
    }, err => {
      console.log(err);
    }) 
  }

  public displayCreateFileDialog(snippet: Snippet): void {
    console.log(snippet)
    this.snippetNewFileDisplay = true;
    this.selectedSnippet = snippet;
  }

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
