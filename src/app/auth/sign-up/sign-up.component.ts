import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registrationForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.registrationForm = new FormGroup({
      "firstName": new FormControl(),
      "lastName": new FormControl(),
      "login": new FormControl(),
      "password": new FormControl(),
      "repeatPassword": new FormControl(),
      "phone": new FormControl(),
      "email": new FormControl(),
      "address": new FormControl()
    });
  }

  onSignUp() {
    console.log(this.registrationForm);
  }

}
