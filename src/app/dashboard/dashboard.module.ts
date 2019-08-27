import { ProfileModule } from './../userprofile/profile.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';

@NgModule({
    declarations: [
       ProductDashboardComponent,
       HeaderComponent,
       SideBarComponent
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