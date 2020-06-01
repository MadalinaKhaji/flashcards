import { Component, OnInit } from '@angular/core';
import { FlashcardsService } from '../../../services/flashcards.service';
import { Flashcard } from '../../../models/flashcard.model';

@Component({
  selector: 'app-study-srs',
  templateUrl: './study-srs.component.html',
  styleUrls: ['./study-srs.component.css']
})
export class StudySrsComponent implements OnInit {

  flashcards: Flashcard[];
  totalFlashcards: number;
  index: number;
  currentFlashcard: Flashcard;
  canBeFlipped: boolean;

  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit(): void {
    this.getFlashcards();
  }

  getFlashcards() {
    this.flashcardsService.getFlashcardsByUserId().subscribe(flashcards => {
      this.flashcards = flashcards;

      console.log(this.flashcards);

      this.init();
    });
  }

  getFlashcard(id) {
    this.flashcardsService.getFlashcardById(id).subscribe(flashcard => {
      this.currentFlashcard = flashcard;

      console.log(this.currentFlashcard);
    });
  }

  init() {
    this.index = 0;
    this.totalFlashcards = this.flashcards.length;
    this.canBeFlipped = false;

    this.getFlashcard(this.flashcards[this.index].FlashcardId);
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
      this.canBeFlipped = false;

      this.getFlashcard(this.flashcards[this.index].FlashcardId);
    }
  }

}
