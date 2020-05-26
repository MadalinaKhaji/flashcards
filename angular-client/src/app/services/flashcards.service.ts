import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  flashcardsAPIUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.flashcardsAPIUrl}/users`);
  }

}
