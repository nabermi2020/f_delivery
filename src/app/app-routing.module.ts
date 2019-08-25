import { AuthGuard } from './auth/auth-guard.service';
import { ProfileComponent } from './userprofile/profile/profile.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ProductDashboardComponent } from './dashboard/product-dashboard/product-dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: ProductDashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
