import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FLAService } from '../../../services/fla.service';
import { User } from '../../../models/user.model';
import { Flashcard } from '../../../models/flashcard.model';
import * as moment from 'moment';

@Component({
  selector: 'app-study-flashcards',
  templateUrl: './study-flashcards.component.html',
  styleUrls: ['./study-flashcards.component.css']
})
export class StudyFlashcardsComponent implements OnInit {

  @Input() flashcards: Flashcard[];

  user: User;

  totalFlashcards: number;
  index: number;
  currentFlashcard: Flashcard;
  canBeFlipped: boolean;

  ratingsForm = this.formBuilder.group({
    difficulty: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private FLAService: FLAService, private router: Router) { }

  ngOnInit(): void {
    this.index = 0;
    this.totalFlashcards = this.flashcards.length;
    this.canBeFlipped = false;
    this.getCurrentUser();
    this.getFlashcard(this.flashcards[this.index].FlashcardId);
  }

  getCurrentUser() {
    this.FLAService.getUserById().subscribe((results: User) => {
      this.user = results;
    });
  }

  getFlashcard(id) {
    this.FLAService.getFlashcardById(id).subscribe(flashcard => {
      this.currentFlashcard = flashcard;

      if (this.currentFlashcard.FlashcardId === null) {
        this.currentFlashcard.FlashcardId = id;
      }

      if (this.currentFlashcard.Visibility === false) {
        this.next();
      }

      console.log(this.currentFlashcard);
    });
  }

  flip() {
    this.canBeFlipped = true;
  }

  next() {
    if (this.user.SRS && this.currentFlashcard.Visibility) {
      let difficulty = this.ratingsForm.value.difficulty;

      let currentTimestamp = moment().unix();
      let latestStudyDate = moment(currentTimestamp * 1000).format("YYYY-MM-DD HH:mm:ss");

      this.currentFlashcard.Difficulty = difficulty;
      this.currentFlashcard.LastStudyDate = latestStudyDate;

      this.updateFlashcard(this.currentFlashcard);
    }

    this.index++;

    if (this.index === this.totalFlashcards) {
      this.canBeFlipped = false;

      this.currentFlashcard = null;

      this.addStudySession();
    } else {
      this.canBeFlipped = false;

      this.getFlashcard(this.flashcards[this.index].FlashcardId);
    }
  }

  updateFlashcard(flashcard) {
    this.FLAService.updateFlashcard(flashcard).subscribe(results => {
      console.log(results);
    });
  }

  addStudySession() {
    let currentTimestamp = moment().unix();
    let studySessionDate = moment(currentTimestamp * 1000).format("YYYY-MM-DD HH:mm:ss");

    this.FLAService.addStudySession(studySessionDate, this.totalFlashcards).subscribe(results => {
      console.log('Added session succesfully');
    });
  }

  reloadDashboard() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }

}
