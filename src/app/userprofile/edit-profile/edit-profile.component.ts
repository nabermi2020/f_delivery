import { User } from './../../auth/user.model';

import { AuthService } from '../../auth/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  id: number;
  currentUser: User;
  checkUserInfoSubscription = new Subscription();
  checkRouteParamsSub = new Subscription();
  firstNameMinLength: number = 4;
  lastNameMinLength: number = 4;
  phoneMinLength: number = 10;
  addressMinLength: number = 5;
  passwordMinLength: number = 5;

  constructor(private editProfile: EditModalService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.subscribeToRouteParams();
  }

  ngOnDestroy() {
    this.checkUserInfoSubscription.unsubscribe();
    this.checkRouteParamsSub.unsubscribe();
  }

  public subscribeToRouteParams(): void {
    this.checkRouteParamsSub = this.route.params.subscribe( 
      (userData: Params) => {
        this.id = userData["id"];
        this.currentUser = this.authService.getCurrentUser();
        this.initForm();
    });
  }

  private initForm(): void {
    this.editForm = new FormGroup({
      'firstName': new FormControl(this.currentUser["firstName"], [Validators.required, Validators.minLength(this.firstNameMinLength)]),
      'lastName': new FormControl(this.currentUser["lastName"], [Validators.required, Validators.minLength(this.lastNameMinLength)]),
      'phone': new FormControl(this.currentUser["phone"], [Validators.required, Validators.minLength(this.phoneMinLength)]),
      'address': new FormControl(this.currentUser["address"], [Validators.required, Validators.minLength(this.addressMinLength)]),
      passwords: new FormGroup({
        "password": new FormControl('', [Validators.required, Validators.minLength(this.passwordMinLength) ]),
        "passwordRepeat": new FormControl('', [Validators.required, Validators.minLength(this.passwordMinLength) ]),
        }, {
          validators: this.validatePasswords.bind(this)
        }
      )
    });
  }

  public getDataByFieldName(data: string) {
    return this.editForm.get(data);
  }
 
  private validatePasswords(registrationFormGroup: FormGroup): null | {doesMatchPassword: boolean} {
    const { password, passwordRepeat } = registrationFormGroup.value;
    
    if (passwordRepeat.length <= 0) {
        return null;
    }

    if (passwordRepeat !== password) {
        return {
            doesMatchPassword: true
        };
    }
    return null;
}

  public closeModal(): void {
    this.editProfile.toggleEditMode();
  }

  public saveChanges(): void {
    const formData = this.editForm.value;
    this.checkUserInfoSubscription = this.authService.checkUserInfo(formData)
      .subscribe(
        this.onSaveChangesSuccess.bind(this),
        this.onSaveChangesFailure.bind(this)
      );
  }

  private onSaveChangesSuccess(): void {
    this.authService.updateUserInfo(this.editForm.value)
      .subscribe(
        this.onUpdateUserInfoSuccess.bind(this),
        this.onUpdateUserInfoFailure.bind(this)
      );
  }

  private onUpdateUserInfoSuccess(): void {
    this.closeModal();
    this.authService.updateUserData();
  }

  private onUpdateUserInfoFailure(): void {
    this.closeModal();
    let activeCategory = this.getLocalProductList().category;
    this.router.navigate([`dashboard/products/${activeCategory}`]);
    console.log('something went wrong!');
  }

  private onSaveChangesFailure(): void {
      this.closeModal();
      let activeCategory = this.getLocalProductList().category;
      this.router.navigate([`dashboard/products/${activeCategory}`]);
  }

  private getLocalProductList() {
    return JSON.parse(localStorage.getItem("productList"));
  }
}
