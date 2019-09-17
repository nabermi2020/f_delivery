import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';


@NgModule({
    declarations: [
        CartComponent,
        OrderConfirmationComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [

    ]
})
export class CartModule {}