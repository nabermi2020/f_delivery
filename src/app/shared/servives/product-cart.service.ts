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

    deleteProductById(id) {
        let deleteWithId;
        this.products.forEach( (item, index) => {
            if ( item.id == id ) {
                deleteWithId = index;
            }
        });
        this.products.splice(deleteWithId, 1);
        console.log(this.products);
        this.onProductAdded.next(this.products);

    }
    

}