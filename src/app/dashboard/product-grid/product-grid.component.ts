import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/servives/products.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {
  products: any;
  activeCategory: string = "pizza";
  constructor(private productsService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProducts();
    //console.log(this.products[this.activeCategory]);
    // this.route.params
    //   .subscribe( (par: Params) => {
    //     console.log(par.category);
    //   }) 
  }

  getProducts() {
    this.products = this.productsService.getProducts();
  }

}
      