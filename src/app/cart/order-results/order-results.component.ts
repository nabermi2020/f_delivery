import { Order } from './../order.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-order-results',
  templateUrl: './order-results.component.html',
  styleUrls: ['./order-results.component.scss']
})
export class OrderResultsComponent implements OnInit {
  order: Order;
  orderStatus: string;
  isNetworkDisabled: boolean = false;
  orderLogoStatus: string;
  orderStatusMsg: string;
  orderSuccessLogoPath: string = './../../../assets/success.png';
  orderFailureLogoPath: string = './../../../assets/orderError.png';

  constructor(private activeRoute: ActivatedRoute,
              private orderService: OrdersService,
              private router: Router) { }


  ngOnInit() {
    this.checkOrderStatus();
    this.updateOrderStatus();
    this.checkLastOrder();
  }

  private updateOrderStatus(): void {
    switch(this.orderStatus) {
      case 'orderSuccess': 
        this.orderLogoStatus = this.orderSuccessLogoPath;
        this.isNetworkDisabled = false;
        this.orderStatusMsg = 'You\'ve successfully made an order :)';
      break;

      case 'orderFailure': 
        this.orderLogoStatus = this.orderFailureLogoPath;
        this.isNetworkDisabled = false;
        this.orderStatusMsg = 'Something went wrong(';
      break;

      case 'offlineMode':  
        this.isNetworkDisabled = true;
        this.orderStatusMsg = 'You\'re in the offline mode(:';
      break;

      case 'submitSuccess':
        this.isNetworkDisabled = true;
        this.orderStatusMsg  = 'Order has been successfully submitted';
        break;

        case 'submitFailure':
          this.isNetworkDisabled = true;
          this.orderStatusMsg  = 'Something went wrong( You\'re in offline mode';
          break;
    } 
  }

  private checkLastOrder(): void {
    this.order = this.orderService.getLastOrder();
    console.log(this.orderStatus);  
  }

  private checkOrderStatus(): void {
    this.activeRoute.children[0].params
    .subscribe(
      (orderStatus: Params) => {
        this.orderStatus = orderStatus.orderStatus;
      }
    );
  }

  public navToDashboard(): void {
    this.router.navigate(['dashboard/products/pizza']);
  }

}
