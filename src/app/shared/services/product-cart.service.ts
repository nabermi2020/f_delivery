import { Cart } from '../../cart/cart/cart.model';
import { AuthService } from '../../auth/auth.service';
import { Injectable  } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Product } from '../product.model';
import { Subject, Subscription, Observable } from 'rxjs';
import { Order } from 'src/app/cart/order.model';


@Injectable()
export class ProductCart {
    cart = new Cart();
    onProductAdded = new Subject<any>();
    gettingProducts = new Subscription();
    apiUrl: any = "https://f-deploy.herokuapp.com";

    constructor(private authService: AuthService,
                private http: HttpClient) {
                // this.unsubscribeFromProductsGettedFromServer();  
                this.checkCartExistenseByUserId();
                this.getCartFromServer();
    }
    
/**
 * Checking cart existense on the server
 */
    checkCartExistenseByUserId() {
        this.cart.setUserId(this.authService.getCurrentUser());
        const userId = this.authService.getCurrentUser().id;
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        this.http.get(`${this.apiUrl}/cart?id=${userId}`, { headers })
            .subscribe(
                (res: Array<any>) => {
                    if (res.length != 0) {
                     //  alert('Cart exists!');
                        // console.log(res);
                    } else {
                       // alert('Cart doesn\'t exist!');
                        this.createCartOnServer();
                    }
                }
            );
    }

/**
 * Create cart on the server if it doesn't exist
 */
    createCartOnServer() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        this.http.post(`${this.apiUrl}/cart`, this.cart, { headers })
            .subscribe(
                res => {
                    alert('Cart is  created!');
                }
            );    
    }

 /**
  * Add products to the cart and sync it with server
  */     
    addProducts(product: Product) {
        this.cart.addProduct(product);
        this.synchCartWithServer();
        this.onProductAdded.next(this.cart.getCart());
    }

 /**
  * Sync current cart with user's carton the server
  */   
    synchCartWithServer() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        const userData = this.authService.getCurrentUser();

        console.log(userData);   

        this.http.put(`${this.apiUrl}/cart/${this.cart.id}`, this.cart, { headers })
            .subscribe(
                res => {
                   // alert('successfully added');
                },
                err => {
                    // alert('error added');
                }
            );
    }

 /**
  * Get appropriate cart from server
  */   
    getCartFromServer() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        const userId = this.authService.getCurrentUser().id;
        this.gettingProducts = this.http.get(`${this.apiUrl}/cart/${userId}`, { headers })
            .subscribe(
                res => {
                    // console.log('Getted from server!');
                    this.cart.setProducts(res["products"]);
                    this.cart.setCartId(res["cartId"]);
                    this.onProductAdded.next(this.cart.getCart());     
                    // console.log(this.cart);
                    // alert('Success getting cart!!!');
                },
                err => {
                    alert('Error while getting cart from server!');
                }
            );
    }

/**
 * Unsubscribe from subscription in case of user isn't authorized 
 */     
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
        );
    }
  
/**
 * Calculate product's quantity in the cart
 * @return {number} product's quantity
 */    
    calculateProductsQuantity(): number {
        return this.cart.calculateProductsQuantity();
    }

/**
 * Get products from cart
 * @return {Cart} product's cart
 */    
    getProducts(): Array<Product> {
        return this.cart.getCart();
    }


/**
 * Delete product with appropriate number
 * @param {number} product's number 
 */    
    deleteProductById(id) {
        this.cart.deleteProductById(id);
        this.onProductAdded.next(this.cart.getCart());
        this.synchCartWithServer();
    }

 /**
  * Get total cart's price
  * @return {number} total price
  */   
    getTotalPrice() {
        return this.cart.getTotalPrice();
    }  

 /**
  * Get product cart
  * @return {Cart} cart
  */   
    getProductCart(): Cart {
        return this.cart;
    }

 /**
  * Clear product cart
  */   
    cleanCart() {
        this.cart.cleanCart();
        this.synchCartWithServer();
        this.onProductAdded.next(this.cart);
    }

    // It's not realized
    onOrderSuccess() {
        // TODO
    }

    // It's not realized
    onOrderError() {
        // TODO
    }    
}
