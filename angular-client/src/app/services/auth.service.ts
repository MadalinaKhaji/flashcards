import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  myAppAPIUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${this.myAppAPIUrl}/users/login`, { email: email, password: password });
  }

  setSession(loginResult) {
    // const expiresAt = moment().add(loginResult.expiresIn, 'hours');
    const expiresAt = moment().add(1, 'hours'); // hardcoded 1 hour expiry time 
    localStorage.setItem('user_token', loginResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('user_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    let now = moment();
    return moment(now).isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
  
  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  register(firstName: string, lastName: string, username: string, email: string, password: string) {
    return this.http.post(`${this.myAppAPIUrl}/users`, { firstName: firstName, lastName: lastName, username: username, email: email, password: password });
  }
}
