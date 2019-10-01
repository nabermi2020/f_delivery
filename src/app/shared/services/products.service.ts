import { Product } from '../product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
    apiUrl: string = "https://f-deploy.herokuapp.com";
    
    products = {
        // pizza: [
        //     new Product("Піца Емілія", "./../../assets/pizza1.jpg", "550", "30", "Шинка, моцарела, помідори, кукурудза, соус часниковий", 200),
        //     new Product("Чотири Сири Класична", "./../../assets/pizza3.jpg", "550", "30", " Моцарела, пармезан, сир чедер, сир дорблю, соус вершковий, білий сир Брі", 199),
        //     new Product("Піца Емілія", "./../../assets/pizza1.jpg", "550", "30", "Шинка, моцарела, помідори, кукурудза, соус часниковий", 200),
        //     new Product("Чотири Сири Класична", "./../../assets/pizza3.jpg", "550", "30", " Моцарела, пармезан, сир чедер, сир дорблю, соус вершковий, білий сир Брі", 199),
        //     new Product("Піца Емілія", "./../../assets/pizza1.jpg", "550", "30", "Шинка, моцарела, помідори, кукурудза, соус часниковий", 200)    
        // ]    
    };

    constructor(private http: HttpClient) { }
 
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
}
