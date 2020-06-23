import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { Deck } from '../models/deck.model';
import { Flashcard } from '../models/flashcard.model';
import { StudySession } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class FLAService {

  FLAAPIUrl: string = 'http://localhost:3000/api';

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

  getUserById(): Observable<User> {
    let currentUserId = this.extractUserId();

    return this.http.get<User>(`${this.FLAAPIUrl}/users/${currentUserId}`);
  }

  getSRSByUserId() {
    let currentUserId = this.extractUserId();

    return this.http.get(`${this.FLAAPIUrl}/users/settings/${currentUserId}`);
  }

  updateSRSByUserId(SRS: boolean) {
    let currentUserId = this.extractUserId();

    return this.http.patch(`${this.FLAAPIUrl}/users/settings`, { id: currentUserId, SRS: SRS });
  }

  getDecksByUserId(): Observable<Deck[]> {
    let currentUserId = this.extractUserId();

    return this.http.get<Deck[]>(`${this.FLAAPIUrl}/decks/user/${currentUserId}`);
  }

  addDeck(name: string, subject: string, description: string, favorite: boolean) {
    let currentUserId = this.extractUserId();

    return this.http.post(`${this.FLAAPIUrl}/decks`, { name: name, subject: subject, description: description, favorite: favorite, userId: currentUserId });
  }

  getDeckById(id: number): Observable<Deck> {
    return this.http.get<Deck>(`${this.FLAAPIUrl}/decks/${id}`);
  }

  deleteDeckById(id: number) {
    return this.http.delete(`${this.FLAAPIUrl}/decks/${id}`);
  }

  updateDeckById(name: string, subject: string, description: string, favorite: boolean, id: number) {
    return this.http.patch(`${this.FLAAPIUrl}/decks`, { name: name, subject: subject, description: description, favorite: favorite, deckId: id })
  }

  getFlashcardsByUserId(): Observable<Flashcard[]> {
    let currentUserId = this.extractUserId();

    return this.http.get<Flashcard[]>(`${this.FLAAPIUrl}/flashcards/user/${currentUserId}`);
  }

  getFlashcardsByDeckId(id: number): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(`${this.FLAAPIUrl}/flashcards/deck/${id}`);
  }

  addFlashcard(flashcard: Flashcard) {
    return this.http.post(`${this.FLAAPIUrl}/flashcards`,
      {
        note: flashcard.Note,
        formatType: flashcard.FormatType,
        sourceURL: flashcard.SourceURL,
        front: flashcard.Front,
        back: flashcard.Back,
        context: flashcard.Context,
        blank: flashcard.Blank,
        tags: flashcard.Tags,
        deckId: flashcard.DeckId
      });
  }

  getFlashcardById(id): Observable<Flashcard> {
    return this.http.get<Flashcard>(`${this.FLAAPIUrl}/flashcards/${id}`);
  }

  deleteFlashcardById(id: number) {
    return this.http.delete(`${this.FLAAPIUrl}/flashcards/${id}`);
  }

  updateFlashcardById() {
    return null;
  }

  updateFlashcard(flashcard: Flashcard) {
    return this.http.patch(`${this.FLAAPIUrl}/flashcards`, { note: flashcard.Note, visibility: flashcard.Visibility, formatType: flashcard.FormatType, sourceURL: flashcard.SourceURL, selfAssesmentScore: flashcard.SelfAssesmentScore, favorite: flashcard.Favorite, difficulty: flashcard.Difficulty, lastStudyDate: flashcard.LastStudyDate, studyInterval: flashcard.StudyInterval, flashcardId: flashcard.FlashcardId });
  }

  addStudySession(studySessionDate, studiedFlashcardsNo) {
    let currentUserId = this.extractUserId();

    return this.http.post(`${this.FLAAPIUrl}/users/sessions`, { userId: currentUserId, studySessionDate: studySessionDate, studiedFlashcardsNo: studiedFlashcardsNo });
  }

  getStudySessionsByUserId(): Observable<StudySession[]> {
    let currentUserId = this.extractUserId();

    return this.http.get<StudySession[]>(`${this.FLAAPIUrl}/users/sessions/${currentUserId}`);
  }
}
