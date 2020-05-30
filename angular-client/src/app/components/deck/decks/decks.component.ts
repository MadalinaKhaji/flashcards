import { Component, OnInit } from '@angular/core';
import { FlashcardsService } from '../../../services/flashcards.service';
import { Deck } from '../../../models/deck.model';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})
export class DecksComponent implements OnInit {

  decks: Deck[];

  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit(): void {
    this.flashcardsService.getDecksByUserId().subscribe((decks: Deck[]) => {
      this.decks = decks;
    });
  }

}
