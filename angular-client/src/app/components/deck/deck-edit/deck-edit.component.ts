import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardsService } from './../../../services/flashcards.service';
import { Deck } from './../../../models/deck.model';

@Component({
  selector: 'app-deck-edit',
  templateUrl: './deck-edit.component.html',
  styleUrls: ['./deck-edit.component.css']
})
export class DeckEditComponent implements OnInit {

  deck: Deck = {
    DeckId: null,
    Name: '',
    Subject: '',
    Description: '',
    Favorite: null,
    UserId: null
  };

  editDeckForm = this.formBuilder.group({
    name: ['', Validators.required],
    subject: ['', Validators.required],
    description: [''],
    favorite: ['']
  });

  constructor(private formBuilder: FormBuilder, private flashcardsService: FlashcardsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDeck(this.route.snapshot.params['id']);
  }

  getDeck(id) {
    this.flashcardsService.getDeckById(id).subscribe(deck => {
      this.deck = deck;
      console.log(this.deck);
      this.updateFormValues(this.deck);
    });
  }

  updateFormValues(deck: Deck) {
    this.editDeckForm.patchValue({
      name: deck.Name,
      subject: deck.Subject,
      description: deck.Description,
      favorite: deck.Favorite
    });
  }

  editDeck() {
    let name = this.editDeckForm.value.name;
    let subject = this.editDeckForm.value.subject;
    let description = this.editDeckForm.value.description;
    let favorite = this.editDeckForm.value.favorite;
    // Converting to boolean
    favorite = (favorite === 'true');

    if (name && subject) {
      this.flashcardsService.updateDeckById(name, subject, description, favorite, this.deck.DeckId).subscribe(() => {
        console.log('Deck updated succesfully..');
        this.router.navigate(['/deck-detail', this.deck.DeckId]);
      });
    }
  }

}
