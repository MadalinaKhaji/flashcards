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

  addFlashcard(note: string, visibility: boolean, formatType: string, sourceURL: string, front: string, back: string, context: string, blank: string, favorite: boolean, tag: string[], deckId: number) {
    return this.http.post(`${this.myAppAPIUrl}/flashcards`, { note: note, visibility: visibility, formatType: formatType, sourceURL: sourceURL, front: front, back: back, context: context, blank: blank, favorite: favorite, tag: tag, deckId: deckId });
  }

  getFlashcardById(id): Observable<Flashcard> {
    return this.http.get<Flashcard>(`${this.myAppAPIUrl}/flashcards/${id}`);
  }

  deleteFlashcardById(id: number) {
    return this.http.delete(`${this.myAppAPIUrl}/flashcards/${id}`);
  }

  updateFlashcardById(note: string, visibility: boolean, formatType: string, sourceURL: string, front: string, back: string, context: string, blank: string, favorite: boolean, tag: string[]) {
    return this.http.patch(`${this.myAppAPIUrl}/flashcards`, { note: note, visibility: visibility, formatType: formatType, sourceURL: sourceURL, front: front, back: back, context: context, blank: blank, favorite: favorite, tag: tag });
  }

}
