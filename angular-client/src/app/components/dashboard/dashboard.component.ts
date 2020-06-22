import { Component, OnInit } from '@angular/core';
import { FLAService } from '../../services/fla.service';
import { User } from '../../models/user.model';
import { Flashcard } from '../../models/flashcard.model';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  user: User;
  flashcards: Flashcard[];
  isHidden: boolean;

  noOfFlashcardsNotYetStudied: number;
  noOfFlashcardsToStudyUsingSRS: number;

  flashcardsToStudyToday: Flashcard[] = [];
  newFlashcardsToStudyToday: Flashcard[] = [];
  selectedFlashcardsToStudyToday: Flashcard[] = [];

  constructor(private FLAService: FLAService) { }

  ngOnInit(): void {
    this.isHidden = false;
    this.getCurrentUser();
    this.getFlashcards();
  }

  getCurrentUser() {
    this.FLAService.getUserById().subscribe((results: User) => {
      this.user = results;
    });
  }

  getFlashcards() {
    this.FLAService.getFlashcardsByUserId().subscribe(flashcards => {
      this.flashcards = flashcards;

      this.checkFlashcardsStatus();
    });
  }

  checkFlashcardsStatus() {
    this.flashcards.forEach(flashcard => {
      // check if there are new flashcards to study 
      if (flashcard.LastStudyDate === null) {
        this.newFlashcardsToStudyToday.push(flashcard);
      } else if (this.user.SRS) {
        // check if SRS is enabled then calculate due date 
        let dueDate = this.calculateFlashcardDueDate(flashcard.Difficulty, flashcard.LastStudyDate);
        //Convert current time to moment object with utc time
        let currentDate = moment.utc(moment(), 'YYYY-MM-DD[T]HH:mm[Z]');

        if (moment(currentDate).isAfter(dueDate)) {
          this.flashcardsToStudyToday.push(flashcard);
        }
      }
    });

    if (this.newFlashcardsToStudyToday.length > 0) {
      this.noOfFlashcardsNotYetStudied = this.newFlashcardsToStudyToday.length;
    }

    if (this.flashcardsToStudyToday.length > 0) {
      this.noOfFlashcardsToStudyUsingSRS = this.flashcardsToStudyToday.length;
    }
  }

  determineStudyInterval(difficulty, lastStudyDate) {
    let studyInterval = 0;

    if (difficulty) {
      studyInterval = this.fibonacci(difficulty);
    }

    if (lastStudyDate) {

    }

    return studyInterval;
  };

  fibonacci(n) {
    return n < 1 ? 0 : n <= 2 ? 1 : this.fibonacci(n - 1) + this.fibonacci(n - 2);
  };

  calculateFlashcardDueDate(difficulty, lastStudyDate) {
    let studyInterval = this.determineStudyInterval(difficulty, lastStudyDate);

    console.log(studyInterval);

    let dueDate = moment(lastStudyDate, "YYYY-MM-DD HH:mm:ss").add(studyInterval, 'd').format("YYYY-MM-DD HH:mm:ss");

    return moment.utc(dueDate, 'YYYY-MM-DD[T]HH:mm[Z]');
  }

  initStudy(option) {
    if (option === 'studyNewFlashcards') {
      this.selectedFlashcardsToStudyToday = this.newFlashcardsToStudyToday;
    } else if (option === 'studyUsingSRS') {
      this.selectedFlashcardsToStudyToday = this.flashcardsToStudyToday;
    }

    if (this.selectedFlashcardsToStudyToday) {
      this.isHidden = true;
    }
  }

}
