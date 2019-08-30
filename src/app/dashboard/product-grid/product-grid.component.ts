import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/servives/products.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {
  products: any[];
  constructor(private productsService: ProductService) { }

  ngOnInit() {
    this.getProducts();
   // console.log(this.products);
  }

  getProducts() {
    this.products = this.productsService.getProducts();
  }

}
