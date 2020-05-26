import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  status: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    setInterval(() => {
      this.status = this.authService.isLoggedIn();

      if(!this.status) {
        this.logout();
      }
    }, 1000)
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }
}
