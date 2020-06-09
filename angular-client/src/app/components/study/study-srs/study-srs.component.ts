import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FLAService } from '../../../services/fla.service';
import { Flashcard } from '../../../models/flashcard.model';
import * as moment from 'moment';

@Component({
  selector: 'app-study-srs',
  templateUrl: './study-srs.component.html',
  styleUrls: ['./study-srs.component.css']
})
export class StudySrsComponent implements OnInit {

  @Input() flashcards: Flashcard[];
  totalFlashcards: number;
  index: number;
  currentFlashcard: Flashcard;
  canBeFlipped: boolean;

  ratingsForm = this.formBuilder.group({
    difficulty: ['', Validators.required]
  });

  constructor(private FLAService: FLAService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.flashcards) {
      console.log(this.flashcards);
      this.init();
    }
  }

  getFlashcard(id) {
    this.FLAService.getFlashcardById(id).subscribe(flashcard => {
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
    let difficulty = this.ratingsForm.value.difficulty;
    let latestStudyDate = moment().format("YYYY-MM-DD HH:mm:ss");

    console.log(difficulty);
    console.log(latestStudyDate);

    this.currentFlashcard.Difficulty = +difficulty;
    this.currentFlashcard.LastStudyDate = latestStudyDate;

    this.updateFlashcard();

    this.index++;

    if (this.index === this.totalFlashcards) {
      this.currentFlashcard = null;

      this.canBeFlipped = false;
    } else {
      this.canBeFlipped = false;

      this.getFlashcard(this.flashcards[this.index].FlashcardId);
    }

  }

  updateFlashcard() {
    this.FLAService.updateFlashcard(this.currentFlashcard).subscribe(response => {
      console.log(response)
    });
  }

}
