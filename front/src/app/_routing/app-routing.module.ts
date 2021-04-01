import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/_components/home/home.component';
import { SignUpComponent } from '../_components/login/sign-up/sign-up.component';
import { SignInComponent } from '../_components/login/sign-in/sign-in.component';
import { SnippetDetailComponent } from '../_components/snippet/snippet-detail/snippet-detail.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: ':snippetId/:fileId',
        pathMatch: 'full',
        component: SnippetDetailComponent
      },
      {
        path: ':snippetId/comments',
        pathMatch: 'full',
        component: SnippetDetailComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
