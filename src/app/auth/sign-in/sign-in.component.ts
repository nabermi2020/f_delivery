import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  authStatus: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  onLogin(form: NgForm) {
    let login = form.value.login;
    let password = form.value.password;
    this.authStatus = this.authService.signIn(login, password); 
      
    console.log(this.authStatus); 
  }

}
