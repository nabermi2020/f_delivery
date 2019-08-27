import { User } from './../../auth/user.model';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  activeCategory: string = "Pizza";
  activeUser: User;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.activeUser = this.authService.getCurrentUser();
    console.log(this.activeUser);
  
  }

  logOut() {
    this.authService.logOut();
  }

}