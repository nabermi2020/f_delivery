import { SideBarComponent } from './../shared/side-bar/side-bar.component';
import { DashboardRoutingModule } from './../dashboard/dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../shared/header/header.component';

import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
       HeaderComponent,
       SideBarComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ], 
    exports: [
        HeaderComponent,
        SideBarComponent
    ]

})
export class SharedModule {}