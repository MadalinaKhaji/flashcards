import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

export type EditorType = 'login' | 'register';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  editor: EditorType = 'login';

  status: boolean;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.status = this.authService.isLoggedIn();
  }

  get showLoginEditor() {
    return this.editor === 'login' && !this.status;
  }

  get showRegisterEditor() {
    return this.editor === 'register' && !this.status;
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }
}
