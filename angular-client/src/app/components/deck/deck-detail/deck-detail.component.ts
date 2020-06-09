import { Component, OnInit } from '@angular/core';
import { FLAService } from './../../../services/fla.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Deck } from './../../../models/deck.model';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.css']
})
export class DeckDetailComponent implements OnInit {

  deck: Deck = {
    DeckId: null,
    Name: '',
    Subject: '',
    Description: '',
    Favorite: null,
    UserId: null
  };

  constructor(private FLAService: FLAService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDeckDetails(this.route.snapshot.params['id']);
  }

  getDeckDetails(id) {
    this.FLAService.getDeckById(id).subscribe(deck => {
      this.deck = deck;
    });
  }

  deleteDeck(id) {
    this.FLAService.deleteDeckById(id).subscribe(() => {
      console.log('Deck deleted succesfully');
      this.router.navigateByUrl('/decks');
    });
  }

}
