import { ProductService } from "src/app/shared/services/products.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Order } from "src/app/cart/order.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-order-item",
  templateUrl: "./order-item.component.html",
  styleUrls: ["./order-item.component.scss"]
})
export class OrderItemComponent implements OnInit {
  @Input() order;
  @Output("onOrderConfirmed") onOrderConfirmed = new EventEmitter();

  isOrderDetailExpanded: boolean = false;
  constructor(
    private productsService: ProductService,
    private router: Router
  ) {}
  ngOnInit() {}

  public getDate(date): string {
    const orderDate = new Date(date).toLocaleDateString();
    return orderDate;
  }

  public submitOrder(): void {
    this.onOrderConfirmed.emit(this.order);
  }

  public getTime(date): string {
    const orderTime = new Date(date).toLocaleTimeString();
    return orderTime;
  }

  public getProductsQuantity(item): number {
    let productQuantity = 0;
    item["products"].forEach(product => {
      productQuantity += product.productQuantity;
    });

    return productQuantity;
  }

  public toggleOrderDetail(): void {
    this.isOrderDetailExpanded = !this.isOrderDetailExpanded;
  }

  public navigateToProductDetailPage(product): void {
    this.productsService.setSelectedProduct(product);
    this.router.navigate([`dashboard/product-details/${product.id}`]);
  }
}
