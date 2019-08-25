import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate {
    isAuthorized: boolean = false;

    constructor(private router: Router, private route:ActivatedRoute) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isAuthorized) {
            return true; 
        } else {
            this.router.navigate([''], {relativeTo: this.route});
            return false;
        }
        
    }    
}