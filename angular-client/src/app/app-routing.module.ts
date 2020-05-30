import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth.guard';
import { DecksComponent } from './components/deck/decks/decks.component';
import { DeckDetailComponent } from './components/deck/deck-detail/deck-detail.component';
import { DeckAddComponent } from './components/deck/deck-add/deck-add.component';
import { DeckEditComponent } from './components/deck/deck-edit/deck-edit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'decks', component: DecksComponent },
  { path: 'deck-detail/:id', component: DeckDetailComponent },
  { path: 'deck-add', component: DeckAddComponent },
  { path: 'deck-edit/:id', component: DeckEditComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
