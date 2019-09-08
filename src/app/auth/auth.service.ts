import { ProductCart } from './../shared/servives/product-cart.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: any = "http://localhost:3000";
  isAuthenticated: boolean;
  isUserAuthorized = new Subject<any>();
  userData = new Subject<any>();
  currentUser: any;
  
  users = [
    new User("John", "Smith", "john_smith777", "john777", "+380501654784", "john777@gmail.com", "NY, Green Valley 15/64"),
    new User("Michael", "Naberezhnyi", "michael777", "test123", "+380501865210", "mnabe777@gmail.com", "LA, Red Valley 7/32"),
    new User("John", "Doe", "johnl777", "demo1234", "+380502565210", "john_doe@gmail.com", "Las Vegas, Yellow Road 7/32")
  ];

  constructor(private router: Router,
              private http: HttpClient 
               ) { }


  signInn(login: string, password: string) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    let authStatus;

    this.http.get(`${this.apiUrl}/users?login=${login}&&password=${password}`, {headers: headers})
      .subscribe(
        (res: Array<any>) => {
          if (res && res.length > 0 ) {
            this.currentUser = res[0];
            console.log(this.currentUser);
          
           //this.userData.next(this.currentUser);
            this.isAuthenticated = true;
            this.isUserAuthorized.next(this.isAuthenticated);
            authStatus =  true;
            this.userData.next(res[0]);
            return true;
          } else {
            console.log('Authentication error!');
          }
        },

        err => {
          console.log(err);
        }
      );
      
      // console.log(this.currentUser);
      //console.log(authStatus);
      return authStatus ? true : false; 
  }

  updateUserData() {
    this.signInn(this.currentUser.login, this.currentUser.password);
  }

  logOut() {
    this.isAuthenticated = false;
    this.isUserAuthorized.next(this.isAuthenticated);
    localStorage.removeItem("userInfo");
  }

  // signUp(user: User) {
  //   this.users.push(user);
  //   console.log(this.users);
  //   this.addNewUser(this.users).subscribe();
  // }

  signUp(users) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
     
    this.http.post(`${this.apiUrl}/users`, users, {headers: headers})
      .subscribe(
        res => {
          this.router.navigate(['']);

        }, err => {
          alert('Something went wrong, try again!!!')
        }
      );
  }

  checkUser(login: User): Observable<any> {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.get(`${this.apiUrl}/users?login=${login}`, {headers: headers});
  }

  checkEmail(email: string): Observable<any>{
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.get(`${this.apiUrl}/users?email=${email}`, {headers: headers});
  }

  isAuthorized(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  checkUserInfo(userData): Observable<any> {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    let login = this.currentUser.login;
    let password = userData.passwords.password;
    return this.http.get(`${this.apiUrl}/users?login=${login}&&password=${password}`, { headers: headers});
  }

  updateUserInfo(userData): Observable<any> {
    //console.log(this.currentUser.id);
    
    let user = new User(userData.firstName, userData.lastName, 
                        this.currentUser.login, userData.passwords.password,
                        userData.phone, this.currentUser.email, userData.address);
    
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    user.cart = this.currentUser.cart;
    
    return this.http.put(`${this.apiUrl}/users/${this.currentUser.id}`,  user, { headers: headers});
  }

//It's not used
  getUserById(id: number): User {  
    let activeUser;
    this.users.map((item) => {
      if (item["userId"] == id) {
        activeUser =  item;
      };
    })  
    return activeUser;
  } 


   //It's mock - you should add http
  // signIn(login: string, password: string): boolean {
  //   // login = "john_smith777";
  //   // password = "john777";
  //   let authStatus;

  //   let user = this.users.find( (userData:User) => {
 
  //     if (userData.login == login && userData.password == password) {
  //       this.currentUser = userData;
        
  //       this.isAuthenticated = true;
  //       this.isUserAuthorized.next(this.isAuthenticated);
  //       authStatus =  true;
  //       return true;
  //     } 
  //   });
  //  console.log(user);
  //  return authStatus ? true : false; 

  //   console.log(this.isAuthenticated);
  //  // this.isUserAuthorized.next(this.isAuthenticated);
  // }
}
