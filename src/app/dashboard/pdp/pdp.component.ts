import { ProductService } from './../../shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/shared/services/product-cart.service';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.scss']
})
export class PdpComponent implements OnInit {
  productDetails;
  productQuantity: number = 1;
  ingredients: string[];
  constructor(private activeRoute: ActivatedRoute,
              private productService: ProductService,
              private productCartService: ProductCart) { }

  ngOnInit() {
    this.productDetails = this.productService.getSelectedProduct();
    this.getIngredients();
    this.activeRoute.children[0].params
      .subscribe (
        res => {
          console.log(res);
        }
      );
  }

  addToCart() {
    console.log(this.productDetails);
    this.productDetails.productQuantity = this.productQuantity;
    this.productCartService.addProducts(this.productDetails);
    this.productQuantity = 1;
  }

  getIngredients() {
    this.ingredients = this.productDetails.productDescription.split(', ');
  }

  decreaseProdCounterOnOne() {
    if (this.productQuantity != 1) {
      --this.productQuantity;
    }

    this.productDetails.productQuantity = this.productQuantity;
  }

  increaseProductCounterOnOne() {
    ++this.productQuantity;
    this.productDetails.productQuantity = this.productQuantity;
  }

}
