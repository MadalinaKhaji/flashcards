import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FLAService } from './../../../services/fla.service';

import { Flashcard } from 'src/app/models/flashcard.model';

@Component({
  selector: 'app-flashcard-add',
  templateUrl: './flashcard-add.component.html',
  styleUrls: ['./flashcard-add.component.css']
})
export class FlashcardAddComponent implements OnInit {

  currentFormatType: string;
  currentFlashcardType: string;

  addFlashcardForm = this.formBuilder.group({
    note: [''],
    formatType: ['', Validators.required],
    flashcardType: ['', Validators.required],
    sourceURL: [''],
    front: [''],
    back: [''],
    context: [''],
    blank: [''],
    tag: ['']
  });

  constructor(private formBuilder: FormBuilder, private FLAService: FLAService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentFormatType = 'text';
    this.currentFlashcardType = 'classic';
  }

  addFlashcard() {
    let tagsString = this.addFlashcardForm.value.tag;
    // convert tagsString to array of string
    let tags = tagsString.split(',');

    let flashcardToBeAdded: Flashcard = {
      Note: this.addFlashcardForm.value.note,
      FormatType: this.addFlashcardForm.value.formatType,
      SourceURL: this.addFlashcardForm.value.sourceURL,
      Front: this.addFlashcardForm.value.front,
      Back: this.addFlashcardForm.value.back,
      Context: this.addFlashcardForm.value.context,
      Blank: this.addFlashcardForm.value.blank,
      Tags: tags,
      DeckId: this.route.snapshot.params['id']
    };

    this.FLAService.addFlashcard(flashcardToBeAdded).subscribe(() => {
      console.log('Flashcard added succesfully..');
    });
  }
}
