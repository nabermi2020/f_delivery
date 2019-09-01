import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit{
  
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.isUserAuthorized.subscribe (
      sub => {
        if (sub) {
         // console.log(sub);
          this.router.navigate(['/dashboard/products/pizza']);
        } 
        else {
         // console.log("auth error");
          this.router.navigate(['']);
        }
      }
    )

    this.isAuthenticated();
  }

  isAuthenticated() {
    let userData = localStorage.getItem("userInfo");
    if(userData) {
      console.log(userData);
      let userCredentials = JSON.parse(userData);
      this.authService.signInn(userCredentials.login, userCredentials.password);
    } else {
      console.log('Nothing!');
    }
    //console.log(userData);
  }
}
