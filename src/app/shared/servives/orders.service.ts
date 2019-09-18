import { ProductCart } from './product-cart.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './../../auth/auth.service';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/cart/order.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl: any = "http://localhost:3000";

  constructor(private authService: AuthService,
              private http: HttpClient,
              private productCart: ProductCart,
              private router: Router) {
  }


  makeAnOrder(order: Order) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    let id = this.authService.getCurrentUser().id;
    order.setUserId(id);
    console.log(order);
    
    this.http.post(`${this.apiUrl}/orders`, order, { headers: headers})
        .subscribe(
            res => {
                console.log(res);
                alert('Your order is succesfully done!');
                this.productCart.cleanCart();
                this.router.navigate(['dashboard/products/pizza']);
            },
            err => {
                console.log(err);
                alert('Something went wrong!');
            }
        );
}

}