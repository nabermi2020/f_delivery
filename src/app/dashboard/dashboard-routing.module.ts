import { ProfileDetailComponent } from './../userprofile/profile-detail/profile-detail.component';
import { AuthGuard } from './../auth/auth-guard.service';
import { ProfileComponent } from './../userprofile/profile/profile.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const dashboardRoutes: Routes = [
    { path: 'dashboard', component: ProductDashboardComponent, canActivate: [AuthGuard], children: [
        { path: 'profile', component: ProfileComponent, children: [
            { path: ':id', component: ProfileDetailComponent}
        ]}
    ]}

   
]

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {}