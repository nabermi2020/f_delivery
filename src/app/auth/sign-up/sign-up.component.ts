import { User } from './../user.model';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private authService: AuthService) { }

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
    console.log(this.registrationForm.value);
    let userInfo = this.registrationForm.value;
    let newUser = new User(userInfo.firstName, userInfo.lastName,
                           userInfo.login, userInfo.password,
                           userInfo.phone, userInfo.email,
                           userInfo.address);
    this.authService.addNewUser(newUser);
  }

}
