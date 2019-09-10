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

        // this.synchronizeCartWithServer()
        //     .subscribe(
        //         res => {
        //             console.log('SUCCESS CART UPDATED!')
        //         },
        //         err => {
        //             alert('Error - cart isn\'t synchronized!');
        //         }
        //     )
         //this.calculateTotalPrice();
         this.onProductAdded.next(this.products);
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
        return this.cart.getCart();
    }

    deleteProductById(id) {
        this.cart.deleteProductById(id);
        this.onProductAdded.next(this.products);
        //this.synchronizeCartWithServer().subscribe();
    }

    calculateTotalPrice() {
        this.cart.calculateTotalPrice();
    }

    getTotalPrice() {
        return this.cart.getTotalPrice();
    }  
}