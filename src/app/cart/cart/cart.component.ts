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
  totalPrice: any;
  constructor(private productCart: ProductCart) { }

  ngOnInit() {
    this.cart = this.productCart.getProducts();
    console.log(this.cart);
    this.totalPrice = this.productCart.getTotalPrice();
  }

  deleteCurrentProduct(product: Product) {
    let productId = product.id;
    this.productCart.deleteProductById(productId);
    this.totalPrice = this.productCart.getTotalPrice();
  }

}
