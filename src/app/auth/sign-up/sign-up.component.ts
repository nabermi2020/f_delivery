import { User } from './../user.model';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registrationForm: FormGroup;
  userPassword: string;
  userRepeatedPassword: string;
  onlineMode: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
    this.onlineMode = navigator.onLine;
  }

/**
 * Initialize 'sign up' form's controls and appropriate validators
 */
  private initForm() {
    this.registrationForm = new FormGroup({
      "firstName": new FormControl('', [Validators.required, Validators.minLength(4)]),
      "lastName": new FormControl('', [Validators.required, Validators.minLength(4)]),
      "login": new FormControl('', [Validators.required, Validators.minLength(4)], this.forbiddenLogin.bind(this)),
      passwords: new FormGroup({
        "password": new FormControl('', [Validators.required, Validators.minLength(4), ]),
        "passwordRepeat": new FormControl('', [Validators.required, Validators.minLength(4)]),
        }, {
          validators: this.validatePasswords.bind(this) 
        }  
    ),
      "phone": new FormControl('', [Validators.required, Validators.minLength(10)]),
      "email": new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)], this.forbiddenEmail.bind(this)),
      "address": new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  get formField() {
    return this.registrationForm;
  }

/**
 * Check existence user with the same login
 * @param {FormControl} user's login
 * @return {Promise | Observable} returns checking results
 */
  forbiddenLogin(control: FormControl, fieldName): Promise<any> | Observable<any> {    
    const login = control.value;
    console.log(fieldName);

    const promise = new Promise( (resolve, reject) => {
      if (navigator.onLine) {
        if (login.length >= 4) {
          this.authService.checkFieldExistense('login', login).subscribe(
            
            (fieldCheckingRes: Response) => {
              console.log('Result=');
              if (fieldCheckingRes[0]) {
                if (fieldCheckingRes[0].login == login) {
                  resolve({'loginIsForbidden': true, 'isNetworkEnabled': false});
                }
              } else {
                  resolve(null);
              }
            },
  
            (error: Response) => {
              alert('Something went wrong!');
              console.log(error);
            }
          );
        }
      }
    });
    
    return promise;
  }

/**
 * Check existence user with the same login
 * @param {FormControl} user's email
 * @return {Promise | Observable} returns checking results
 */
  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const email = control.value;
    const promise  = new Promise( (resolve, reject) => {
      if (navigator.onLine) {
        if (email.length >= 6) {
          this.authService.checkFieldExistense('email', email).subscribe(
            res => {
              if (res[0]) {
                if (res[0].email == email) {
                  resolve({'emailIsForbidden': true, 'isNetworkEnabled': false});
                }
              } else {
                resolve(null);
              }
            }, 
            err => {
              alert(err);
            }
          );
        }
      }
    });

    return promise;
  }
  
 /**
  * Compare two passwords which were entered by user in appropriate fields
  * @param {FormGroup} users' passwords
  * @return {null || Obj} returns checking results
  */ 
  validatePasswords(registrationFormGroup: FormGroup) {
    const password = registrationFormGroup.controls.password.value;
    const repeatPassword = registrationFormGroup.controls.passwordRepeat.value;

    if (repeatPassword.length <= 0) {
        return null;
    }

    if (repeatPassword !== password) {
        return {
            doesMatchPassword: true
        };
    }
    return null;
}

/**
 * Create new user object and sign up it using 'authService'
 */
  onSignUp() {
    // console.log(this.registrationForm.value);
    // console.log(this.registrationForm);
    this.onlineMode = navigator.onLine;
    const userInfo = this.registrationForm.value;
    const newUser = new User(userInfo.firstName, userInfo.lastName,
                           userInfo.login, userInfo.passwords.password,
                           userInfo.phone, userInfo.email,
                           userInfo.address);
    
    if (this.registrationForm.valid && this.onlineMode) {
      this.authService.signUp(newUser);
    } else if (!this.onlineMode && !this.registrationForm.valid) {
      this.registrationForm.patchValue({login: "", email: ""});
    }                  
  }

}
