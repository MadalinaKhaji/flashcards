import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Deck } from '../models/deck.model';
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

}
