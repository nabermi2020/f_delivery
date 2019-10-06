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
  pages: number;
  ordersPerPage: number = 10;
  ordersOnLastPage: number;
  activePage: number = 0;
  ordersForPages: Array<any>;
  orderSubscription = new Subscription();
  showCurrentOrderDetail = false;

  constructor(private orderService: OrdersService,
              private loadingService: LoadingService,
              private editModal: EditModalService) { }

  ngOnInit() {
    this.getOrders();
    
  }

  calculatePagination() {
    this.pages = Math.ceil(this.orders.length / this.ordersPerPage);
    this.ordersOnLastPage = this.orders.length % this.ordersPerPage;
    
    let pageIndices = [];

    for(let i = 1; i <= this.pages; i++) {
      
      let currentPageOrders = {pageNumber: i, orders: this.getOrdersForCurrentPage(i)};
      console.log(currentPageOrders);
      pageIndices.push(currentPageOrders);
    }

    return pageIndices;
  }

  getOrdersForCurrentPage(pageNumber) {
    const from = pageNumber * this.ordersPerPage - this.ordersPerPage;
    const to = pageNumber != this.pages ? from + this.ordersPerPage -1 : from + this.ordersOnLastPage - 1;    
    let orders = [];

    for(let i = from; i <= to; i ++) {
      //console.log(this.orders[i]);
      orders.push(this.orders[i]);
    }
    console.log(from);
    console.log(to);

    return orders;
  }

  getOrdersForPage(pageNumber) {
    this.orders = this.ordersForPages[pageNumber - 1].orders;
  }

/**
 * Get orders using 'orderService'
 */
  getOrders() {
    this.loadingService.toggleLoading();
    this.editModal.toggleEditMode();

    this.orderSubscription =  this.orderService.getOrders()
      .subscribe(
        res => {
          if (res[0]) {
            this.orders = res;
          
            this.editModal.toggleEditMode();
            this.loadingService.toggleLoading();
            this.ordersForPages = this.calculatePagination();
            this.orders = this.ordersForPages[0].orders;
          }
         
        },

        err => {
          alert('Something went wrong!');
        }
      );
  }

/**
 * Destroy order's history subscription
 */
  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }

}
