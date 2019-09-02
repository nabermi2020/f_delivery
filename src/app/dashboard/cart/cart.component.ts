import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/shared/servives/product-cart.service';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Array<Product> = [];
  constructor(private productCart: ProductCart) { }

  ngOnInit() {
    this.cart = this.productCart.getProducts();
  }

}
