import { SharedModule } from './../shared/shared.module';
import { CartModule } from './../cart/cart.module';
import { ProfileModule } from './../userprofile/profile.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FiltersComponent } from './filters/filters.component';
import { FilterProductsPipe } from './filter-products.pipe';

@NgModule({
    declarations: [
       ProductDashboardComponent, 
       ProductGridComponent,
       ProductItemComponent,
       FiltersComponent,
       FilterProductsPipe,
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
