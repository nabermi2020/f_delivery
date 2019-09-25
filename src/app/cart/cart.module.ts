import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';


@NgModule({
    declarations: [
        CartComponent,
        OrderConfirmationComponent,
        ConfirmationPopupComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [

    ]
})
export class CartModule {}