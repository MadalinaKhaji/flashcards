import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  register() {
    let firstName = this.registerForm.value.firstName;
    let lastName = this.registerForm.value.lastName;
    let username = this.registerForm.value.username;
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;

    if (firstName && lastName && username && email && password) {
      this.authService.register(firstName, lastName, username, email, password).subscribe(() => {
        console.log('User registered succesfully..');
      });
    }
  }
}
