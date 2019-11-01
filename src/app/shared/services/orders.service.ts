import { LoadingService } from './loading.service';
import { ProductCart } from './product-cart.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/cart/order.model';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { EditModalService } from './edit-modal.service';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl: any = environment.apiUrl;
  order: Order;
  offlineOrders: Array<any> = [];

  constructor(private authService: AuthService,
              private http: HttpClient,
              private productCart: ProductCart,
              private router: Router,
              private loadingService: LoadingService,
              private editModal: EditModalService,
              private errorService: ErrorService) {
  }

  public makeAnOrder(order: Order) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    const id = this.authService.getCurrentUser().id;
    order.setUserId(id);
    console.log(order);
    this.order = order;
    if (navigator.onLine) {
      this.http.post(`${this.apiUrl}/orders`, order, { headers })
        .subscribe(
          this.onMakeOrderSuccess.bind(this),
          this.onMakeOrderError.bind(this)
        );
    } else {
      this.handleOfflineOrderOperation(order);
    }
    
  }

  public handleOfflineOrderOperation(order: Order): void {
    
    console.log(order);
    this.offlineOrders.push(order);
    this.productCart.cleanCart(); 
    console.log(this.offlineOrders);
    this.router.navigate(['dashboard/order-results', 'offlineMode']);

  }

  private onMakeOrderSuccess(orderStatus): void {
    this.productCart.cleanCart(); 
    this.router.navigate(['dashboard/order-results', 'orderSuccess']);
  }

  private onMakeOrderError(error): void {
    this.productCart.cleanCart(); 
    this.router.navigate(['dashboard/order-results', 'orderFailure']);
  }

  public getLastOrder(): Order {
    return this.order;
  }

  public getOrders(): Observable<any> {
    const ordersObservable = Observable.create( (observer: Observer<any>) => {
      let onlineMode = navigator.onLine;

      if (onlineMode) {
        this.getOrdersFromServer(observer);  
      } else {
        this.getOrdersFromLocalStorage(observer);
      }  
    });

     return ordersObservable;
  }

  public getOrdersFromServer(observer: Observer<any>): void {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    const id = this.authService.getCurrentUser().id;
    this.http.get(`${this.apiUrl}/orders?userId=${id}`, { headers })
    .subscribe(
      (orders: Array<any>) => {
        localStorage.setItem('orderHistory', JSON.stringify(orders));
        observer.next(orders);
      },

      (error: Response) => {
        observer.error(error);
        this.errorService.handleError(error);
      }
    );
  }

  public getOrdersFromLocalStorage(observer: Observer<any>): void {
    let localOrderHistory = JSON.parse(localStorage.getItem("orderHistory"));
    if (localOrderHistory.length > 0) {
      observer.next(localOrderHistory);
    } else {
      observer.error("offline mode");
    }
  }
}
