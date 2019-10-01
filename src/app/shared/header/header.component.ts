import { ProductCart } from '../services/product-cart.service';
import { User } from '../../auth/user.model';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // activeCategory: string = "Pizza";
  activeUser: User;
  id: number;
  productsQuantity: any;  
  totalPrice: any;
  activeCategory: any;

  constructor(private authService: AuthService,
              private router: Router,
              private productCartService: ProductCart) {             
    this.productsQuantity = this.productCartService.calculateProductsQuantity();
  }

  ngOnInit() {
    this.activeUser = this.authService.getCurrentUser();
     
    this.authService.userData
      .subscribe(
        res => {
          this.activeUser =  this.authService.getCurrentUser();
          this.productsQuantity = this.productCartService.calculateProductsQuantity();
          // console.log(this.productsQuantity);
          // console.log(res);
        },   
        err => {
          alert('Something went wrong!');
        }
      );
    this.id = this.activeUser.userId;
    this.productCartService.onProductAdded  
      .subscribe( 
        res => {
          this.productsQuantity = this.productCartService.calculateProductsQuantity();
          this.totalPrice = this.productCartService.getTotalPrice();
          // console.log(this.productsQuantity);
        },
        err => {
          alert('something went wrong!');
        }
      );
  }

/**
 * Provide logout option and navigating to 'Auth screen'
 */  
  logOut() {
    this.authService.logOut();
    // this.productCartService.onProductAdded.unsubscribe();
    this.router.navigate(['/']); 
  }

 /**
  * Navigate tp 'cart' component
  */ 
  openCart() {
    this.router.navigate(['dashboard/cart']);
  }

}
