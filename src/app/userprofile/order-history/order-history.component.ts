import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/servives/orders.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: Array<any>;

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    //this.getOrders();
  }

  //Need to test
  getOrders() {
    this.orderService.getOrders()
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

}
