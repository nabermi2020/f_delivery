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

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get login() {
    return this.registrationForm.get('login');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('passwords.password');  
  }

  get passwordRepeat() {
    return this.registrationForm.get('passwords.passwordRepeat');  
  }

  get phone() {
    return this.registrationForm.get('phone');
  }

  get address() {
    return this.registrationForm.get('address');
  }

  get passwords() {
    return this.registrationForm.get('passwords');
  }

  forbiddenLogin(control: FormControl): Promise<any> | Observable<any> {
//    
    let login = control.value;
    let queryResult;
    let promise = new Promise( (resolve, reject) => {
      if (login.length >= 4) {
        this.authService.checkUser(login).subscribe(
          res => {
            console.log('Result=');
            //console.log(res);
            queryResult = res[0];
            if(res[0]) {
              if (res[0].login==login) {
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

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    let email = control.value;
    let queryResult;
    let promise  = new Promise( (resolve, reject) => {
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
    })

    return promise;
  }
  
  forbiddenPassword(control: FormControl):  Promise<any> | Observable<any> {
    this.userPassword = control.value;
    let promise = new Promise( (resolve, reject) => {
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

  forbiddenRepeatedPassword(control: FormControl):  {[s: string]: boolean} {
    this.userRepeatedPassword = control.value;
    console.log(this.userRepeatedPassword);
    return {'password': true};
  }

  validatePasswords(registrationFormGroup: FormGroup) {
    let password = registrationFormGroup.controls.password.value;
    let repeatPassword = registrationFormGroup.controls.passwordRepeat.value;
    console.log(password);
    console.log(repeatPassword);
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
  



  onSignUp() {
    console.log(this.registrationForm.value);
    console.log(this.registrationForm);
    let userInfo = this.registrationForm.value;
    let newUser = new User(userInfo.firstName, userInfo.lastName,
                           userInfo.login, userInfo.password,
                           userInfo.phone, userInfo.email,
                           userInfo.address);
    //You should proceed with validations!!!
    if (this.registrationForm.valid) {
      this.authService.signUp(newUser);
    } else {
     // this.authService.signUp(newUser);
    }                          
  }

}
