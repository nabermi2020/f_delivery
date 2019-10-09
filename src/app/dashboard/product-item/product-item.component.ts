import { ProductService } from 'src/app/shared/services/products.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { ProductCart } from 'src/app/shared/services/product-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() productData: Product;
  success: boolean = false;
  productQuantity: number = 1;
  

  constructor(private productCartService: ProductCart, private router: Router, private productService: ProductService) { }

  ngOnInit() { }

 /**
  * Add product to cart
  */ 
  addProductToCart() {
    this.success = true;
    this.productData.productQuantity = this.productQuantity;
    this.productCartService.addProducts(this.productData);
    setTimeout(() => {
      this.success = false;
    }, 1000);
    this.productQuantity = 1;
  }

  navigateToPdp() {
    this.productService.setSelectedProduct(this.productData);
    this.router.navigate(['dashboard/product-details', this.productData.id]);
  }

  increaseProdCounterOnOne() {
    ++this.productQuantity;
    this.productData.productQuantity = this.productQuantity;
  }

  decreaseProdCounterOnOne() {
    if (this.productQuantity != 1) {
      --this.productQuantity;
    }
    
    this.productData.productQuantity = this.productQuantity;
  }
}
