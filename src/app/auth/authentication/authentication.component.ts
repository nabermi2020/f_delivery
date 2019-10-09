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
        if (authStatus) {
          this.router.navigate(['/dashboard/products/pizza']);
        } else {
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
      this.authService.signInn(userCredentials.login, userCredentials.password);
    } else {
      console.log('No active session data available!');
    }
  }
}
