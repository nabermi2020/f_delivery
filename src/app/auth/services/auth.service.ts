import { HttpClientService } from './http-client.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, Observer } from 'rxjs';
import { User } from '../user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: any = environment.apiUrl;
  isAuthenticated: boolean;
  isUserAuthorized = new Subject<any>();
  userData = new Subject<any>();
  currentUser: any;
  authResults: any;
  
  constructor(private router: Router,
              private http: HttpClient,
              private httpClient: HttpClientService
              ) {}

  public authenticateUser(login: string, password: string): Observable<any> {
    return Observable.create((authObserver: Observer<any>) => {
      let onlineMode = navigator.onLine;
      if (onlineMode) {
        this.aunthenticateUserOnline(login, password, authObserver);
      } else {
        authObserver.next({ authStatus: false, onlineMode: false });
      }
    });
  }   
  
  public aunthenticateUserOnline(login: string, password: string, authObserver: Observer<any>): void {
    this.httpClient.get(`${this.apiUrl}/users?login=${login}&&password=${password}`)
      .subscribe(
        (authResults: Response) => {
          this.onAunthenticateUserOnlineSuccess(authResults, authObserver);
        },

        (err: Response) => {
          this.onAunthenticateUserOnlineFailure(err, authObserver); 
        }
      );  
  }

  private onAunthenticateUserOnlineSuccess(authResults, authObserver: Observer<any>): void {
      let onlineMode = navigator.onLine;
      localStorage.setItem('userInfo', JSON.stringify(authResults[0]));
      let authStatus = this.getAuthStatus(authResults) == true ? true : false;
      authObserver.next({ authStatus: authStatus, onlineMode: onlineMode });
  }

  private onAunthenticateUserOnlineFailure(error, authObserver: Observer<any>): void {
      let onlineMode = navigator.onLine;
      authObserver.error(error);
      authObserver.next({ authStatus: false, onlineMode: onlineMode }); 
  }
  
  public signIn(login, password) {
    this.authenticateUser(login, password)
      .subscribe(
        this.onSignInSuccess.bind(this),
        this.onSignInFailure.bind(this)
      );
  }

  private onSignInSuccess(authStatus): void {
    this.authResults = authStatus;
    this.isUserAuthorized.next(this.authResults);
    console.log(this.authResults);
  }

  private onSignInFailure(authErr): void {
    this.authResults = authErr;
    console.log(authErr.status)
    console.log(this.authResults);
  }

  public getAuthStatus(userData): boolean {
    let authStatus;
    if (userData && userData.length > 0 ) {
      this.currentUser = userData[0];
      this.isAuthenticated = true;
      authStatus =  true;
      this.userData.next(userData[0]);
      return true;
    } else {
      console.log('Authentication error!');
      authStatus = false;
    }

    return authStatus;
  }

  public updateUserData(): void {
    let onlineMode = navigator.onLine;
    if (onlineMode) {
      this.signIn(this.currentUser.login, this.currentUser.password);
    } else {
      let activeCategory = JSON.parse(localStorage.getItem("productList")).category;
      this.router.navigate([`dashboard/products/${activeCategory}`]);
    }
  }
  
  public logOut(): void {
    this.authResults.authStatus = false;
    this.isUserAuthorized.next(this.authResults);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('offlineOrders');
    localStorage.removeItem('orderHistory');
  }
 
  public signUp(users: User): void {
    this.httpClient.post(`${this.apiUrl}/users`, users)
    .subscribe(
      this.onSignUpSuccess.bind(this),
      this.onSignUpFailure.bind(this)
    );
  }

  private onSignUpSuccess(res): void {
    this.router.navigate(['']);  
  }

  private onSignUpFailure(err): void {
    alert('Something went wrong, try again!!!');
  }

  public checkFieldExistense(field: string, value: string): Observable<any> {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.get(`${this.apiUrl}/users?${field}=${value}`, { headers });
  }

  public isAuthorized(): boolean {
    return this.isAuthenticated;
  }
 
  public getCurrentUser(): any {
    return this.currentUser;
  }
 
  public checkUserInfo(userData): Observable<any> {
    return Observable.create( (observer: Observer<any>) => {
      const login = this.currentUser.login;
      const password = userData.passwords.password;
      let onlineMode = navigator.onLine;
      
      if (onlineMode) {
        this.getUserInfo(login, password, observer);
      } else {
        observer.error("offline mode!");
      }
    });
  }

  public getUserInfo(login, password, observer) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    this.http.get(`${this.apiUrl}/users?login=${login}&&password=${password}`, { headers })
    .subscribe(
      (checkResults: Array<any>) => {
        if (checkResults.length > 0) {
          observer.next(checkResults);
        }
      },

      (checkErrors) => {  
        observer.error('User not found! ' + checkErrors);
      }
    )  
  }

  public updateUserInfo(userData): Observable<any> {
    const user = new User(userData.firstName, userData.lastName, 
                        this.currentUser.login, userData.passwords.password,
                        userData.phone, this.currentUser.email, userData.address);
    
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.put(`${this.apiUrl}/users/${this.currentUser.id}`,  user, { headers });
  }
}
