import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  isUserAuthorized = new Subject<any>();
  currentUser: any;
  
  users = [
    { login: 'test', password: '1234' },
    { login: 'demo', password: 'demo@1234' },
    { login: 'admin', password: 'admin@777'}

  ];

  constructor(private router: Router) { }

  signIn(login: string, password: string) {
    this.users.forEach( userData => {
      console.log(userData);
      if (userData.login === login && userData.password === password) {
        this.currentUser = userData;
        this.isAuthenticated = true;
      }
    })
    console.log(this.isAuthenticated);
    this.isUserAuthorized.next(this.isAuthenticated);
  }

  logOut() {
    this.isAuthenticated = false;
  }

  isAuthorized(): boolean {
    return this.isAuthenticated;
  }
  
}
