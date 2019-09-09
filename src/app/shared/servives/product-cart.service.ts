import { Cart } from './../../cart/cart/cart.model';
import { AuthService } from './../../auth/auth.service';
import { Injectable  } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Product } from '../product.model';
import { Subject, Subscription } from 'rxjs';


@Injectable()
export class ProductCart {
    products: Array<any> = [];
    cart = new Cart();
    onProductAdded = new Subject<any>();
    onPriceChanged = new Subject<any>();
    product = new Subscription();
    apiUrl: any = "http://localhost:3000";
    totalPrice: number;

    constructor(private authService: AuthService,
                private http: HttpClient) {
        
        // this.product = this.getProductsFromServer()
        //     .subscribe(
        //         res => {
        //             this.products = res["cart"];
        //             this.onProductAdded.next(this.products);
                    
        //             this.cart.setProducts(this.products);
        //             this.cart.getCart();
        //         },

        //         err => {
        //             alert('Error products!');
        //         }
        //     );

        // this.authService.isUserAuthorized
        //     .subscribe(
        //         res => {
        //             if (!res) {
        //                this.product.unsubscribe(); 
        //             }
        //         },

        //         err => {
        //             alert(err);
        //         }
        //     )
            
    }
     
    addProduct(product: Product) {
        this.cart.addProduct(product);
        // let productId = product.id;
       
        // if (!this.checkForDublicates(productId)) {
        //     product["productQuantity"] = 1;
        //     this.products.push(product);
            
        // } else {
            
            
        //     this.products.forEach( item => {
        //         if (item.id == productId ) {
        //             item["productQuantity"] += 1;
        //         }
        //     }) 
        // }

        // this.synchronizeCartWithServer()
        //     .subscribe(
        //         res => {
        //             console.log('SUCCESS CART UPDATED!')
        //         },
        //         err => {
        //             alert('Error - cart isn\'t synchronized!');
        //         }
        //     )
         this.calculateTotalPrice();
         this.onProductAdded.next(this.products);
       // console.log(this.products);
    }

    getProductsFromServer() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        let userData = this.authService.getCurrentUser();
       // console.log(userData);
        return this.http.get(`${this.apiUrl}/users/${userData.id}`, { headers: headers });   
    }

    synchronizeCartWithServer() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        let userData = this.authService.getCurrentUser();
        userData.cart = this.products;

        return this.http.put(`${this.apiUrl}/users/${userData.id}`, userData, { headers: headers});
        //console.log(userData);
    }

    calculateProductsQuantity(): number {
        return this.cart.calculateProductsQuantity();
    }

    getProducts(): Array<Product> {
        let products = this.cart.getCart();
        return products;
    }

    deleteProductById(id) {
        this.cart.deleteProductById(id);
        this.onProductAdded.next(this.products);
    }

    calculateTotalPrice() {
        this.cart.calculateTotalPrice();
    }

    getTotalPrice() {
        this.calculateTotalPrice();
        return this.cart.getTotalPrice();
    }  
}