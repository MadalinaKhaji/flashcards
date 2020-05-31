import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardsService } from './../../../services/flashcards.service';
import { Flashcard } from './../../../models/flashcard.model';

@Component({
  selector: 'app-flashcard-edit',
  templateUrl: './flashcard-edit.component.html',
  styleUrls: ['./flashcard-edit.component.css']
})
export class FlashcardEditComponent implements OnInit {

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

  editFlashcardForm = this.formBuilder.group({
    note: [''],
    visibility: [''],
    formatType: ['', Validators.required],
    sourceURL: [''],
    front: [''],
    back: [''],
    context: [''],
    blank: [''],
    favorite: [''],
    tag: ['']
  });

  constructor(private formBuilder: FormBuilder, private flashcardsService: FlashcardsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFlashcard(this.route.snapshot.params['id']);
  }

  getFlashcard(id) {
    this.flashcardsService.getFlashcardById(id).subscribe(flashcard => {
      this.flashcard = flashcard;
      console.log(this.flashcard);
      this.updateFormValues(this.flashcard);
    });
  }

  updateFormValues(flashcard: Flashcard) {
    this.editFlashcardForm.patchValue({
      note: flashcard.Note,
      visibility: flashcard.Visibility,
      formatType: flashcard.FormatType,
      sourceURL: flashcard.SourceURL,
      front: flashcard.Front,
      back: flashcard.Back,
      context: flashcard.Context,
      blank: flashcard.Blank,
      favorite: flashcard.Favorite,
      tag: flashcard.Tag
    });
  }

  editFlashcard() {
    let note = this.editFlashcardForm.value.note;
    let visibility = this.editFlashcardForm.value.visibility;
    visibility = (visibility === 'true');
    let formatType = this.editFlashcardForm.value.formatType;
    let sourceURL = this.editFlashcardForm.value.sourceURL;
    let front = this.editFlashcardForm.value.front;
    let back = this.editFlashcardForm.value.back;
    let context = this.editFlashcardForm.value.context;
    let blank = this.editFlashcardForm.value.blank;
    let favorite = this.editFlashcardForm.value.favorite;
    favorite = (favorite === 'true');
    let tag = this.editFlashcardForm.value.tag;
    // convert tag to array of string
    // TBA 
    let tags = [];
    tags.push(tag);

    if (formatType) {
      this.flashcardsService.updateFlashcardById(note, visibility, formatType, sourceURL, front, back, context, blank, favorite, tags).subscribe(() => {
        console.log('Flashcard updated succesfully');
        this.router.navigate(['/flashcard-detail', this.flashcard.FlashcardId]);
      });
    }
  }

}
