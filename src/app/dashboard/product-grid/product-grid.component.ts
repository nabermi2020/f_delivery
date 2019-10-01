import { LoadingService } from '../../shared/services/loading.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/services/products.service';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})

export class ProductGridComponent implements OnInit, OnDestroy {
  products: any;
  activeCategory: string = "pizza";
  activeFilter: string = "All";
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

    // subscribe inside subscribe not good practice, please take a look - https://stackoverflow.com/questions/52317494/is-it-good-way-to-call-subscribe-inside-subscribe
    // or check it more deeply
    this.urlParSubscription = this.route.firstChild.params
      .subscribe(
        (par: Params) => {
          this.activeCategory = par["cat"];
          this.loadingService.toggleLoading();
          this.editModal.toggleEditMode();
          this.productsByCategorySubscription = this.productsService.getProductsByCategory(this.activeCategory)
            .subscribe(
              res => {
                this.products = res;
                this.activeFilter = "All";
                this.loadingService.toggleLoading();
                this.editModal.toggleEditMode();
              },

              err => {
              console.log(err);
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
      res => {
          this.products = res;
          this.loadingService.toggleLoading();
          this.editModal.toggleEditMode();
      },
      err => {
          console.log(err);
      }
    );
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

}
