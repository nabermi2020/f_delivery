import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
 



@NgModule({
    declarations: [
        ProfileComponent,
        ProfileDetailComponent
    ],
    imports:[
        CommonModule 
      
    ],
    exports: [

    ]
})
export class ProfileModule {}