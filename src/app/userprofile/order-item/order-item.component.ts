import { ProductService } from 'src/app/shared/services/products.service';
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Order } from 'src/app/cart/order.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() order;
  @Output('onOrderConfirmed') onOrderConfirmed = new EventEmitter();
  
  isOrderDetailExpanded: boolean = false;
  constructor(private productsService: ProductService,
              private router: Router) { }

  ngOnInit() { }

  getDate(date) {
    const orderDate = (new Date(date)).toLocaleDateString();
    return orderDate;
  }

  submitOrder() {
    this.onOrderConfirmed.emit(this.order);
  }

  getTime(date) {
    const orderTime = (new Date(date)).toLocaleTimeString();
    return orderTime;
  }

  
  getProductsQuantity(item) {
    let productQuantity = 0;
    item['products'].forEach( product => {
      productQuantity += product.productQuantity;
    });
   
    return productQuantity;
  }


  toggleOrderDetail() {
    this.isOrderDetailExpanded = !this.isOrderDetailExpanded;
  }
  
  navigateToProductDetailPage(product) {
    this.productsService.setSelectedProduct(product);
    this.router.navigate([`dashboard/product-details/${product.id}`])
  }

}
