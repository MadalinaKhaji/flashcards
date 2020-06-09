import { Component, OnInit } from '@angular/core';
import { FLAService } from './../../../services/fla.service';
import { Flashcard } from './../../../models/flashcard.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {

  flashcards: Flashcard[];

  id: number;

  constructor(private FLAService: FLAService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.FLAService.getFlashcardsByDeckId(this.route.snapshot.params['id']).subscribe((flashcards: Flashcard[]) => {
      this.flashcards = flashcards;

      console.log(this.flashcards);
    });
  }

}
