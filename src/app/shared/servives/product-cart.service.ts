import { Cart } from './../../cart/cart/cart.model';
import { AuthService } from './../../auth/auth.service';
import { Injectable  } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Product } from '../product.model';
import { Subject, Subscription, Observable } from 'rxjs';


@Injectable()
export class ProductCart {
    cart = new Cart();
    onProductAdded = new Subject<any>();
    gettingProducts = new Subscription();
    apiUrl: any = "http://localhost:3000";

    constructor(private authService: AuthService,
                private http: HttpClient) {
                //this.unsubscribeFromProductsGettedFromServer();  
            
               // console.log(this.cart);

                this.checkCartExistenseByUserId();
                this.getCartFromServer();

                // this.testObservable()
                //     .subscribe(
                //         res => {
                //             console.log(res);
                //         },
                //         err => {
                //             alert(err);
                //         }
                        
                //     )

    }
    
    //Checking cart existense on the server
    checkCartExistenseByUserId() {
        this.cart.setUserId(this.authService.getCurrentUser());
        let userId = this.authService.getCurrentUser().id;
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        this.http.get(`${this.apiUrl}/cart?id=${userId}`, { headers: headers})
            .subscribe(
                (res: Array<any>) => {
                    if (res.length != 0) {
                     //  alert('Cart exists!');
                        console.log(res);
                    } else {
                       // alert('Cart doesn\'t exist!');
                        this.createCartOnServer();
                    }
                }
            );
    }

    //For creating cart on the server if it doesn't exist
    createCartOnServer() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        this.http.post(`${this.apiUrl}/cart`, this.cart, { headers: headers})
            .subscribe(
                res => {
                    alert('Cart is  created!');
                }
            );    
    }

    addProducts(product: Product) {
        this.cart.addProduct(product);
        this.synchCartWithServer();
        this.onProductAdded.next(this.cart.getCart());
    }

    synchCartWithServer() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        let userData = this.authService.getCurrentUser();

        console.log(userData);   

        this.http.put(`${this.apiUrl}/cart/${this.cart.id}`, this.cart, { headers: headers})
            .subscribe(
                res => {
                   // alert('successfully added');
                },
                err => {
                    //alert('error added');
                }
            );
    }

    getCartFromServer() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        let userId = this.authService.getCurrentUser().id;
        this.gettingProducts = this.http.get(`${this.apiUrl}/cart/${userId}`, { headers: headers})
            .subscribe(
                res => {
                    console.log('Getted from server!');

                    this.cart.setProducts(res["products"]);
                    this.cart.setCartId(res["cartId"]);
                    this.onProductAdded.next(this.cart.getCart()); 
                    
                    console.log(this.cart);
                //    alert('Success getting cart!!!');
                },
                err => {
                    alert('Error while getting cart from server!');
                }
            ) 
    }


    unsubscribeFromProductsGettedFromServer() {
        this.authService.isUserAuthorized
        .subscribe(
            res => {
                if (!res) {
                   this.gettingProducts.unsubscribe(); 
                }
            },

            err => {
                alert(err);
            }
        )
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
        this.synchCartWithServer();
    }

    getTotalPrice() {
        return this.cart.getTotalPrice();
    }  

    testObservable(): Observable<any> {
        let test = new Observable(observer => {
            let i = 0;
            setInterval(() =>{
                observer.next(++i);
        
            }, 1000);
        
        });
        return test;
    }
}