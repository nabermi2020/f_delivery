import { ProductCart } from '../services/product-cart.service';
import { User } from '../../auth/user.model';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  userDataSubscription = new Subscription();
  checkProdutsSubscription = new Subscription();

  constructor(private authService: AuthService,
              private router: Router,
              private productCartService: ProductCart) {             
    this.productsQuantity = this.productCartService.calculateProductsQuantity();
  }

  ngOnInit() {
    this.activeUser = this.authService.getCurrentUser();
     
    this.userDataSubscription = this.authService.userData
      .subscribe(
        res => {
          this.activeUser =  this.authService.getCurrentUser();
          this.productsQuantity = this.productCartService.calculateProductsQuantity();
        },

        err => {
          alert('Something went wrong!');
        }
      );
    this.id = this.activeUser.userId;
    this.checkProdutsSubscription = this.productCartService.onProductAdded  
      .subscribe( 
        res => {
          this.productsQuantity = this.productCartService.calculateProductsQuantity();
          this.totalPrice = this.productCartService.getTotalPrice();
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
    this.userDataSubscription.unsubscribe();
    this.checkProdutsSubscription.unsubscribe();
    this.router.navigate(['/']); 
  }

 /**
  * Navigate tp 'cart' component
  */ 
  openCart() {
    this.router.navigate(['dashboard/cart']);
  }

  navigateToError() {
    this.router.navigate(["dashboard/error"]);
  }

}
