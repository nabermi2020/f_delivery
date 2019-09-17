import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SharedModule } from '../shared/shared.module';
import { FormatPhonePipe } from '../shared/format-phone.pipe';
import { OrderHistoryComponent } from './order-history/order-history.component';
 
@NgModule({
    declarations: [
        ProfileComponent,
        ProfileDetailComponent,
         EditProfileComponent,
         OrderHistoryComponent  
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        SharedModule
      
    ],
    exports: [

    ]
})
export class ProfileModule {}