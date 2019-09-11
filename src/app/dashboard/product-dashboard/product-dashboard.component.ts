import { ProductCart } from './../../shared/servives/product-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../shared/servives/products.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { EditModalService } from 'src/app/shared/servives/edit-modal.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
  products: any[];
  isModalEnabled: any;

  constructor(private authService: AuthService,
              private productsService: ProductService,
              private route: ActivatedRoute,
              private editModal: EditModalService,
              private cartService: ProductCart) { }

  ngOnInit() {
    this.editModal.onEditChange.subscribe(
      res => {
        this.isModalEnabled = res;
      }
    )
    //this.cartService.onProductsGettedFromServer();
  }

   

}
