import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'jquery';

import { SnippetService } from 'src/app/_services/snippet.service';

import { Snippet } from 'src/app/_models/snippet';
import { File } from 'src/app/_models/file';
import { FileService } from 'src/app/_services/file.service';
import { Utils } from 'src/app/shared/services/utils.service';


@Component({
  selector: 'app-snippet-detail',
  templateUrl: './snippet-detail.component.html',
  styleUrls: ['./snippet-detail.component.scss']
})
export class SnippetDetailComponent implements OnInit {

  // variables
  public snippetId: string;
  public snippet: Snippet;
  public loading: boolean = true;

  public fileStream: string;
  @Input() file: File;

  public files: any[] = [];
  public currentFileIndex: number;
  
  // output
  @Output() onSnippetDetected = new EventEmitter<String>();

  @ViewChild('comments') commetComponentn;

  constructor(
    private router: Router,
    private snippetService: SnippetService,
    private fileService: FileService,
    private utils: Utils
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let urlLastParam: string = this.snippetDetailRouter(val.urlAfterRedirects);
        if (urlLastParam != 'home') {
          let urlSnippetId: string = this.utils.getUrlSnippetId(this.router.url);
          this.onSnippetDetected.emit(urlSnippetId);
        } else this.onSnippetDetected.emit(undefined);
      } 
    });
  }

  ngOnInit() {
    this.checkUrlOnApplicationStart();
  }

  public isLocatedHome(): boolean {
    return this.utils.getUrlLastParam(this.router.url) === 'home';
  }

  /**
   * Query to get file by id
   * @param id file id
   */
  private getFileById(fileId: string): void {
    if(this.files.some(f => f.Id === fileId))
    {
      this.currentFileIndex = this.files.findIndex(f => f.Id === fileId);
      this.fileStream = this.files[this.currentFileIndex].stream;
      this.loading = false;
    } else 
    {
      this.fileService.get(fileId).subscribe((stream: string) => {
        // store stream in memories
        this.files.push({
          id: fileId,
          stream: stream
        });
        this.currentFileIndex = this.files.length - 1;
        this.fileStream = this.files[this.currentFileIndex].stream;
        this.loading = false;
      }, err => {
        console.error(err);
        this.loading = false;
      });
    }
  }

  /**
   * On application first loading checking url to get snippet id
   */
  private checkUrlOnApplicationStart(): void {
    let urlLastParam: string = this.snippetDetailRouter(this.router.url);
    if (urlLastParam != 'home') {
      let urlSnippetId: string = this.utils.getUrlSnippetId(this.router.url);
      this.getData(urlSnippetId);
    }
  }

  private snippetDetailRouter(url: string): string {
    let urlLastParam =this.utils.getUrlLastParam(url);
    switch(urlLastParam) {
      case 'home': 
        console.log('> home page');
        this.loading = false;
        break;
      case 'comments':
        this.fileStream = undefined;
        this.loading = false;
        break;
      default:
        this.getFileById(urlLastParam);
        break; 
    }
    return urlLastParam;
  }

  /**
   * query on snippet id
   * @param id snippet id */
  private getData(id: string): void {
    this.snippetId = id;
    this.onSnippetDetected.emit(this.snippetId);

    // get snippet
    this.snippetService.getOne(this.snippetId).subscribe((s: Snippet) => {
      this.snippet = s;
      this.loading = false;
      console.log(this.snippet);
    }, err => {
      console.log(err);
      this.loading = false;
    });
  }
}
