import { LoadingService } from './shared/servives/loading.service';
import { OrdersService } from './shared/servives/orders.service';
import { EditModalService } from './shared/servives/edit-modal.service';
import { ProductService } from './shared/servives/products.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCart } from './shared/servives/product-cart.service';
import { SharedModule } from './shared/shared.module';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule 
    
  ],
  providers: [
    AuthGuard,
    AuthService,
    ProductService,
    ProductCart,
    EditModalService,
    OrdersService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
