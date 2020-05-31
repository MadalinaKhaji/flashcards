import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlashcardsService } from './../../../services/flashcards.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flashcard-add',
  templateUrl: './flashcard-add.component.html',
  styleUrls: ['./flashcard-add.component.css']
})
export class FlashcardAddComponent implements OnInit {

  addFlashcardForm = this.formBuilder.group({
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

  constructor(private formBuilder: FormBuilder, private flashcardsService: FlashcardsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  addFlashcard() {
    let note = this.addFlashcardForm.value.note;
    let visibility = this.addFlashcardForm.value.visibility;
    visibility = (visibility === 'true');
    let formatType = this.addFlashcardForm.value.formatType;
    let sourceURL = this.addFlashcardForm.value.sourceURL;
    let front = this.addFlashcardForm.value.front;
    let back = this.addFlashcardForm.value.back;
    let context = this.addFlashcardForm.value.context;
    let blank = this.addFlashcardForm.value.blank;
    let favorite = this.addFlashcardForm.value.favorite;
    favorite = (favorite === 'true');
    let tag = this.addFlashcardForm.value.tag;
    // convert tag to array of string
    // TBA 
    let tags = [];
    tags.push(tag);
    console.log(typeof tags);

    let deckId = this.route.snapshot.params['id'];

    this.flashcardsService.addFlashcard(note, visibility, formatType, sourceURL, front, back, context, blank, favorite, tags, deckId).subscribe(() => {
      console.log('Flashcard added succsfully..');
    });
  }
}
