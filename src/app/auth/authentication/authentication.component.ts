import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
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
    this.authService.isUserAuthorized.subscribe (
      sub => {
        if (sub) {
          this.router.navigate(['/dashboard/products']);
        } else {
          this.router.navigate(['']);
        }
      }
    )
  }

}
