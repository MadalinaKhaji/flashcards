import { Component, OnInit } from '@angular/core';
import { FLAService } from '../../../services/fla.service';
import { Deck } from '../../../models/deck.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})
export class DecksComponent implements OnInit {

  user: User;
  decks: Deck[];

  constructor(private FLAService: FLAService) { }

  ngOnInit(): void {
    this.getCurrentUser();

    this.getAllDecks();
  }

  getCurrentUser() {
    this.FLAService.getUserById().subscribe((results: User) => {
      this.user = results;
    });
  }

  getAllDecks() {
    this.FLAService.getDecksByUserId().subscribe((decks: Deck[]) => {
      this.decks = decks;
    });
  }

}
