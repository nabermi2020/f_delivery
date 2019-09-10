import { AuthService } from './../../auth/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EditModalService } from 'src/app/shared/servives/edit-modal.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  id: any;
  currentUser: any;

  constructor(private editProfile: EditModalService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.firstChild.params.subscribe( 
      (par: Params) => {
        this.id = par["id"];
        this.currentUser = this.authService.getCurrentUser();
        this.initForm();
        //console.log(this.currentUser);
    });
  }

  //Needs to extend validation logic for all fields except passwords validation
  initForm() {
    this.editForm = new FormGroup({
      'firstName': new FormControl(this.currentUser["firstName"]),
      'lastName': new FormControl(this.currentUser["lastName"]),
      'phone': new FormControl(this.currentUser["phone"]),
      'address': new FormControl(this.currentUser["address"]),
      passwords: new FormGroup({
        "password": new FormControl('', [Validators.required, Validators.minLength(4) ]),
        "passwordRepeat": new FormControl('', [Validators.required, Validators.minLength(4) ]),
        }, {
          validators: this.validatePasswords.bind(this)
        }
      )
    });
  }

  getDataByFieldName(data) {
    return this.editForm.get(data);
  }


  validatePasswords(registrationFormGroup: FormGroup) {
    let password = registrationFormGroup.controls.password.value;
    let repeatPassword = registrationFormGroup.controls.passwordRepeat.value;
  
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

  closeModal() {
    this.editProfile.toggleEditMode();
  }

  saveChanges() {
    let formData = this.editForm.value;
  
    this.authService.checkUserInfo(formData)
      .subscribe(
        res => {
          //console.log(res);
          if (res.length > 0 ) {
            this.authService.updateUserInfo(formData)
              .subscribe(
                res => {
                  console.log(res);
                  this.closeModal();
                  this.authService.updateUserData();
                },

                err => {
                  console.log('something went wrong!!!');
                }
              )
          }
        }, 

        err => {
          console.log('Something went wrong!');
        }
      )
  }
}
