import { Component, OnInit } from '@angular/core';
import { FLAService } from '../../services/fla.service';
import { Flashcard } from '../../models/flashcard.model';
import { UserSettings } from '../../models/user.setting.model';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  flashcards: Flashcard[];
  isSRSEnabled: boolean;
  isHidden: boolean;

  noOfFlashcardsNotYetStudied: number;
  noOfFlashcardsToStudyUsingSRS: number;

  flashcardsToStudyToday: Flashcard[] = [];
  newFlashcardsToStudyToday: Flashcard[] = [];
  selectedFlashcardsToStudyToday: Flashcard[] = [];

  constructor(private FLAService: FLAService) { }

  ngOnInit(): void {
    this.isHidden = false;
    this.getSRSStatus();
    this.getFlashcards();
  }

  getSRSStatus() {
    this.FLAService.getSRSByUserId().subscribe((results: UserSettings) => {
      this.isSRSEnabled = results.SRS;
    });
  }

  getFlashcards() {
    this.FLAService.getFlashcardsByUserId().subscribe(flashcards => {
      this.flashcards = flashcards;

      this.checkFlashcardsStatus()
    });
  }

  checkFlashcardsStatus() {
    let noOfFlashcardsNotYetStudied = 0;
    let noOfFlashcardsToStudyUsingSRS = 0;

    this.flashcards.forEach(flashcard => {
      // If the flashcard hasnt been reviewed before add it to todays flashcards to review 
      if (flashcard.LastStudyDate === null) {
        noOfFlashcardsNotYetStudied++;
        this.newFlashcardsToStudyToday.push(flashcard);
      } else if (this.isSRSEnabled) {
        let dueDate = this.calculateFlashcardDueDate(flashcard.StudyInterval, flashcard.LastStudyDate);
        console.log(dueDate);
        let currentTimestamp = moment().unix();//in seconds
        let currentDate = moment(currentTimestamp * 1000).format("YYYY-MM-DD HH:mm:ss");
        if (moment(dueDate).isAfter(currentDate)) {
          noOfFlashcardsToStudyUsingSRS++;
          this.flashcardsToStudyToday.push(flashcard);
        }
      }
    });

    if (noOfFlashcardsNotYetStudied > 0) {
      this.noOfFlashcardsNotYetStudied = noOfFlashcardsNotYetStudied;
    }

    if (noOfFlashcardsToStudyUsingSRS > 0) {
      this.noOfFlashcardsToStudyUsingSRS = noOfFlashcardsToStudyUsingSRS;
    }

  }

  calculateFlashcardDueDate(studyInterval, lastStudyDate) {
    let dueDate = moment(lastStudyDate, "YYYY-MM-DD HH:mm:ss").add(studyInterval, 'd').format("YYYY-MM-DD HH:mm:ss");

    return dueDate;
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
