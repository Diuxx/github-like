import { Component, Input, OnInit } from '@angular/core';
import { Snippet } from 'src/app/_models/snippet';

@Component({
  selector: 'app-snippet-list',
  templateUrl: './snippet-list.component.html',
  styleUrls: ['./snippet-list.component.scss']
})
export class SnippetListComponent implements OnInit {

  // snippets
  @Input() snippets: Snippet[] = [];

  constructor() { }

  ngOnInit() {
  }

}
