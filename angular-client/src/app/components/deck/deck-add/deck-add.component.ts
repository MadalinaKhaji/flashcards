import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlashcardsService } from './../../../services/flashcards.service';

@Component({
  selector: 'app-deck-add',
  templateUrl: './deck-add.component.html',
  styleUrls: ['./deck-add.component.css']
})
export class DeckAddComponent implements OnInit {

  addDeckForm = this.formBuilder.group({
    name: ['', Validators.required],
    subject: ['', Validators.required],
    description: [''],
    favorite: ['']
  });

  constructor(private formBuilder: FormBuilder, private flashcardsService: FlashcardsService) { }

  ngOnInit(): void {
  }

  addDeck() {
    let name = this.addDeckForm.value.name;
    let subject = this.addDeckForm.value.subject;
    let description = this.addDeckForm.value.description;
    let favorite = this.addDeckForm.value.favorite;
    // Converting to boolean
    favorite = (favorite === 'true');

    this.flashcardsService.addDeck(name, subject, description, favorite).subscribe(() => {
      console.log('Deck added succesfully..');
    });
  }

}
