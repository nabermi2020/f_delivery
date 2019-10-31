import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { SharedModule } from '../shared/shared.module';
import { OrderResultsComponent } from './order-results/order-results.component';


@NgModule({
    declarations: [
        CartComponent,
        OrderConfirmationComponent,
        OrderResultsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule 
    ],
    exports: []
})
export class CartModule {}
