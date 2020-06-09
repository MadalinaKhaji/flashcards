import { Component, OnInit } from '@angular/core';
import { FLAService } from '../../../services/fla.service';
import { Deck } from '../../../models/deck.model';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})
export class DecksComponent implements OnInit {

  decks: Deck[];

  constructor(private FLAService: FLAService) { }

  ngOnInit(): void {
    this.FLAService.getDecksByUserId().subscribe((decks: Deck[]) => {
      this.decks = decks;
    });
  }

}
