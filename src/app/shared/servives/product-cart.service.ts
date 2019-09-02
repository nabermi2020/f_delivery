import { Injectable } from '@angular/core';
import { Product } from '../product.model';
import { Subject } from 'rxjs';


@Injectable()
export class ProductCart {
    products: Array<Product> = [];
    onProductAdded = new Subject<any>();

    constructor() {}
        
    addProduct(product: Product) {
        this.products.push(product);
        this.onProductAdded.next(this.products);
       // console.log(this.products);
    }

    getProducts(): Array<Product> {
        return this.products;
    }
    

}