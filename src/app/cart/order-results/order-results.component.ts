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
  orderLogoStatus: string;
  orderStatusMsg: string;
  orderSuccessLogoPath: string = './../../../assets/success.png';
  orderFailureLogoPath: string = './../../../assets/orderError.png';
  orderNetworkDisabledLogoPath: string = './../../../assets/errorNetwork.png';

  constructor(private activeRoute: ActivatedRoute,
              private orderService: OrdersService,
              private router: Router) { }


  ngOnInit() {
    this.checkOrderStatus();

    switch(this.orderStatus) {
      case 'orderSuccess': 
        this.orderLogoStatus = this.orderSuccessLogoPath;
        this.orderStatusMsg = 'You\'ve successfully made an order :)';
      break;

      case 'orderFailure': 
        this.orderLogoStatus = this.orderFailureLogoPath;
        this.orderStatusMsg = 'Something went wrong(';
      break;

      case 'offlineMode':  
        this.orderLogoStatus = this.orderNetworkDisabledLogoPath;
        this.orderStatusMsg = 'You\'re in the offline mode(:';
      break;
    }  
  
    this.checkLastOrder();
    
  }

  private checkLastOrder(): void {
    this.order = this.orderService.getLastOrder();
    console.log(this.orderStatus);
    // this.orderStatusMsg = this.orderStatus === 'orderSuccess' ?
    //   'You\'ve successfully made an order :)' : 'Something went wrong(';
      
  
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
