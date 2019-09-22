import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from 'src/app/shared/servives/orders.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  orders: Array<any>;
  orderSubscription = new Subscription();
  showCurrentOrderDetail: boolean = false;

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderSubscription =  this.orderService.getOrders()
      .subscribe(
        res => {
          this.orders = res;

          console.log(res);
        },
        err => {
          alert('Something went wrong!');
        }
      )
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }

  getDate(date) {
    let orderDate = (new Date(date)).toLocaleDateString();
    return orderDate;
  }

  getTime(date) {
    let orderTime = (new Date(date)).toLocaleTimeString();
    return orderTime;
  }

  getProductsQuantity(item) {
    let productQuantity = item["products"].length;
    return productQuantity;
  }

}
