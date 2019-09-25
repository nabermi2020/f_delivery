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
  activeFilter: string = "All";
  constructor(private productsService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProducts();
     this.route.firstChild.params
       .subscribe( 
         (par: Params) => {
           this.activeCategory = par["cat"];
           this.productsService.getProductsByCategory(this.activeCategory)
             .subscribe(
               res => {
                this.products = res;
                this.activeFilter = "All";
               },
               
               err => {
                console.log(err);
               });
       })
  }

/**
 * Get products using 'productService'
 */  
  getProducts() {
    this.productsService.getProducts()
    .subscribe(
      res => {
          this.products = res;
      }, 
      err => {
          console.log(err);
      }
    )
  }

 /**
  * Set filter category
  * @param {String} product category 
  */ 
  setFilterCategory(cat) {
    this.activeFilter = cat;
  }

}
      