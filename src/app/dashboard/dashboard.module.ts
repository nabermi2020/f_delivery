import { SharedModule } from './../shared/shared.module';
import { CartModule } from './../cart/cart.module';
import { ProfileModule } from './../userprofile/profile.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { NgModule } from '@angular/core';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductItemComponent } from './product-item/product-item.component';

@NgModule({
    declarations: [
       ProductDashboardComponent, 
     //  SideBarComponent,
       ProductGridComponent,
       ProductItemComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ProfileModule,
        SharedModule,
        CartModule
    ],
    exports: [

    ]
})
export class DashboardModule {}