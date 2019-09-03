import { Injectable } from '@angular/core';
import { Product } from '../product.model';
import { Subject } from 'rxjs';


@Injectable()
export class ProductCart {
    products: Array<any> = [];
    onProductAdded = new Subject<any>();
    onPriceChanged = new Subject<any>();
    totalPrice: number;

    constructor() {}
        
    addProduct(product: Product) {
        let productId = product.id;
       
        if (!this.checkForDublicates(productId)) {
            product["productQuantity"] = 1;
            this.products.push(product);
            
            console.log(this.products);
        } else {
            // product["productQuantity"] = this.checkForDublicates(productId);
            // this.products.push(product);
            this.products.forEach( item => {
                if (item.id == productId ) {
                    item["productQuantity"] += 1;
                }
            })
            
        }
        
        this.calculateTotalPrice();
        this.onProductAdded.next(this.products);
       // console.log(this.products);
    }

    checkForDublicates(id) {
        let isDublicated = false;
        this.products.forEach( item => {
            if (item.id == id) {
                isDublicated = true
            }
        });
    
        return isDublicated;
    }

    calculateProductsQuantity(): number {
        let productQuantity = 0;

        this.products.forEach( item => {
            productQuantity += item.productQuantity;
        });

        return productQuantity;
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
        this.onProductAdded.next(this.products);
    }

    calculateTotalPrice() {
        let price = 0;
        this.products.forEach( item => {
            price += item.productPrice * item.productQuantity;
        });

        this.totalPrice = price;
    }

    getTotalPrice() {
        this.calculateTotalPrice();
        return this.totalPrice;
    }
}