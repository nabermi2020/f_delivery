import { ProductService } from './../../shared/servives/products.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
  products: any[];

  constructor(private authService: AuthService,
              private productsService: ProductService) { }

  ngOnInit() {
    console.log(this.authService.users);
  
  }

   

}
