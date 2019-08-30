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
        //ASK ABOUT SITUATION WHEN WE HAVE A FEW TABS
        // IN CHROME BUT USER IS NOT AUTHORIZED AND FOR ONE TAB EVERYHING
        // IS OK BUT FOR ANOTHER AUTHOMATIC LOG OUT DOESN'T WORK EVEN WITH SUBSCRUPTION
        
        if (this.authService.isAuthorized() && localStorage.getItem("userInfo")) {
            return true; 
        } else {
            this.router.navigate([''], {relativeTo: this.route});
            return false;
        }
        
    }    
}