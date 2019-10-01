import { LoadingService } from '../../shared/services/loading.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  orders: Array<any>;
  orderSubscription = new Subscription();
  showCurrentOrderDetail = false;

  constructor(private orderService: OrdersService,
              private loadingService: LoadingService,
              private editModal: EditModalService) { }

  ngOnInit() {
    this.getOrders();
  }


/**
 * Get orders using 'orderService'
 */
  getOrders() {
    this.loadingService.toggleLoading();
    // this.loadingService.toggleLoading();
    this.editModal.toggleEditMode();

    this.orderSubscription =  this.orderService.getOrders()
      .subscribe(
        res => {
          this.orders = res;
          // setTimeout(
          //   () => {
          this.editModal.toggleEditMode();
          this.loadingService.toggleLoading();
          //   }, 2000
          // )
        },
        err => {
          alert('Something went wrong!');
        }
      );
  }

/**
 * Get order's date
 * @param {String} order's date
 * @return {String} order's date
 */
  getDate(date) {
    const orderDate = (new Date(date)).toLocaleDateString();
    return orderDate;
  }

/**
 * Get order's time
 * @param {String} order's date
 * @return {String} order's time
 */
  getTime(date) {
    const orderTime = (new Date(date)).toLocaleTimeString();
    return orderTime;
  }

/**
 * Calculate products quantity
 * @param {Order} object which represent object
 * @return { number} product's quantity;
 */
  getProductsQuantity(item) {
    let productQuantity = 0;
    item['products'].forEach( product => {
      productQuantity += product.productQuantity;
    });
    // console.log(item);
    return productQuantity;
  }

/**
 * Destroy order's history subscription
 */
  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }

}
