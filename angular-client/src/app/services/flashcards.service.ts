import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Deck } from '../models/deck.model';
import { Flashcard } from '../models/flashcard.model';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  myAppAPIUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  extractUserId() {
    let token = localStorage.getItem('user_token');

    if (token) {
      // NEVER use libraries like jsonwebtoken to decode - CLI crashes
      let decoded = JSON.parse(atob(token.split('.')[1]));

      let currentUserId = decoded.result.UserId;

      return currentUserId;
    }
  }

  getDecksByUserId(): Observable<Deck[]> {
    let currentUserId = this.extractUserId();

    return this.http.get<Deck[]>(`${this.myAppAPIUrl}/decks/user/${currentUserId}`);
  }

  addDeck(name: string, subject: string, description: string, favorite: boolean) {
    let currentUserId = this.extractUserId();

    return this.http.post(`${this.myAppAPIUrl}/decks`, { name: name, subject: subject, description: description, favorite: favorite, userId: currentUserId });
  }

  getDeckById(id: number): Observable<Deck> {
    return this.http.get<Deck>(`${this.myAppAPIUrl}/decks/${id}`);
  }

  deleteDeckById(id: number) {
    return this.http.delete(`${this.myAppAPIUrl}/decks/${id}`);
  }

  updateDeckById(name: string, subject: string, description: string, favorite: boolean, id: number) {
    return this.http.patch(`${this.myAppAPIUrl}/decks`, { name: name, subject: subject, description: description, favorite: favorite, deckId: id })
  }

  getFlashcardsByUserId(): Observable<Flashcard[]> {
    let currentUserId = this.extractUserId();

    return this.http.get<Flashcard[]>(`${this.myAppAPIUrl}/flashcards/user/${currentUserId}`);
  }

  getFlashcardsByDeckId(id: number): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(`${this.myAppAPIUrl}/flashcards/deck/${id}`);
  }

  addFlashcard(flashcard: Flashcard) {
    return this.http.post(`${this.myAppAPIUrl}/flashcards`, { note: flashcard.Note, formatType: flashcard.FormatType, sourceURL: flashcard.SourceURL, front: flashcard.Front, back: flashcard.Back, context: flashcard.Context, blank: flashcard.Blank, tags: flashcard.Tag, deckId: flashcard.DeckId });
  }

  getFlashcardById(id): Observable<Flashcard> {
    return this.http.get<Flashcard>(`${this.myAppAPIUrl}/flashcards/${id}`);
  }

  deleteFlashcardById(id: number) {
    return this.http.delete(`${this.myAppAPIUrl}/flashcards/${id}`);
  }

  updateFlashcardById() {
    return null;
  }

  updateFlashcard(flashcard: Flashcard) {
    return this.http.patch(`${this.myAppAPIUrl}/flashcards`, { note: flashcard.Note, visibility: flashcard.Visibility, formatType: flashcard.FormatType, sourceURL: flashcard.SourceURL, selfAssesment: flashcard.SelfAssesment, favorite: flashcard.Favorite, difficulty: flashcard.Difficulty, lastReviewDate: flashcard.LastReviewDate, reviewInterval: flashcard.ReviewInterval, flashcardId: flashcard.FlashcardId });
  }

}
