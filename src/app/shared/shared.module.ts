import { SideBarComponent } from './../shared/side-bar/side-bar.component';
import { DashboardRoutingModule } from './../dashboard/dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../shared/header/header.component';

import { NgModule } from '@angular/core';
import { ShortenPipe } from './shorten.pipe';
import { FormatPhonePipe } from './format-phone.pipe';


@NgModule({
    declarations: [
       HeaderComponent,
       SideBarComponent,
       ShortenPipe,
       FormatPhonePipe,
        
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ], 
    exports: [
        HeaderComponent,
        SideBarComponent,
        FormatPhonePipe
    ]

})
export class SharedModule {}