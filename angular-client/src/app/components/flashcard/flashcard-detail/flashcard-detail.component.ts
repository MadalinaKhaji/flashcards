import { Component, OnInit } from '@angular/core';
import { FlashcardsService } from './../../../services/flashcards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Flashcard } from './../../../models/flashcard.model';

@Component({
  selector: 'app-flashcard-detail',
  templateUrl: './flashcard-detail.component.html',
  styleUrls: ['./flashcard-detail.component.css']
})
export class FlashcardDetailComponent implements OnInit {

  flashcard: Flashcard = {
    FlashcardId: null,
    Note: '',
    Visibility: null,
    FormatType: '',
    SourceURL: '',
    SelfAssesment: '',
    Difficulty: null,
    LastReviewDate: null,
    ReviewInterval: null,
    Favorite: null,
    Front: '',
    Back: '',
    Context: '',
    Blank: '',
    Tag: null,
    DeckId: null
  };

  constructor(private flashcardService: FlashcardsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFlashcardDetails(this.route.snapshot.params['id']);
  }

  getFlashcardDetails(id) {
    this.flashcardService.getFlashcardById(id).subscribe(flashcard => {
      this.flashcard = flashcard

      console.log(this.flashcard);
    });
  }

  deleteFlashcard(id) {
    this.flashcardService.deleteFlashcardById(id).subscribe(() => {
      console.log('Flashcard deleted succesfully..');
      this.router.navigateByUrl('/dashboard');
    });
  }

}
