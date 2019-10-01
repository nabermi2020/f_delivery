import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/shared/services/product-cart.service';
import { Product } from 'src/app/shared/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Array<Product> = [];
  totalPrice: any;
 
  constructor(private productCart: ProductCart,
              private router: Router) { }

  ngOnInit() {
    this.cart = this.productCart.getProducts();
    console.log(this.cart);
    this.totalPrice = this.productCart.getTotalPrice();
  }

 /**
  * 
  * @param {Product} selected product 
  */ 
  deleteCurrentProduct(product: Product) {
    const productId = product.id;
    this.productCart.deleteProductById(productId);
    this.totalPrice = this.productCart.getTotalPrice();
  }

/**
 * Navigating to 'dashboard' after order is made
 */  
  makeAnOrder() {
    this.router.navigate(['/dashboard/order-confirmation']);
  }

}
