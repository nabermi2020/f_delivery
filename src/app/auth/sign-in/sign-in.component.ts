import { LoadingService } from '../../shared/services/loading.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  authStatus: boolean = true;

  constructor(private authService: AuthService, private loadingService: LoadingService, private editModal: EditModalService) { }

  ngOnInit() {}

/**
 * Provide user login using appropriate credentials
 * @param {NgForm} login and password.
 */
  // jfyi: if you will use reactive forms there will be no needs to pass it through the method you will have access to the form in whole component
  onLogin(form: NgForm) {
    // again better to write:
    // const { login, password } = form.value;
    const login = form.value.login;
    const password = form.value.password;
    const credentials = {
      "login": login,
      "password": password
    };

    this.authStatus =  this.authService.signInn(login, password);
    if (this.authService) {
      localStorage.setItem("userInfo", JSON.stringify(credentials));
      // please try to write clean code, and evoid using unnecessary empty spaces like on line below

    }

    // this.loadingService.toggleLoading();
    // //this.loadingService.toggleLoading();
    // this.editModal.toggleEditMode();
  }

}
