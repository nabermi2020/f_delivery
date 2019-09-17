import { ProductCart } from 'src/app/shared/servives/product-cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  cart: Array<Product> = [];
  totalPrice: any;

  constructor(private productCart: ProductCart) { }

  ngOnInit() {
    this.cart = this.productCart.getProducts();
    this.totalPrice = this.productCart.getTotalPrice();
    console.log(this.cart);
  }

  onOrderSubmit(form) {
    alert('Hello');
    console.log(form);
  }

}
