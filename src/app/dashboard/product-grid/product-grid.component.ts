import { LoadingService } from '../../shared/services/loading.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/services/products.service';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})

export class ProductGridComponent implements OnInit, OnDestroy {
  products: any;
  isSearchFailure: boolean = true;
  activeCategory: string = "pizza";
  activeFilter: string = "All";
  onlineMode: boolean = true;
  urlParSubscription = new Subscription();
  productSubscription = new Subscription();
  productsByCategorySubscription = new Subscription();
  
  constructor(private productsService: ProductService,
              private route: ActivatedRoute,
              private editMode: EditModalService,
              private loadingService: LoadingService,
              private editModal: EditModalService) { }

  ngOnInit() {
    this.getProducts();
 
    this.urlParSubscription = this.route.firstChild.params
      .subscribe( 
        (par: Params) => {
          this.activeCategory = par["cat"];
          //this.onlineMode = true;
          this.isSearchFailure = true;
          this.loadingService.toggleLoading();
          this.editModal.toggleEditMode();
          this.productsByCategorySubscription = this.productsService.getProductsByCategory(this.activeCategory)
            .subscribe(
              res => {
                this.onlineMode = true;
                this.products = res;
                this.activeFilter = "All";
                this.loadingService.toggleLoading();
                this.editModal.toggleEditMode();
              },
      
              err => {
                // console.log(err);
              });
      });
  }

/**
 * Get products using 'productService'
 */  
  getProducts() {
    this.loadingService.toggleLoading();
    this.editModal.toggleEditMode();
    this.productSubscription = this.productsService.getProducts()
    .subscribe(
      this.onGetProductsSuccess.bind(this),       
      this.onGetProductError.bind(this)
    );
  }

  onGetProductsSuccess(products: Observable<any>) {
    this.products = products;
    this.onlineMode = true;
    this.loadingService.toggleLoading();
    this.editModal.toggleEditMode();  
  }

  onGetProductError(err) {
    this.onlineMode = false;
    console.log(err);
  }

 /**
  * Set filter category
  * @param {String} product category 
  */ 
  setFilterCategory(cat) {
    this.activeFilter = cat;
  }

  ngOnDestroy() {
    this.urlParSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
    this.productsByCategorySubscription.unsubscribe();
  }

  setProducts(products) {
    if (products.length > 0 && products != 'All') {
      this.products = products;
      this.isSearchFailure = true;
    } else if (products == "All") {
      this.getProducts();
      this.isSearchFailure = true;
    } else {
      this.products = [];
      this.isSearchFailure = false;
    }
  }

}
