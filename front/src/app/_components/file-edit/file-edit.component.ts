import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { File } from 'src/app/_models/file';

@Component({
  selector: 'app-file-edit',
  templateUrl: './file-edit.component.html',
  styleUrls: ['./file-edit.component.scss']
})
export class FileEditComponent implements OnInit, AfterContentInit {

  private _data : string;
  @Input()
  public set data(v : string) {
    this._data = v;
    $('body').on('DOMSubtreeModified', '#editor', function(){
      console.log('changed');      
    });
  }
  public get data() : string {
    return this._data;
  }

  @Input() file: File;
  

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {

  }

  public test(evt: any): void {
    console.log('change');
  }

}
