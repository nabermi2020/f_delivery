import { LoadingService } from "../../shared/services/loading.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "src/app/shared/services/products.service";
import { EditModalService } from "src/app/shared/services/edit-modal.service";
import { Subscription } from "rxjs";
import { Product } from "src/app/shared/product.model";

@Component({
  selector: "app-product-grid",
  templateUrl: "./product-grid.component.html",
  styleUrls: ["./product-grid.component.scss"]
})
export class ProductGridComponent implements OnInit, OnDestroy {
  products: Array<Product> | string;
  isSearchFailure: boolean = true;
  activeCategory: string = "pizza";
  activeFilter: string = "All";
  onlineMode: boolean = true;
  searchAvailability: boolean = true;
  urlParSubscription = new Subscription();
  productSubscription = new Subscription();
  productsByCategorySubscription = new Subscription();

  constructor(
    private productsService: ProductService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private editModal: EditModalService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.checkSearchAvailability();
    this.getProductByCategory();
  }

  ngOnDestroy() {
    this.urlParSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
    this.productsByCategorySubscription.unsubscribe();
  }

  private checkSearchAvailability(): void {
    let localProductList = localStorage.getItem("productList");
    if (localProductList) {
      this.searchAvailability =
        JSON.parse(localStorage.getItem("productList")).products.length > 0;
    }
  }

  public getProductByCategory(): void {
    this.urlParSubscription = this.route.firstChild.params.subscribe(
      (par: Params) => {
        this.activeCategory = par["cat"];
        this.isSearchFailure = true;
        this.loadingService.toggleLoading();
        this.editModal.toggleEditMode();
        this.getProductByActiveCategory();
      }
    );
  }

  public getProductByActiveCategory(): void {
    this.productsByCategorySubscription = this.productsService
      .getProductsByCategory(this.activeCategory)
      .subscribe(
        this.onGetProductByActiveCategorySuccess.bind(this),
        this.onGetProductError.bind(this)
      );
  }

  private onGetProductByActiveCategorySuccess(productList): void {
    this.onlineMode = productList.length > 0 ? true : false;
    this.products = productList;
    this.activeFilter = "All";
    this.loadingService.toggleLoading();
    this.editModal.toggleEditMode();
  }

  public getProducts(): void {
    this.loadingService.toggleLoading();
    this.editModal.toggleEditMode();
    this.productSubscription = this.productsService
      .getProducts()
      .subscribe(
        this.onGetProductsSuccess.bind(this),
        this.onGetProductError.bind(this)
      );
  }

  private onGetProductsSuccess(products: Array<any>): void {
    this.products = products;
    this.onlineMode = true;
    this.loadingService.toggleLoading();
    this.editModal.toggleEditMode();
  }

  private onGetProductError(err): void {
    this.onlineMode = false;
    this.loadingService.toggleLoading();
    this.editModal.toggleEditMode();
  }

  public setFilterCategory(cat: string): void {
    this.activeFilter = cat;
  }

  public setProducts(products): void {
    if (products.length > 0 && products != "All") {
      this.handleAllSearchRes(products);
    } else if (products == "All") {
      this.handleOfflineAndOnlineSuccessSearchRes();
    } else {
      this.handleFailureSearchRes();
    }
  }

  private handleAllSearchRes(products): void {
    this.products = products;
    this.isSearchFailure = true;
  }

  private handleOfflineAndOnlineSuccessSearchRes(): void {
    if (!navigator.onLine) {
      this.getProducts();
    } else {
      this.loadingService.toggleLoading();
      this.editModal.toggleEditMode();
      this.getProductByActiveCategory();
    }
    this.isSearchFailure = true;
  }

  private handleFailureSearchRes(): void {
    this.products = [];
    this.isSearchFailure = false;
  }
}
