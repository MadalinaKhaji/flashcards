import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardsService } from '../../../services/flashcards.service';
import { Flashcard } from '../../../models/flashcard.model';

@Component({
  selector: 'app-study-deck',
  templateUrl: './study-deck.component.html',
  styleUrls: ['./study-deck.component.css']
})
export class StudyDeckComponent implements OnInit {

  flashcards: Flashcard[];
  currentFlashcard: Flashcard;
  totalFlashcards: number;
  index: number;
  canBeFlipped: boolean;

  constructor(private flashcardsService: FlashcardsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFlashcards(this.route.snapshot.params['id']);
  }

  getFlashcards(id) {
    this.flashcardsService.getFlashcardsByDeckId(id).subscribe(flashcards => {
      this.flashcards = flashcards;

      this.start();
    });
  }

  start() {
    this.index = 0;

    this.totalFlashcards = this.flashcards.length;

    this.currentFlashcard = this.flashcards[this.index];

    // check visibility - if false then skip card by increasing index and check that index is within bounds 
    // show progress too 

    this.canBeFlipped = false;

    console.log(this.currentFlashcard)
  }

  flip() {
    this.canBeFlipped = true;
  }

  next() {
    this.index++;

    if (this.index === this.totalFlashcards) {
      this.currentFlashcard = null;

      this.canBeFlipped = false;
    } else {
      this.currentFlashcard = this.flashcards[this.index];

      this.canBeFlipped = false;
    }
  }

}
