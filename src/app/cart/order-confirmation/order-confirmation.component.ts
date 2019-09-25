import { AuthService } from './../../auth/auth.service';
import { ProductCart } from 'src/app/shared/servives/product-cart.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { Order } from '../order.model';
import { OrdersService } from 'src/app/shared/servives/orders.service';
 
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  cart: Array<Product> = [];
  userData: any;
  totalPrice: any;
  @ViewChild('form') form: NgForm;

  constructor(private productCart: ProductCart,
              private ordersService: OrdersService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.cart = this.productCart.getProducts();
    this.totalPrice = this.productCart.getTotalPrice();
    this.userData = this.authService.getCurrentUser();
    this.preFillForm();
    console.log(this.cart);
  }

/**
 * Prefill order confirmation screen
 */  
  preFillForm() {
     setTimeout( () => {
      this.form.setValue({
        address: this.userData.address,
        email: this.userData.email,
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        phone: this.userData.phone,
        orderTime: ''
      });
     },); 
  }

/**
 * Order confirmation
 * @param {ngForm} form data
 */  
  onOrderSubmit(form) {
    let firstName = form.value.firstName;
    let lastName = form.value.lastName;
    let email = form.value.email;
    let phone = form.value.phone;
    let address = form.value.address;
    let orderTime = form.value.orderTime;
    
    let order = new Order(firstName, lastName,
                          email, phone,
                          address, orderTime,
                          this.productCart.getProductCart());
                      
    this.ordersService.makeAnOrder(order);
    // console.log(order);
  }
  
 /**
  * Delete product by id
  * @param {Product} selected product 
  */ 
  deleteProductFromList(product: Product) {
    let productId = product.id;
    this.productCart.deleteProductById(productId);
    this.totalPrice = this.productCart.getTotalPrice();

    if (this.cart.length == 0 ) {
      this.router.navigate(['dashboard/products/pizza']);
    }
    
  }
}
