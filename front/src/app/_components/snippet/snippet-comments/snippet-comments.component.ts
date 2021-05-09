import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/Auth.service';
import { Utils } from 'src/app/shared/services/utils.service';

import { Comment } from 'src/app/_models/comment';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-snippet-comments',
  templateUrl: './snippet-comments.component.html',
  styleUrls: ['./snippet-comments.component.scss']
})
export class SnippetCommentsComponent implements OnInit {

  // variables
  public comments: Comment[] = [];
 
  // form control
  public commentForm: FormGroup = new FormBuilder().group({
    user: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private utils: Utils,
    private commentService: CommentService,
    private authService: AuthService) {
    // check url routing
    this.detectRoute();
  }

  ngOnInit() {
    // get comments
    this.getComments();
    this.getMockComments();

    // init comment snippet component
    console.log('init comment');
    this.commentForm.get('user').setValue(this.authService.getUserData());
  }

  /**
   * Mock comments list
   */
  public getMockComments(): void {
    let comment: Comment = {
      Id: "10",
      Content: 'test',
      User: this.authService.getUserData(),
      UpdatedAt: new Date(Date.now()) 
    }
    // add..
    this.comments.push(comment);
    this.comments.push(comment);
  }

  public getUserName(c: Comment): string {
    return c.User.Name ?? 'undefined';
  }

  public hasComments(): boolean {
    return this.comments.length > 0;
  }

  /**
   * Validate form and submit comment
   */
  public submit(): void {
    let comment: string = this.commentForm.get('message').value;
    let user: any = this.commentForm.get('user').value;
    let snippetId: string = this.utils.getUrlSnippetId(this.router.url);

    this.commentService
    .post({comment: comment, user: user, snippet: snippetId})
    .subscribe(c => {
      console.log(c);
      this.commentForm.get('message').setValue('');
      this.getComments();
    }, err => {
      console.log(err);
    });
  }

  /**
   * Check if the comment form is ok
   * @return true if comment form is ok
   */
  public canSubmit(): boolean {
    return !Object.values(this.commentForm.controls).some(v => v.errors != null);
  }

  /**
   * Get snippet comments list from snippet id
   */
  private getComments(): void {
    let snippetId: string = this.utils.getUrlSnippetId(this.router.url);
    console.log('getting snippet comments: ' + snippetId);

    if (snippetId != undefined)
    {
      this.commentService.get<Comment>(snippetId).subscribe(commentList => {
        // console.log('reading comments service => ' + JSON.stringify(commentList));
        let comments: Comment[] = commentList;
        if (commentList.length > 0) {
          console.log(commentList);
          this.comments = commentList;
        } else {
          this.comments = [];
        }
      }, err => {
        console.log('cannot get comments list of: ' + snippetId);
      });  
    }
    return;
  }

  /**
   * detect route changing
   */
  private detectRoute(): void {
    this.router.events.subscribe(
      (val) => {
      if (val instanceof NavigationEnd) this.getUrlParam(val.urlAfterRedirects);
    });
  }

  /**
   * Get url last param
   * @param url full url
   */
  private getUrlParam(url: string): void {
    let urlLastParam =this.utils.getUrlLastParam(url);
    if (urlLastParam === 'comments')
    {
      this.getComments();
    }
  }
}
