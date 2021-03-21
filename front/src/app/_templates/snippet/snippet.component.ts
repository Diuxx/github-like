import { Component, Input, OnInit } from '@angular/core';
import { Snippet } from 'src/app/_models/snippet';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent implements OnInit {

  // variables
  @Input() snippet: Snippet;
  public loading: boolean = true;

  constructor() { }

  ngOnInit() {
  }
}
