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


/**
 * Get orders using 'orderService'
 */  
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

/**
* Get order's date
* @param {String} order's date
* @return {String} order's date
*/   
  getDate(date) {
    let orderDate = (new Date(date)).toLocaleDateString();
    return orderDate;
  }

/**
* Get order's time
* @param {String} order's date
* @return {String} order's time
*/ 
  getTime(date) {
    let orderTime = (new Date(date)).toLocaleTimeString();
    return orderTime;
  }

/**
 * Calculate products quantity
 * @param {Order} object which represent object
 * @return { number} product's quantity;
 */
  getProductsQuantity(item) {
    let productQuantity = item["products"].length;
    return productQuantity;
  }

/**
* Destroy order's history subscription
*/ 
  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }

}
