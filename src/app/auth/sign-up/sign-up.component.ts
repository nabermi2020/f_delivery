import { User } from './../user.model';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
      "firstName": new FormControl('', [Validators.required, Validators.minLength(4)]),
      "lastName": new FormControl('', [Validators.required, Validators.minLength(4)]),
      "login": new FormControl('', [Validators.required, Validators.required, Validators.minLength(5)]),
      "password": new FormControl('', Validators.required),
      "repeatPassword": new FormControl('', Validators.required),
      "phone": new FormControl(''),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "address": new FormControl('')
    });
  }

  onSignUp() {
    console.log(this.registrationForm.value);
    console.log(this.registrationForm);
    let userInfo = this.registrationForm.value;
    let newUser = new User(userInfo.firstName, userInfo.lastName,
                           userInfo.login, userInfo.password,
                           userInfo.phone, userInfo.email,
                           userInfo.address);
    if (this.registrationForm.valid) {
      this.authService.addNewUser(newUser);
    }                           
  }

}
