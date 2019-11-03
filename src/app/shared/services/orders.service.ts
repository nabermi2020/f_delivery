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
  providedIn: "root"
})
export class OrdersService {
  apiUrl: any = environment.apiUrl;
  order: Order;
  offlineOrders: Array<any> = [];

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private productCart: ProductCart,
    private router: Router,
    private loadingService: LoadingService,
    private editModal: EditModalService,
    private errorService: ErrorService
  ) {
    this.checkOfflineOrders();
  }

  public makeAnOrder(order: Order) {
    const headers = new HttpHeaders({ "Content-type": "application/json" });
    const id = this.authService.getCurrentUser().id;
    order.setUserId(id);
    console.log(order);
    this.order = order;
    if (navigator.onLine) {
      this.order.setOrderStatus("done");
      this.http
        .post(`${this.apiUrl}/orders`, order, { headers })
        .subscribe(
          this.onMakeOrderSuccess.bind(this),
          this.onMakeOrderError.bind(this)
        );
    } else {
      this.handleOfflineOrderOperation(order);
    }
  }

  public handleOfflineOrderOperation(order: Order): void {
    this.order.setOrderStatus("pending");
    this.offlineOrders.push(order);
    localStorage.setItem("offlineOrders", JSON.stringify(this.offlineOrders));

    this.productCart.cleanCart();
    this.router.navigate(["dashboard/order-results", "offlineMode"]);
  }

  private checkOfflineOrders(): void {
    let localOrders = JSON.parse(localStorage.getItem("offlineOrders"));
    const offlineOrders = localOrders ? localOrders : [];
    this.offlineOrders = offlineOrders.length > 0 ? offlineOrders : [];
  }

  private syncOfflineOrdersWithServer(): void {
    const headers = new HttpHeaders({ "Content-type": "application/json" });
    let localOrders = JSON.parse(localStorage.getItem("offlineOrders"));
    const offlineOrders = localOrders ? localOrders : [];
    if (offlineOrders.length > 0) {
      this.offlineOrders.forEach((item: Order) => {
        this.http.post(`${this.apiUrl}/orders`, item, { headers }).subscribe();
      });
    }

    localStorage.removeItem("offlineOrders");
    this.offlineOrders = [];
  }

  private onMakeOrderSuccess(orderStatus): void {
    this.productCart.cleanCart();
    this.syncOfflineOrdersWithServer();
    this.router.navigate(["dashboard/order-results", "orderSuccess"]);
  }

  private onMakeOrderError(error): void {
    this.productCart.cleanCart();
    this.router.navigate(["dashboard/order-results", "orderFailure"]);
  }

  public submitOrderFromOrderHistory(order: Order): void {
    const headers = new HttpHeaders({ "Content-type": "application/json" });
    order.orderStatus = 'done';
    if (navigator.onLine) {
      this.http.put(`${this.apiUrl}/orders/${order['id']}`, order, { headers }).subscribe(
        this.onSubmitPendingOrderSuccess.bind(this),
        this.onSubmitPendingOrderFailure.bind(this)
      );
    } else {
      this.onSubmitPendingOrderFailure();
    }
  }

  private onSubmitPendingOrderSuccess(): void {
    this.router.navigate(["dashboard/order-results", "submitSuccess"]);  
  }

  private onSubmitPendingOrderFailure(): void {
    this.router.navigate(["dashboard/order-results", "submitFailure"]);
  }
  public getLastOrder(): Order {
    return this.order;
  }

  public getOrders(): Observable<any> {
    const ordersObservable = Observable.create((observer: Observer<any>) => {
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
    const headers = new HttpHeaders({ "Content-type": "application/json" });
    const id = this.authService.getCurrentUser().id;
    this.http.get(`${this.apiUrl}/orders?userId=${id}`, { headers }).subscribe(
      (orders: Array<any>) => {
        localStorage.setItem("orderHistory", JSON.stringify(orders));
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
