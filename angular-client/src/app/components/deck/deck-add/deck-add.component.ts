import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FLAService } from './../../../services/fla.service';

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

  constructor(private formBuilder: FormBuilder, private FLAService: FLAService) { }

  ngOnInit(): void {
  }

  addDeck() {
    let name = this.addDeckForm.value.name;
    let subject = this.addDeckForm.value.subject;
    let description = this.addDeckForm.value.description;
    let favorite = this.addDeckForm.value.favorite;
    // Converting to boolean
    favorite = (favorite === 'true');

    this.FLAService.addDeck(name, subject, description, favorite).subscribe(() => {
      console.log('Deck added succesfully..');
    });
  }

}
