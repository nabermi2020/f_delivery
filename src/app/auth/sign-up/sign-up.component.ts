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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
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

  // Need refactoring
  get firstName() {
    return this.registrationForm.get('firstName');
  }

 // Need refactoring
  get lastName() {
    return this.registrationForm.get('lastName');
  }

// Need refactoring
  get login() {
    return this.registrationForm.get('login');
  }

// Need refactoring
  get email() {
    return this.registrationForm.get('email');
  }

// Need refactoring  
  get password() {
    return this.registrationForm.get('passwords.password');  
  }

// Need refactoring  
  get passwordRepeat() {
    return this.registrationForm.get('passwords.passwordRepeat');  
  }

// Need refactoring  
  get phone() {
    return this.registrationForm.get('phone');
  }

// Need refactoring  
  get address() {
    return this.registrationForm.get('address');
  }

/**
 * Return passwords from appropriate fields
 * @return {FormGroup} return FormGroup with represents passwords  
 */  
  get passwords() {
    return this.registrationForm.get('passwords');
  }

/**
 * Check existence user with the same login
 * @param {FormControl} user's login
 * @return {Promise | Observable} returns checking results
 */
  forbiddenLogin(control: FormControl): Promise<any> | Observable<any> {    
    const login = control.value;
    let queryResult;
    const promise = new Promise( (resolve, reject) => {
      if (login.length >= 4) {
        this.authService.checkUser(login).subscribe(
          res => {
            console.log('Result=');
            queryResult = res[0];
            if (res[0]) {
              if (res[0].login == login) {
                resolve({'loginIsForbidden': true});
              }
            } else {
                resolve(null);
            }
          },

          err => {
            alert('Something went wrong!');
          }
        );
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
      if (email.length >= 6) {
        this.authService.checkEmail(email).subscribe(
          res => {
            console.log('Email= ');
            if (res[0]) {
              if (res[0].email == email) {
                resolve({'emailIsForbidden': true});
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
    // console.log(password);
    // console.log(repeatPassword);
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
    console.log(this.registrationForm.value);
    console.log(this.registrationForm);
    const userInfo = this.registrationForm.value;
    const newUser = new User(userInfo.firstName, userInfo.lastName,
                           userInfo.login, userInfo.passwords.password,
                           userInfo.phone, userInfo.email,
                           userInfo.address);
    console.log(newUser);

    if (this.registrationForm.valid) {
      this.authService.signUp(newUser);
    }                         
  }

    // It's not used
    forbiddenPassword(control: FormControl): Promise<any> | Observable<any> {
      this.userPassword = control.value;
      const promise = new Promise( (resolve, reject) => {
        if (this.userPassword != this.userRepeatedPassword) {
          resolve({"isPasswordDifferent": true});
          console.log('y');
        } else {
          console.log('n');
          resolve(null);
        }
      });
      return promise;
    }
  
    // It's not used
    forbiddenRepeatedPassword(control: FormControl): {[s: string]: boolean} {
      this.userRepeatedPassword = control.value;
      console.log(this.userRepeatedPassword);
      return {'password': true};
    }
}
