import { EditModalService } from '../../shared/services/edit-modal.service';
import { AuthService } from '../../auth/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  id: number;
  editMode: any;
  userData: User;
  editSubscription: Subscription;
  objectKeys = Object.keys;
  userViewTemplate = {
    'First Name': '',
    'Last Name': '',
    'login': '',
    'phone': '',
    'email': '',
    'address': ''
  };

  constructor(private authService: AuthService,
              private editModal: EditModalService) { }

  ngOnInit() {
    this.userData = this.authService.getCurrentUser();
    this.userDataMap();
    this.subscribeToModalToggling();
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }

  public subscribeToModalToggling(): void {
    this.editSubscription = this.editModal.onEditChange.subscribe(
      (togglingRes: boolean) => {
        this.editMode = togglingRes;
      }
    );
  }

  public userDataMap() {
    for ( let {'First Name': firstName, 'Last Name': lastName, login, phone, email, address} of [this.userViewTemplate]) {
      const {firstName, lastName, login, phone, email, address} = this.userData;
      this.userViewTemplate = { 'First Name': firstName, 'Last Name': lastName, login, phone, email, address};
    }
  }

  public editProfile(): void {
    this.editModal.toggleEditMode();
  }
}
