import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { ProductCart } from 'src/app/shared/services/product-cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() productData: Product;
  success: boolean = false;

  constructor(private productCartService: ProductCart) { }

  ngOnInit() { }

 /**
  * Add product to cart
  */ 
  addProductToCart() {
    this.success = true;
    this.productCartService.addProducts(this.productData);
    setTimeout(() => {
      this.success = false;
    }, 1000);
  }

}
