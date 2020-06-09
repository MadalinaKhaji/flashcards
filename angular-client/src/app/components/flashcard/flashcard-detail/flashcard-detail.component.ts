import { Component, OnInit } from '@angular/core';
import { FLAService } from './../../../services/fla.service';
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
    SelfAssesmentScore: '',
    Difficulty: null,
    LastStudyDate: null,
    StudyInterval: null,
    Favorite: null,
    Front: '',
    Back: '',
    Context: '',
    Blank: '',
    Tags: null,
    DeckId: null
  };

  constructor(private FLAService: FLAService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFlashcardDetails(this.route.snapshot.params['id']);
  }

  getFlashcardDetails(id) {
    this.FLAService.getFlashcardById(id).subscribe(flashcard => {
      this.flashcard = flashcard

      console.log(this.flashcard);
    });
  }

  deleteFlashcard(id) {
    this.FLAService.deleteFlashcardById(id).subscribe(() => {
      console.log('Flashcard deleted succesfully..');
      this.router.navigateByUrl('/dashboard');
    });
  }

}
