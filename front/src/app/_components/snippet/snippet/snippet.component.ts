import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Snippet } from 'src/app/_models/snippet';
import { Router } from '@angular/router';
import { File } from 'src/app/_models/file';
import { Language } from 'src/app/_models/language';
import { Confirmation, ConfirmationService, TreeNode } from 'primeng/api';
import { Utils } from 'src/app/shared/services/utils.service';
import { AuthService } from 'src/app/shared/services/Auth.service';
import { User } from 'src/app/shared/intefaces/User';
import { SnippetService } from 'src/app/_services/snippet.service';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent implements OnInit {

  // variables
  private _snippet : Snippet;
  @Input()
  public set snippet(v : Snippet) {
    this._snippet = v;
    this.files = this.fileListToTreeNode(this._snippet);
  }
  public get snippet() : Snippet {
    return this._snippet;
  }

  public loading: boolean = true;
  public files: TreeNode[];
  public selectedFile: TreeNode;

  // inputs
  @Input() index: number;

  // outputs
  @Output() onSelected = new EventEmitter<Snippet>();
  @Output() onFileSelected = new EventEmitter<File>();
  @Output() onDelete = new EventEmitter<Snippet>();
  @Output() onCreateFile = new EventEmitter<Snippet>();

  constructor(
    private router: Router,
    private utils: Utils,
    private authService: AuthService,
    private confirationService: ConfirmationService,
    private snippetService: SnippetService
    ) { }

  ngOnInit() {
    if (this.snippet.selected) {
      let urlLastParam = this.utils.getUrlLastParam(this.router.url);
      if (urlLastParam !== 'comments') {
        let fileNode: TreeNode = this.utils.findDataInTreeNode(this.files, 'Id', urlLastParam);
        fileNode.parent.expanded = true;
        this.selectedFile = fileNode;
      }
    }
  }

  /**
   * create new file
   */
  public addNewFile(): void {
    this.onCreateFile.emit(this.snippet);
  }

  private deleteSnippetQuery(): void {
    this.snippetService.delete(this.snippet.Id).subscribe(
      (s: Snippet) => {
      console.log('deleted snippet:', s);
      this.onDelete.emit(this.snippet);
    }, err => {
      console.log(err);
    });
  }

  public deleteSnippet(): void {
    this.confirationService.confirm({
      message: 'Are you sure that you want to delete this snippet?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('delete snippet', this.snippet);
        // query to delete snippet
        this.deleteSnippetQuery();
      },
      reject: () => {
        console.log('rejected !');
        this.confirationService.close();
      }
    });
  }

  public hasRightToUpdate(): boolean {
    return this.authService.getUserData()?.uid === this.snippet.User?.GoogleId;
  }

  public selectComments(): void {
      this.selectedFile = null;
      this.router.navigate([`/home/${this.snippet.Id}/comments`]);
  }

  public isSelectedIsFile(): boolean {
    return true;
  }

  public nodeSelect(evt: any): void {
    this.router.navigate([`/home/${this.snippet.Id}/${this.selectedFile.data?.Id}`]);
  }

  private getBasePath(file: File, snippetId: string): string | undefined {
    return file.Url.split(`${snippetId}/`)[1]?.split('/')[0] ?? undefined;
  }

  private createFolder(pathName: string): TreeNode {
    return {
      label: pathName,
      data: "Documents Folder",
      expandedIcon: "pi pi-folder-open",
      collapsedIcon: "pi pi-folder",
      selectable: false,
      children: [] 
    };
  }

  private createFile(file: File, parent: TreeNode): TreeNode {
    return {
      label: `${file.FileName}.${file.Language.Extension}`,
      icon: file.Language.Icon,
      data: file,
      parent: parent
    };
  }

  private fileListToTreeNode(snippet: Snippet): TreeNode[] {
    let tree: TreeNode[] = [];
    snippet.Files.forEach(f => {
      let base: string = this.getBasePath(f, snippet.Id);
      if (!tree.some(t => t.label === base)) {
        let folder = this.createFolder(base);
        folder.children.push(this.createFile(f, folder));
        tree.push(folder);
      } else {
        let folder = tree.find(folder => folder.label === base);
        folder.children.push(this.createFile(f, folder));
      }
    });
    return tree;
  }

  public selectSnippet(event: any): void {
    this.snippet.selected = true;
    if (this.selectedFile != undefined) {
      this.router.navigate([`/home/${this.snippet.Id}/${this.selectedFile.data.Id}`]);
    } else {
      this.router.navigate([`/home/${this.snippet.Id}/comments`]);
    }
  }

  public unselectSnippet(snippet: Snippet): void {
    console.log('unselectSnippet', snippet);
  }

  /** get distinct language list from files list */
  public distinctLanguages(files: File[]): Language[] {
    let l: Language[] = [];
    files.forEach(f => {
      if (!l.some(e => e.Id == f.Language.Id)) l.push(f.Language);
    });
    return l;
  }
}
