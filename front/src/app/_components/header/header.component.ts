import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { User } from 'src/app/shared/intefaces/User';
import { AuthService } from 'src/app/shared/services/Auth.service';
import { Snippet } from 'src/app/_models/snippet';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('search') inputSearch: ElementRef;

  // ouput variables
  @Output() onSnippetCreated = new EventEmitter<Snippet>();

  // variables
  public isAuth: boolean;
  public signInDisplay: boolean = false;
  public signUpDisplay: boolean = false;
  public snippetNewDisplay: boolean = false;

  public signInDisplayFirstClick : boolean = false;
  public signUpDisplayFirstClick : boolean = false;

  public searchString: string;

  public innerWidth: any;
  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log(innerWidth);
  }

  public isTabletSize(): boolean {
    return this.innerWidth < 900;
  }

  constructor(
    public authService: AuthService,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.isAuth = this.authService.isLoggedIn;
    if(!this.isAuth) {
      this.signInDisplay = true ;
    }
    this.innerWidth = window.innerWidth;
  }

  public search(str: string): void {
    console.log(str);
  }

  public searchFocus(): void {
    console.log('focus');
  }

  /* display signIn dialog */
  public showSignInDialog(): void {
    if (this.isTabletSize())
    {
      this.router.navigate(['/sign-in']);
    } else {
      if(this.signUpDisplay) {
        this.signUpDisplay = false;
      }
      this.signInDisplayFirstClick = true;
      this.signInDisplay = true;
    }
  }

  /* display signUp dialog */
  public showSignUpDialog(): void {
    if(this.signInDisplay === true) {
      this.signInDisplay = false;
    }
    this.signUpDisplayFirstClick = true;
    this.signUpDisplay = true;
  }

  public createNewSnippet(): void {
    this.snippetNewDisplay = true;
  }

  public cancelSnippetCreation(): void {
    this.snippetNewDisplay = false;
  }

  public getUserData(): User {
    return this.authService.getUserData();
  }

  public onClickOutsideSignInDialog(event: any): void {
    if (this.signInDisplayFirstClick) {
      this.signInDisplayFirstClick = false;
      return;
    }
    this.signInDisplay = false;
  }

  public onClickOutsideSignUpDialog(event: any): void {
    if (this.signUpDisplayFirstClick) {
      this.signUpDisplayFirstClick = false;
      return;
    }
    this.signUpDisplay = false;
  }

  public snippetCreated(s: Snippet) {
    console.log(s);

    window.location.reload();

    if (this.onSnippetCreated.observers.length > 0) this.onSnippetCreated.emit(s);
  }

  public navigateHome() {
    this.router.navigate(['/role']); 
  }

  public logout() {
    this.authService.SignOut();
  }
}
