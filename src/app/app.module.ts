import { ProductService } from './shared/servives/products.service';
 
import { ProfileModule } from './userprofile/profile.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';

import { ProfileComponent } from './userprofile/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    DashboardModule
    
  ],
  providers: [AuthGuard, AuthService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
