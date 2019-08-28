import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  isUserAuthorized = new Subject<any>();
  userData = new Subject<any>();
  currentUser: User;
  
  users = [
    new User("John Smith", "john_smith777", "john777", "+380501654784", "john777@gmail.com", "NY, Green Valley 15/64", 1),
    new User("M.Naberezhnyi", "michael777", "test123", "+380501865210", "mnabe777@gmail.com", "LA, Red Valley 7/32", 2),
    new User("John Doe", "johnl777", "demo1234", "+380502565210", "john_doe@gmail.com", "Las Vegas, Yellow Road 7/32", 3)
  ];

  constructor(private router: Router) {
    console.log(this.users);
   }

  signIn(login: string, password: string) {
    login = "john_smith777";
    password = "john777";

    this.users.forEach( (userData: User) => {
      //console.log(userData);
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
    this.isUserAuthorized.next(this.isAuthenticated);
  }

  isAuthorized(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  getUserById(id: number): User {  
    let activeUser;
    this.users.map((item) => {
      if (item["userId"] == id) {
        activeUser =  item;
      };
    })  
    return activeUser;
  } 
}
