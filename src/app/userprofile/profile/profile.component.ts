import { AuthService } from './../../auth/auth.service';
import { User } from './../../auth/user.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: number;
  userData: User;
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
              private authService: AuthService) { }

  ngOnInit() {
    this.id = this.route.snapshot.children[0].params.id;
    this.userData = this.authService.getCurrentUser();
    console.log(this.id); 
    this.userDataMap();
  }

  userDataMap() {
     this.userViewTemplate["First Name"] = this.userData.firstName;
     this.userViewTemplate["Last Name"] = this.userData.lastName;
     this.userViewTemplate["Login"] = this.userData.login;
     this.userViewTemplate["Phone"] = this.userData.phone;
     this.userViewTemplate["Email"] = this.userData.email;
     this.userViewTemplate["Address"] = this.userData.address;
  }

}
