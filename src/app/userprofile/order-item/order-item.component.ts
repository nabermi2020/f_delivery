import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/cart/order.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() order;
  
  isOrderDetailExpanded: boolean = false;
  constructor() { }

  ngOnInit() {
    console.log(this.order);
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
 * Toggle order details block 
 */
toggleOrderDetail() {
  this.isOrderDetailExpanded = !this.isOrderDetailExpanded;
}

}
