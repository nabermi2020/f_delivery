import { Cart } from './../../cart/cart/cart.model';
import { AuthService } from './../../auth/auth.service';
import { Injectable  } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Product } from '../product.model';
import { Subject, Subscription } from 'rxjs';


@Injectable()
export class ProductCart {
    cart = new Cart();
    onProductAdded = new Subject<any>();
    product = new Subscription();
    apiUrl: any = "http://localhost:3000";

    constructor(private authService: AuthService,
                private http: HttpClient) {
            this.onProductsGettedFromServer();
            this.unsubscribeFromProductsGettedFromServer();       
    }

    onProductsGettedFromServer() {
        this.product = this.getProductsFromServer()
        .subscribe(
            res => {
                this.cart.setProducts(res["cart"]);
                this.onProductAdded.next(this.cart.getCart()); 
                console.log(this.cart);
            },

            err => {
                alert('Error products!');
            }
        );
    }

    unsubscribeFromProductsGettedFromServer() {
        this.authService.isUserAuthorized
        .subscribe(
            res => {
                if (!res) {
                   this.product.unsubscribe(); 
                }
            },

            err => {
                alert(err);
            }
        )
    }
     
    addProduct(product: Product) {
        this.cart.addProduct(product);

        this.synchronizeCartWithServer()
            .subscribe(
                res => {
                    console.log('SUCCESS CART UPDATED!')
                },
                err => {
                    alert('Error - cart isn\'t synchronized!');
                }
            )

         this.onProductAdded.next(this.cart.getCart());
    }

    getProductsFromServer() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        let userData = this.authService.getCurrentUser();
        // console.log(userData.cart);
        
        return this.http.get(`${this.apiUrl}/users/${userData.id}`, { headers: headers });   
    }

    synchronizeCartWithServer() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        let userData = this.authService.getCurrentUser();
        userData.cart = this.cart.getCart();

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
        this.onProductAdded.next(this.cart.getCart());
        this.synchronizeCartWithServer().subscribe();
    }

    getTotalPrice() {
        return this.cart.getTotalPrice();
    }  
}