import { LoadingService } from '../shared/services/loading.service';
import { ProductCart } from '../shared/services/product-cart.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { User } from './user.model';
import { EditModalService } from '../shared/services/edit-modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: any = 'https://f-deploy.herokuapp.com';
  isAuthenticated: boolean;
  isUserAuthorized = new Subject<any>();
  userData = new Subject<any>();
  currentUser: any;
  
  users = [
    new User('John', 'Smith', 'john_smith777', 'john777', '+380501654784', 'john777@gmail.com', 'NY, Green Valley 15/64'),
    new User('Michael', 'Naberezhnyi', 'michael777', 'test123', '+380501865210', 'mnabe777@gmail.com', 'LA, Red Valley 7/32'),
    new User('Johh', 'Doe', 'johnl777', 'demo1234', '+380502565210', 'john_doe@gmail.com', 'Las Vegas, Yellow Road 7/32')
  ];

  constructor(private router: Router,
              private http: HttpClient,
              private loadingService: LoadingService,
              private editModal: EditModalService
               ) { }

/**
 * User authentication
 * @param {String} user's login
 * @param {String} user's password
 * @return {Boolean} returns authentication status
 */               
  signInn(login: string, password: string) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    let authStatus;
 


    // this.loadingService.toggleLoading();
    // this.editModal.toggleEditMode();

    this.http.get(`${this.apiUrl}/users?login=${login}&&password=${password}`, { headers })
      .subscribe(
        (res: Array<any>) => {
          if (res && res.length > 0 ) {
            this.currentUser = res[0];
            this.isAuthenticated = true;
            this.isUserAuthorized.next(this.isAuthenticated);
            authStatus =  true;
            this.userData.next(res[0]);
            // this.loadingService.toggleLoading();
            
            setTimeout(
              () => {
                // this.loadingService.toggleLoading();
                // this.editModal.toggleEditMode();
              }, 2000
            );
            return true;
          } else {
            console.log('Authentication error!');
          }
        },

        err => {
          console.log(err);
        }
      );
      
    return authStatus ? true : false; 
  }

/**
 * Update user data
 */
  updateUserData() {
    
    this.signInn(this.currentUser.login, this.currentUser.password);
  }

/**
 * Logout user from the active session
 */  
  logOut() {
    this.isAuthenticated = false;
    this.isUserAuthorized.next(this.isAuthenticated);
    localStorage.removeItem('userInfo');
  }


 /**
  * Register new user and navigate to the 'sign-in'
  * @param {User} new user instance
  */ 
  signUp(users) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
     
    this.http.post(`${this.apiUrl}/users`, users, { headers })
      .subscribe(
        res => {
          this.router.navigate(['']);

        }, err => {
          alert('Something went wrong, try again!!!');
        }
      );
  }


/**
 * Check user's login existence in DB
 * @param {User} user's login 
 * @return {Observable} result with array of 1 user if there's user with the same login
 */
  checkUser(login: User): Observable<any> {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.get(`${this.apiUrl}/users?login=${login}`, { headers });
  }

/**
 * Check existense of user email in DB
 * @param {string} user's email 
 * @return {Observable} array with 1 email if there's user withthe same email
 */
  checkEmail(email: string): Observable<any> {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.get(`${this.apiUrl}/users?email=${email}`, { headers });
  }

/**
 * Return user's authentication status
 * @return {boolean} auth status;
 */
  isAuthorized(): boolean {
    return this.isAuthenticated;
  }

 /**
  *  Return current user's info
  * @return {obj} user's data
  */ 
  getCurrentUser(): any {
    return this.currentUser;
  }

 /**
  * Check user credentials
  * @param {obj} object with credentials
  * @return {Observable} array of 1 user if search was successfull 
  */ 
  checkUserInfo(userData): Observable<any> {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    const login = this.currentUser.login;
    const password = userData.passwords.password;
    return this.http.get(`${this.apiUrl}/users?login=${login}&&password=${password}`, { headers });
  }

/**
 * Update user info for user with appropriate id
 * @param user's data
 * @return {Observable} updating result
 */
  updateUserInfo(userData): Observable<any> {
    const user = new User(userData.firstName, userData.lastName, 
                        this.currentUser.login, userData.passwords.password,
                        userData.phone, this.currentUser.email, userData.address);
    
    const headers = new HttpHeaders({'Content-type': 'application/json'});
     
    return this.http.put(`${this.apiUrl}/users/${this.currentUser.id}`,  user, { headers });
  }

}
