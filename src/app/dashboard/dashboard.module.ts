import { ProfileModule } from './../userprofile/profile.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { EditProfileComponent } from '../userprofile/edit-profile/edit-profile.component';

@NgModule({
    declarations: [
       ProductDashboardComponent,
       HeaderComponent,
       SideBarComponent,
       ProductGridComponent 
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ProfileModule
    ],
    exports: [

    ]
})
export class DashboardModule {}