import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
 

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  authStatus: boolean = true;
   
  constructor(private authService: AuthService) { }

  ngOnInit() {}

/**
 * Provide user login using appropriate credentials
 * @param {NgForm} login and password.
 */
  onLogin(form: NgForm) {
    let login = form.value.login;
    let password = form.value.password;
    let credentials = {
      "login": login,
      "password": password
    }
   
    this.authStatus =  this.authService.signInn(login, password); 
    if (this.authService) {
      localStorage.setItem("userInfo", JSON.stringify(credentials));
    }   
  }

}
