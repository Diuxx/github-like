import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-edit',
  templateUrl: './file-edit.component.html',
  styleUrls: ['./file-edit.component.scss']
})
export class FileEditComponent implements OnInit, AfterContentInit {

  @Input() data: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    $('body').on('DOMSubtreeModified', '#editor', function(){
      console.log('changed');
    });
  }

  public test(evt: any): void {
    console.log('change');
  }

}
