import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  activeCategory: string = "Pizza";
  activeUser: string = "Test";


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logOut();
  }

}
