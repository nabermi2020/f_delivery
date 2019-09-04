import { AuthService } from './../../auth/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EditModalService } from 'src/app/shared/servives/edit-modal.service';

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
    this.route.firstChild.params.subscribe( (par: Params) => {
      this.id = par["id"];
      this.currentUser = this.authService.getCurrentUser();
      console.log(this.currentUser);
      this.initForm();
    });
  }

  initForm() {
    this.editForm = new FormGroup({
      'firstName': new FormControl(this.currentUser["firstName"]),
      'lastName': new FormControl(this.currentUser["lastName"]),
      'phone': new FormControl(this.currentUser["phone"]),
      'address': new FormControl(this.currentUser["address"]),
      passwords: new FormGroup({
        "password": new FormControl(''),
        "passwordRepeat": new FormControl(''),
        })
    });
  }

  closeModal() {
    this.editProfile.toggleEditMode();
  }

  saveChanges() {
    console.log('Save changes!!!');
  }

}
