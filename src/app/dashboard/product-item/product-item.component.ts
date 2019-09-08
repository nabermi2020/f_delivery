import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { ProductCart } from 'src/app/shared/servives/product-cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() productData: Product;

  constructor(private productCartService: ProductCart) { }

  ngOnInit() { }

  addProductToCart() {
    this.productCartService.addProduct(this.productData);
  }

}
