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
   this.route.firstChild.params.subscribe( (par: Params) => {
     this.activeCategory = par["cat"];
     this.productsService.getProductsByCategory(this.activeCategory)
     .subscribe(res => {
        this.products = res;
     },
     err => {
        console.log(err);
     });
   })
  }

  getProducts() {
    this.productsService.getProducts()
    .subscribe(
      res => {
          this.products = res;
        //  console.log(res);
      }, 
      err => {
          //console.log(err);
      }
  )
  //console.log(this.products);
  }
 

}
      