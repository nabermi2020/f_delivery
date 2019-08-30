import { Product } from './../product.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
    products = {
        pizza: [
            new Product("Піца Емілія", "./../../assets/pizza1.jpg", "550", "30", "Шинка, моцарела, помідори, кукурудза, соус часниковий", 200),
            new Product("Чотири Сири Класична", "./../../assets/pizza3.jpg", "550", "30", " Моцарела, пармезан, сир чедер, сир дорблю, соус вершковий, білий сир Брі", 199),
            new Product("Піца Емілія", "./../../assets/pizza1.jpg", "550", "30", "Шинка, моцарела, помідори, кукурудза, соус часниковий", 200),
            new Product("Чотири Сири Класична", "./../../assets/pizza3.jpg", "550", "30", " Моцарела, пармезан, сир чедер, сир дорблю, соус вершковий, білий сир Брі", 199),
            new Product("Піца Емілія", "./../../assets/pizza1.jpg", "550", "30", "Шинка, моцарела, помідори, кукурудза, соус часниковий", 200)    
        ]
        
    }
 
    getProducts() {
        return this.products;
    }
}