import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './_routing/app-routing.module';

// component
import { AppInit } from 'src/app/_core/init/appInit';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { HeaderComponent } from './_components/header/header.component';
import { SnippetListComponent } from './_components/snippet-list/Snippet-list.component';

// template component
import { FormComponent } from './_templates/form/form.component';
import { SnippetComponent } from './_templates/snippet/snippet.component';

// primeng component
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { ScrollPanelModule } from 'primeng/scrollpanel';

// font awesome modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// external modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickOutsideModule } from 'ng-click-outside';

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SignInComponent } from './_components/sign-in/sign-in.component';
import { SignUpComponent } from './_components/sign-up/sign-up.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { AuthService } from './shared/services/Auth.service';

// pipe
import { SafeHtmlPipe } from './_pipes/safe-html.pipe';

// 2. Add your credentials from step 1
const config = {
  apiKey: "AIzaSyAOY0jxe9YSwMtXQNv2IDa9vIkAhIKPT5I",
  authDomain: "instaclone-a71d4.firebaseapp.com",
  projectId: "instaclone-a71d4",
  storageBucket: "instaclone-a71d4.appspot.com",
  messagingSenderId: "682122708317",
  appId: "1:682122708317:web:4f83b9cdecfd0039f714b4"
};

@NgModule({
  declarations: [
    SafeHtmlPipe,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    FormComponent,
    SnippetComponent,
    SnippetListComponent
  ],
  imports: [
    BrowserModule,
    ClickOutsideModule,
    ReactiveFormsModule,
    // 3. Initialize
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    TooltipModule,
    AutoCompleteModule,
    MultiSelectModule,
    DialogModule,
    PasswordModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    OverlayPanelModule,
    BadgeModule,
    EditorModule,
    FileUploadModule,
    CheckboxModule,
    ScrollPanelModule
  ],
  providers: [
    AppInit,
    [AuthService],
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
