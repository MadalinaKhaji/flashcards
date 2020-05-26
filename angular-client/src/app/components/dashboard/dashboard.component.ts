import { Component, OnInit } from '@angular/core';

import { FlashcardsService } from './../../services/flashcards.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit(): void {
    this.flashcardsService.getUsers().subscribe(res => {
      console.log(res);
    });
  }

}
