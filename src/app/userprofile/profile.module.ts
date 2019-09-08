import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
 

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileDetailComponent,
         EditProfileComponent
         
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule
      
    ],
    exports: [

    ]
})
export class ProfileModule {}