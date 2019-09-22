import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate {
    isAuthorized: boolean;

    constructor(private router: Router,
                private route:ActivatedRoute,
                private authService: AuthService) {
        //this.isAuthorized = this.authService.isAuthorized();
    }

    /**
     * Check user authentication status
     * @param {ActivatedRouteSnapshot} route snapshot 
     * @param {RouterStateSnapshot} router state
     * @return {boolean} return authentication status
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       // console.log('here ' + this.authService.isAuthenticated);
        if (this.authService.isAuthorized() && localStorage.getItem("userInfo")) {
            return true; 
        } else {
            this.router.navigate([''], {relativeTo: this.route});
            return false;
        } 
    }    
}