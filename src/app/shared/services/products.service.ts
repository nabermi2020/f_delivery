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
        const searchObservable = Observable.create( (observer: Observer<any>) => {
        let onlineMode = navigator.onLine;
        
        if (onlineMode) {
            this.searchProductsOnline(query, observer);
        } else {
            this.searchProductOffline(query, observer);
        }
        });
               
        return searchObservable;
    }

    searchProductOffline(query, observer) {
        let productsDetail = JSON.parse(localStorage.getItem('productList'));
        let localeProductList = productsDetail.products;
        let searchRes = [];
        localeProductList.filter( (item) => {
            if (item.productTitle == query) {
                searchRes.push(item);
            }
        });

        if (searchRes.length > 0) {
            observer.next(searchRes);
        } else if (searchRes.length == 0) {
            //Should be fixed
            observer.next([]);
        }
    }

    searchProductsOnline(query, observer) {
        const requestedWords = query.split(' ');
        let queryTemplate = requestedWords.length > 1 ? requestedWords.join('%20') : query;
        const result = combineLatest(
            this.searchProductsByCategory('salads', queryTemplate),
            this.searchProductsByCategory('drinks', queryTemplate),
            this.searchProductsByCategory('pizza', queryTemplate)
        );
           
        result.subscribe(
            (searchResults) => {
                let results = searchResults ? this.getFormattedResults(searchResults) : []; 
                observer.next(results);
            }, 

            (searchError) => {
                console.log(searchError);
                observer.error('All');
            }
        );
    }

    getFormattedResults(searchResults) {
        const results = [];
        searchResults.forEach(searchResByProdCategory => {
          searchResByProdCategory.forEach(item => {
            results.push(item);
          });
        });
    
        return results;
    }

    searchProductsByCategory(category, query): Observable<any> {
        return this.http.get(`${this.apiUrl}/${category}?productTitle=${query}`);
    }

    getResults() {
        return this.results;
    }
    
}
