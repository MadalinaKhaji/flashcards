import { Component, OnInit } from '@angular/core';
import { FLAService } from '../../services/fla.service';
import { Flashcard } from '../../models/flashcard.model';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  flashcards: Flashcard[];
  noOfFlashcardsNotYetStudied: number;
  noOfFlashcardsToReview: number;
  oldFlashcardsToStudyToday: Flashcard[] = [];
  newFlashcardsToStudyToday: Flashcard[] = [];
  isAbleToStudyToday: boolean;

  constructor(private FLAService: FLAService) { }

  ngOnInit(): void {
    this.getFlashcards();
  }

  getFlashcards() {
    this.FLAService.getFlashcardsByUserId().subscribe(flashcards => {
      this.flashcards = flashcards;

      console.log(this.flashcards);

      this.checkFlashcardsStatus()
    });
  }

  checkFlashcardsStatus() {
    let noOfFlashcardsNotYetStudied = 0;
    let noOfFlashcardsToReview = 0;

    this.flashcards.forEach(flashcard => {
      // If the flashcard hasnt been reviewed before add it to todays flashcards to review 
      if (flashcard.LastStudyDate === null) {
        noOfFlashcardsNotYetStudied++;
        this.newFlashcardsToStudyToday.push(flashcard);
      } else if (flashcard.Difficulty && flashcard.LastStudyDate) {
        let dueDate = this.calculateFlashcardDueDate(flashcard.Difficulty, flashcard.LastStudyDate);
        console.log(dueDate);
        // if dueDate is today then add flashcard to the todays flashcards

        if (moment(dueDate).isAfter(moment())) {
          noOfFlashcardsToReview++;
          this.oldFlashcardsToStudyToday.push(flashcard);
        }
      }
    });

    if (noOfFlashcardsNotYetStudied > 0) {
      this.noOfFlashcardsNotYetStudied = noOfFlashcardsNotYetStudied;
    }

    if (noOfFlashcardsToReview > 0) {
      this.noOfFlashcardsToReview = noOfFlashcardsToReview;
    }

  }

  calculateFlashcardDueDate(difficulty, lastStudyDate) {
    // interval of days between now and the next review date
    let reviewInterval = 0;

    if (difficulty === 5) {
      reviewInterval = 13;
    }
    if (difficulty === 4) {
      reviewInterval = 8;
    }
    if (difficulty === 3) {
      reviewInterval = 5;
    }
    if (difficulty === 2) {
      reviewInterval = 3;
    }
    if (difficulty === 1) {
      reviewInterval = 2;
    }
    if (difficulty === 0) {
      reviewInterval = 1;
    }

    let dueDate = moment(lastStudyDate, "DD-MM-YYYY").add(reviewInterval, 'd').format("DD-MM-YYYY");

    return dueDate;
  }

  initStudy() {
    this.isAbleToStudyToday = true;
  }

}
