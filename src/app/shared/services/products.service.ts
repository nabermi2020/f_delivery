import { Product } from '../product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable, Subscription, Subject } from 'rxjs';
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
        this.test();
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
        return this.http.get(`${this.apiUrl}/pizza`, {headers});
    }

/**
 * Get products according to selected category
 * @param {String} product's category
 * @return {Observable} products which are matched search query
 */    
    getProductsByCategory(category: string): Observable<any> {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        return this.http.get(`${this.apiUrl}/${category}`, {headers});
    }

    setSelectedProduct(productInfo) {
        this.selectedProduct = productInfo;
    }

    getSelectedProduct() {
        return this.selectedProduct;
    }

    test() {
        let query = "C";
        const pizzaResults = this.http.get(`${this.apiUrl}/pizza?productTitle=With%20Prosciutto`);
        // pizzaResults.subscribe( res =>{
        //   //  console.log(res);
        // });

        const saladsResult = this.http.get(`${this.apiUrl}/salads?productTitle=With%20Prosciutto`);
        // saladsResult.subscribe(
        //     res => {
        // //        console.log(res);
        //     }
        // )
        const results = pizzaResults.pipe(merge(saladsResult));
        results.subscribe(
            resu => {
                this.results.push(resu[0]);
                console.log(this.results);
            }
        )
    }
    
}
