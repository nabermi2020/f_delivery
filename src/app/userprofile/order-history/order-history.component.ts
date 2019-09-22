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

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderSubscription =  this.orderService.getOrders()
      .subscribe(
        res => {
          this.orders = res;
          //console.log(res);
        },
        err => {
          alert('Something went wrong!');
        }
      )
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }

}
