import { Cart } from '../../cart/cart/cart.model';
import { AuthService } from '../../auth/auth.service';
import { Injectable  } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Product } from '../product.model';
import { Subject, Subscription, Observable } from 'rxjs';
import { Order } from 'src/app/cart/order.model';
import { environment } from 'src/environments/environment';


@Injectable()
export class ProductCart {
    cart = new Cart();
    onProductAdded = new Subject<any>();
    gettingProducts = new Subscription();
    apiUrl: any = environment.apiUrl;

    constructor(private authService: AuthService, private http: HttpClient) {  
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
            .subscribe(this.createCartOnServer.bind(this));
    }

/**
 * Create cart on the server if it doesn't exist
 */
    createCartOnServer(response) {
        if (response.length == 0) {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        this.http.post(`${this.apiUrl}/cart`, this.cart, { headers })
            .subscribe(this.onCreateCartSuccess.bind(this));   
        } 
    }

    onCreateCartSuccess(successRes) {
        console.log('Cart is created!');
        console.log(successRes);
    }

 /**
  * Add products to the cart and sync it with server
  */     
    addProducts(product: Product) {
        console.log(product);
        console.log(this.cart);
        let onlineMode = navigator.onLine;
        this.cart.addProduct(product);
        this.onProductAdded.next(this.cart.getCart());
        
        if (onlineMode) {
            this.synchCartWithServer();
            localStorage.setItem('productCart', JSON.stringify(this.cart));
        } else {
            localStorage.setItem('productCart', JSON.stringify(this.cart));
        }
    }

 /**
  * Sync current cart with user's carton the server
  */   
    synchCartWithServer() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        const userData = this.authService.getCurrentUser();
        console.log('here');
        console.log(this.cart);
        this.http.put(`${this.apiUrl}/cart/${this.cart.id}`, this.cart, { headers })
            .subscribe(
                res => {
                   console.log('successfully added');
                },
                err => {
                    console.log('Error while adding product to the cart!');
                }
            );
    }

 /**
  * Get appropriate cart from server
  */   
    getCartFromServer() {
        if (navigator.onLine) {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        const userId = this.authService.getCurrentUser().id;
        this.gettingProducts = this.http.get(`${this.apiUrl}/cart/${userId}`, { headers })
            .subscribe(
                this.onGetCartSuccess.bind(this),
                this.onGetCartFailure.bind(this)
            );
        }
    }

    onGetCartSuccess(cart) {
         let localCart = JSON.parse(localStorage.getItem("productCart"));
         let localCartInstanse = new Cart(localCart["products"]);

         if (localCartInstanse) {
            this.cart.setProducts(localCart["products"]);
            this.cart.setCartId(localCart["cartId"]);
         } else {
            this.cart.setProducts(cart["products"]);
            this.cart.setCartId(cart["cartId"]);
         }

         this.onProductAdded.next(this.cart.getCart());
         localStorage.setItem('productCart', JSON.stringify(this.cart));     
    }

    onGetCartFailure(error) {
        console.log(error);
        alert('Error while getting cart from server!');
    }

    getCartFromLocalStorage() {
        let cart = JSON.parse(localStorage.getItem('productCart'));
        this.cart.setProducts(cart["products"]);
        this.cart.setCartId(cart["cartId"]);
        this.onProductAdded.next(this.cart);
        return this.cart.getCart();
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
        this.syncCartWithServerAndLocalStorage();
    }

    syncCartWithServerAndLocalStorage() {
        let onlineMode = navigator.onLine;
        
        if (onlineMode) {
            this.synchCartWithServer();
        }
        localStorage.setItem('productCart', JSON.stringify(this.cart));   
    }

/**
 * Increase product quantity on 1 for appropriate product in the cart
 * @param {number} product's id 
 */    
    addOneProductToCart(id) {
        this.cart.addOneProductToCart(id);
        this.onProductAdded.next(this.cart.getCart());
        this.syncCartWithServerAndLocalStorage();
    }

/**
 * Decrease product quantity on 1 for appropriate product in the cart
 * @param {number} product's id 
 */    
    deleteOneProductFromCart(id) {
        this.cart.deleteOneProductFromCart(id);
        this.onProductAdded.next(this.cart.getCart());
        this.syncCartWithServerAndLocalStorage();
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
        this.syncCartWithServerAndLocalStorage();
        this.onProductAdded.next(this.cart);
    }
  
}
