import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FLAService } from '../../../services/fla.service';
import { Flashcard } from '../../../models/flashcard.model';
import * as moment from 'moment';

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

  constructor(private FLAService: FLAService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFlashcards(this.route.snapshot.params['id']);
  }

  getFlashcards(id) {
    this.FLAService.getFlashcardsByDeckId(id).subscribe(flashcards => {
      this.flashcards = flashcards;

      this.start();
    });
  }

  start() {
    this.canBeFlipped = false;

    this.index = 0;

    this.totalFlashcards = this.flashcards.length;

    this.currentFlashcard = this.flashcards[this.index];

    if (this.currentFlashcard.Visibility === false) {
      this.next();
    }
  }

  flip() {
    this.canBeFlipped = true;
  }

  next() {
    this.index++;

    if (this.index === this.totalFlashcards) {
      this.canBeFlipped = false;

      this.currentFlashcard = null;

      this.addStudySession();
    } else {
      this.canBeFlipped = false;

      this.currentFlashcard = this.flashcards[this.index];
    }
  }

  addStudySession() {
    let currentTimestamp = moment().unix();
    let studySessionDate = moment(currentTimestamp * 1000).format("YYYY-MM-DD HH:mm:ss");

    this.FLAService.addStudySession(studySessionDate, this.totalFlashcards).subscribe(results => {
      console.log('Added session succesfully');
    });
  }

}
