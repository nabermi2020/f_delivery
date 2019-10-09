import { LoadingService } from './loading.service';
import { ProductCart } from './product-cart.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/cart/order.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EditModalService } from './edit-modal.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl: any = environment.apiUrl;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private productCart: ProductCart,
              private router: Router,
              private loadingService: LoadingService,
              private editModal: EditModalService) {
  }

/**
 * Make an order and send it on server in case of success clean order cart
 * @param { Order} order 
 */  
  makeAnOrder(order: Order) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    const id = this.authService.getCurrentUser().id;
    order.setUserId(id);
    // this.loadingService.toggleLoading();
    // this.editModal.toggleEditMode();

    this.http.post(`${this.apiUrl}/orders`, order, { headers })
        .subscribe(
            res => {
                this.onMakeOrderSuccess(res);
            },

            err => {
                this.onMakeOrderError(err);
            }
        );
  }

  onMakeOrderSuccess(orderStatus) {
    this.productCart.cleanCart();
    // this.loadingService.toggleLoading();
    // this.editModal.toggleEditMode();   
    this.router.navigate(['dashboard/products/pizza']);
  }

  onMakeOrderError(error) {
    console.log(error);
    alert('Something went wrong!');
  }

/**
 * Get order history for appropriate user
 * @return {Observable} user's orders
 */  
  getOrders(): Observable<any> {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    const id = this.authService.getCurrentUser().id;
    return this.http.get(`${this.apiUrl}/orders?userId=${id}`, { headers });
  }

}
