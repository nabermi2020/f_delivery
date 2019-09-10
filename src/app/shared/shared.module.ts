import { DashboardRoutingModule } from './../dashboard/dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../shared/header/header.component';

import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
       HeaderComponent 
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ], 
    exports: [
        HeaderComponent 
    ]

})
export class SharedModule {}