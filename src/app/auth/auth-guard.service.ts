import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate {
    isAuthorized: boolean;

    constructor(private router: Router,
                private route:ActivatedRoute,
                private authService: AuthService) {
        //this.isAuthorized = this.authService.isAuthorized();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('here ' + this.authService.isAuthenticated);
        if (this.authService.isAuthorized()) {
            return true; 
        } else {
            this.router.navigate([''], {relativeTo: this.route});
            return false;
        }
        
    }    
}