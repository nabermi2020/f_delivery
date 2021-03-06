import { ProductCart } from '../services/product-cart.service';
import { User } from '../../auth/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  
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
    this.getUserData();    
    this.id = this.activeUser.userId;
    this.onProdAdded();
  }

  getUserData() {
    this.userDataSubscription = this.authService.userData
    .subscribe(
      this.onGetUserDataSuccess.bind(this),
      this.onGetUserDataFailure.bind(this)
    ); 
  }

  onGetUserDataSuccess(userData) {
    this.activeUser =  this.authService.getCurrentUser();
    this.productsQuantity = this.productCartService.calculateProductsQuantity();
  }

  onGetUserDataFailure(error) {
    alert('Something went wrong!');
    console.log(error);
  }

  onProdAdded() {
    this.checkProdutsSubscription = this.productCartService.onProductAdded  
      .subscribe( 
        this.onProdAddedSuccess.bind(this),
        this.onProdAddedFailure.bind(this)
      );
  }
    
  onProdAddedSuccess(prodAddStatus) {
    this.productsQuantity = this.productCartService.calculateProductsQuantity();
    this.totalPrice = this.productCartService.getTotalPrice(); 
  }

  onProdAddedFailure(error) {
    alert('something went wrong!');
  }

/**
 * Provide logout option and navigating to 'Auth screen'
 */  
  logOut() {
    this.authService.logOut();
    this.userDataSubscription.unsubscribe();
    this.checkProdutsSubscription.unsubscribe();
    this.router.navigate(['/']);
    // this.productCartService.onProductAdded.unsubscribe(); 
  }

 /**
  * Navigate tp 'cart' component
  */ 
  openCart() {
    this.router.navigate(['dashboard/cart']);
  }
}
