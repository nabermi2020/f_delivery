import { Product } from '../product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable, Subscription, Subject, combineLatest, Observer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { merge } from 'rxjs/operators';

@Injectable()
export class ProductService {
    apiUrl: string = environment.apiUrl;
    selectedProduct;
    results = [];

    products = {
        // pizza: [
        //     new Product("Піца Емілія", "./../../assets/pizza1.jpg", "550", "30", "Шинка, моцарела, помідори, кукурудза, соус часниковий", 200),
        //     new Product("Чотири Сири Класична", "./../../assets/pizza3.jpg", "550", "30", " Моцарела, пармезан, сир чедер, сир дорблю, соус вершковий, білий сир Брі", 199),
        //     new Product("Піца Емілія", "./../../assets/pizza1.jpg", "550", "30", "Шинка, моцарела, помідори, кукурудза, соус часниковий", 200),
        //     new Product("Чотири Сири Класична", "./../../assets/pizza3.jpg", "550", "30", " Моцарела, пармезан, сир чедер, сир дорблю, соус вершковий, білий сир Брі", 199),
        //     new Product("Піца Емілія", "./../../assets/pizza1.jpg", "550", "30", "Шинка, моцарела, помідори, кукурудза, соус часниковий", 200)    
        // ]    
    };

    constructor(private http: HttpClient) { 
        
    }
 
 /**
  * Save products on the server
  */   
    saveProducts() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        this.http.post(this.apiUrl, this.products, { headers})
            .subscribe(
                res => {   
                    console.log(res);
                },
                err => {
                    console.log(err);
                }
            );
    }

/**
 * Get all products from server
 * @return {Observable} return all products
 */    
    getProducts() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        const productsObservable = Observable.create( (observer: Observer<any>) => {
        let onlineMode = navigator.onLine;
        if (onlineMode) {
            this.http.get(`${this.apiUrl}/pizza`, {headers})
                .subscribe(
                  (productList: Array<any>) => {
                      observer.next(this.onProductGetSuccess(productList));
                      localStorage.setItem("productList", JSON.stringify({category: "pizza", products: productList}));
                  },
                  err => {
                      observer.error('error while getting products! ' + err);
                  } 
                ); 
        } else {
            observer.error("Offline mode!");
        }
        });
        return productsObservable;
    }

    onProductGetSuccess(productList: Array<any>) { 
        let products;
        if (productList.length > 0) {
            // console.log(productList);
            products = productList;
            this.products = productList;
        }   
        return products;   
    }

/**
 * Get products according to selected category
 * @param {String} product's category
 * @return {Observable} products which are matched search query
 */    
    getProductsByCategory(category: string): Observable<any> {
        const productsObserver = Observable.create((observer: Observer<any>) => {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        let online = navigator.onLine;
        // Need to separate to 2 functions  - online && offline mode
        if (online) {
            this.http.get(`${this.apiUrl}/${category}`, {headers})
            .subscribe(
                (products: Array<any>) => {
                    if (products.length > 0) {
                        observer.next(products);
                        localStorage.setItem("productList", JSON.stringify({category: category, products: products}));
                    } else {
                        observer.error('No Products!');
                    }
                },
            
                err => {
                    observer.error(err);
                }
            );
        } else {
            let productList = JSON.parse(localStorage.getItem('productList'));
            if (productList.category == category) {
                observer.next(productList.products);
            } else {
                observer.error('Offline mode!');
            }
        }
     
        });
        
        return productsObserver;
    }

    setSelectedProduct(productInfo) {
        this.selectedProduct = productInfo;
    }

    getSelectedProduct() {
        return this.selectedProduct;
    }

    searchProducts(query) {
        const requestedWords = query.split(' ');
        let queryTepmlate = '';
        
        // Refactor
        if (requestedWords.length > 1) {
            queryTepmlate = requestedWords.join('%20');
        } else {
            queryTepmlate = query;
        }
        
        const pizzaResults = this.http.get(`${this.apiUrl}/pizza?productTitle=${queryTepmlate}`);
        const saladsResults = this.http.get(`${this.apiUrl}/salads?productTitle=${queryTepmlate}`);
        const drinksResults = this.http.get(`${this.apiUrl}/drinks?productTitle=${queryTepmlate}`); 
        const result = combineLatest(saladsResults, drinksResults, pizzaResults);       
        
        return result;
    }

    getResults() {
        return this.results;
    }
    
}
