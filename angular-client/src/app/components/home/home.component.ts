import { Component, OnInit } from '@angular/core';

export type EditorType = 'login' | 'register';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  editor: EditorType = 'login';

  constructor() { }

  ngOnInit(): void {
  }

  get showLoginEditor() {
    return this.editor === 'login';
  }

  get showRegisterEditor() {
    return this.editor === 'register';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }
}
