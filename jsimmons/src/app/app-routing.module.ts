import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { GamesComponent } from './games/games.component';
import { WordleComponent } from './wordle/wordle.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'games',
    component: GamesComponent
  },
  {
    path: 'wordle',
    component: WordleComponent
  },
  {
    path: 'wordliest',
    redirectTo: 'wordle',
    pathMatch: 'full'
  },
  {
    path: 'wordliest.html',
    redirectTo: 'wordle',
    pathMatch: 'full'
  },
  {
    path: 'wordle.html',
    redirectTo: 'wordle',
    pathMatch: 'full'
  },
  {
    path: 'wordoom',
    redirectTo: 'wordle',
    pathMatch: 'full'
  },
  {
    path: 'wordoom.html',
    redirectTo: 'wordle',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
