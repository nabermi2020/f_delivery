import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  private destroy$ = new Subject();

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    // please do not forget to unsubcribe or do something like and code for ngOnDestroy
    // this.authService.isUserAuthorized
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe();

    this.authService.isUserAuthorized.subscribe (
      sub => {
        // sub is not really semantic name please rename to more semantic and please always add typing
        if (sub) {
         // console.log(sub);
          this.router.navigate(['/dashboard/products/pizza']);
        } else {
         // console.log("auth error");
          this.router.navigate(['']);
        }
      }
    );

    this.isAuthenticated();
  }

  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }

  isAuthenticated() {
    const userData = localStorage.getItem("userInfo");
    // optional - one of best practises, first check for all errors then happy path, for instance:
    // if (!userData) {
    //   console.log('No active session data available!');
    //   return;
    // }
    //
    // const { login, password } = JSON.parse(userData);
    // this.authService.signInn(login, password);

    if (userData) {
      console.log(userData);

      const userCredentials = JSON.parse(userData);
      // optional - for such cases better write something like
      // const { login, password } = JSON.parse(userData);
      // this.authService.signInn(login, password);

      this.authService.signInn(userCredentials.login, userCredentials.password);
    } else {
      console.log('No active session data available!');
    }
  }
}
