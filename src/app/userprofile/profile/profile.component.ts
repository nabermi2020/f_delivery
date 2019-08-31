import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { User } from './../../auth/user.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditModalService } from 'src/app/shared/servives/edit-modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  id: number;
  editMode: any;
  userData: User;
  subscription: Subscription;
  objectKeys = Object.keys;
  userViewTemplate = {
    "First Name": '',
    "Last Name": '',
    "Login": '',
    "Phone": '',
    "Email": '',
    "Address": ''
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private editModal: EditModalService) { }

  ngOnInit() {
    this.subscription = this.route.firstChild.params.subscribe( (par: Params) => {
      this.id = par["id"]; 
    });
  //  this.id = this.route.snapshot.children[0].params.id;
    this.userData = this.authService.getCurrentUser();
    console.log(this.id); 
    this.userDataMap();

    this.editModal.onEditChange.subscribe(
      res => {
        console.log('HEREEEE');
        this.editMode = res;
      }
    )
  }

  userDataMap() {
     this.userViewTemplate["First Name"] = this.userData.firstName;
     this.userViewTemplate["Last Name"] = this.userData.lastName;
     this.userViewTemplate["Login"] = this.userData.login;
     this.userViewTemplate["Phone"] = this.userData.phone;
     this.userViewTemplate["Email"] = this.userData.email;
     this.userViewTemplate["Address"] = this.userData.address;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editProfile() {
    console.log('Edit Profile ' + this.id);
    this.editModal.toggleEditMode();
  }

}
