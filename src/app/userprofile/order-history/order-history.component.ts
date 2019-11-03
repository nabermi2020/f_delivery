import { LoadingService } from "../../shared/services/loading.service";
import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrdersService } from "src/app/shared/services/orders.service";
import { EditModalService } from "src/app/shared/services/edit-modal.service";
import { Order } from "src/app/cart/order.model";

@Component({
  selector: "app-order-history",
  templateUrl: "./order-history.component.html",
  styleUrls: ["./order-history.component.scss"]
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  orders: Array<Order>;
  onlineMode: boolean = navigator.onLine;
  pages: number;
  ordersPerPage: number = 10;
  ordersOnLastPage: number;
  ordersForPages: Array<any>;
  orderSubscription = new Subscription();
  isConfirmationPopUpEnabled: boolean = false;
  editModalSubscription = new Subscription();
  offlineOrder: Order;

  constructor(
    private orderService: OrdersService,
    private loadingService: LoadingService,
    private editModal: EditModalService
  ) {}

  ngOnInit() {
    this.getOrders();
    this.subscribeToModalToggling();
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
    this.editModalSubscription.unsubscribe();
  }

  public subscribeToModalToggling(): void {
    this.editModalSubscription = this.editModal.onEditChange.subscribe(
      (res: boolean) => {
        this.isConfirmationPopUpEnabled = false;
      }
    );
  }

  public showConfirmationPopUp(order): void {
    this.offlineOrder = order;
    this.editModal.toggleEditMode();
    this.isConfirmationPopUpEnabled = true;
  }

  public onOrderSubmit(): void {
    console.log(this.offlineOrder);
    this.orderService.submitOrderFromOrderHistory(this.offlineOrder);
  }

  private calculatePagination(): Array<{
    pageNumber: number;
    orders: Array<Order>;
  }> {
    this.pages = Math.ceil(this.orders.length / this.ordersPerPage);
    this.ordersOnLastPage = this.orders.length % this.ordersPerPage;

    const pageIndices = [];

    for (let i = 1; i <= this.pages; i++) {
      const currentPageOrders = {
        pageNumber: i,
        orders: this.getOrdersForCurrentPage(i)
      };
      
      pageIndices.push(currentPageOrders);
    }

    return pageIndices;
  }

  private getOrdersForCurrentPage(pageNumber): Array<Order> {
    const from = pageNumber * this.ordersPerPage - this.ordersPerPage;
    const to = pageNumber != this.pages ? 
               from + this.ordersPerPage - 1 :
               from + this.ordersOnLastPage - 1;
    const orders = [];

    for (let i = from; i <= to; i++) {
      orders.push(this.orders[i]);
    }

    return orders;
  }

  public getOrdersForPage(pageNumber): void {
    this.orders = this.ordersForPages[pageNumber - 1].orders;
  }

  public getOrders(): void {
    this.loadingService.toggleLoading();
    this.editModal.toggleEditMode();

    this.orderSubscription = this.orderService
      .getOrders()
      .subscribe(
        this.onGetOrderSuccess.bind(this),
        this.onGetOrderFailure.bind(this)
      );
  }

  private onGetOrderSuccess(orders: Array<Order>): void {
    if (orders[0]) {
      this.orders = orders;
      this.editModal.toggleEditMode();
      this.loadingService.toggleLoading();
      this.ordersForPages = this.calculatePagination();
      this.orders = this.ordersForPages[0].orders;
      this.onlineMode = this.orders.length > 0;
    }
  }

  private onGetOrderFailure(err): void {
    this.editModal.toggleEditMode();
    this.loadingService.toggleLoading();
    this.onlineMode = false;
  }
}
