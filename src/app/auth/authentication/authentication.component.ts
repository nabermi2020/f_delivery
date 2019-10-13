import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.checkAuthenticationStatus();  
  }

  checkAuthenticationStatus() {
    this.authService.isUserAuthorized.subscribe (
      authStatus => {
        console.log(authStatus);
        if (authStatus.authStatus && authStatus.onlineMode != false) {
          this.router.navigate(['/dashboard/products/pizza']);
        } else {
          alert('here');
          this.router.navigate(['']);
        }
      }
    );

    this.isAuthenticated();
  }

  isAuthenticated() {
    const userData = localStorage.getItem("userInfo");
    if (userData) {
      const userCredentials = JSON.parse(userData);
      this.authService.signIn(userCredentials.login, userCredentials.password);
    } else {
      console.log('No active session data available!');
    }
  }
}
