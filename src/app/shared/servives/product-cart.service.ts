import { AuthService } from './../../auth/auth.service';
import { Injectable  } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Product } from '../product.model';
import { Subject, Subscription } from 'rxjs';


@Injectable()
export class ProductCart {
    products: Array<any> = [];
    onProductAdded = new Subject<any>();
    onPriceChanged = new Subject<any>();
    product = new Subscription();
    apiUrl: any = "http://localhost:3000";
    totalPrice: number;

    constructor(private authService: AuthService,
                private http: HttpClient) {
        
        this.product = this.getProductsFromServer()
            .subscribe(
                res => {
                    this.products = res["cart"];
                    this.onProductAdded.next(this.products);
                    //console.log(this.products);
                },

                err => {
                    alert('Error products!');
                }
            );

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
        let productId = product.id;
       
        if (!this.checkForDublicates(productId)) {
            product["productQuantity"] = 1;
            this.products.push(product);
            //console.log(this.products);
        } else {
            // product["productQuantity"] = this.checkForDublicates(productId);
            // this.products.push(product);
            this.products.forEach( item => {
                if (item.id == productId ) {
                    item["productQuantity"] += 1;
                }
            }) 
        }

        this.synchronizeCartWithServer()
            .subscribe(
                res => {
                    console.log('SUCCESS CART UPDATED!')
                },
                err => {
                    alert('Error - cart isn\'t synchronized!');
                }
            )
        this.calculateTotalPrice();
        this.onProductAdded.next(this.products);
       // console.log(this.products);
    }

    getProductsFromServer() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        let userData = this.authService.getCurrentUser();
        console.log(userData);
        return this.http.get(`${this.apiUrl}/users/${userData.id}`, { headers: headers });   
    }

    synchronizeCartWithServer() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        let userData = this.authService.getCurrentUser();
        userData.cart = this.products;

        return this.http.put(`${this.apiUrl}/users/${userData.id}`, userData, { headers: headers});
        //console.log(userData);
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
        this.synchronizeCartWithServer().subscribe();
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