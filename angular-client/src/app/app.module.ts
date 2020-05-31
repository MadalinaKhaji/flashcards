import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { httpInterceptorProviders } from './http-interceptors';
import { DecksComponent } from './components/deck/decks/decks.component';
import { DeckAddComponent } from './components/deck/deck-add/deck-add.component';
import { DeckDetailComponent } from './components/deck/deck-detail/deck-detail.component';
import { DeckEditComponent } from './components/deck/deck-edit/deck-edit.component';
import { FlashcardsComponent } from './components/flashcard/flashcards/flashcards.component';
import { FlashcardAddComponent } from './components/flashcard/flashcard-add/flashcard-add.component';
import { FlashcardDetailComponent } from './components/flashcard/flashcard-detail/flashcard-detail.component';
import { FlashcardEditComponent } from './components/flashcard/flashcard-edit/flashcard-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SettingsComponent,
    AboutComponent,
    PageNotFoundComponent,
    DecksComponent,
    DeckAddComponent,
    DeckDetailComponent,
    DeckEditComponent,
    FlashcardsComponent,
    FlashcardAddComponent,
    FlashcardDetailComponent,
    FlashcardEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
