import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    if (email && password) {
      this.authService.login(email, password).subscribe(res => {
        console.log('Login succesful');
        this.authService.setSession(res);
        this.router.navigateByUrl('/dashboard');
      });
    }
  }
}
