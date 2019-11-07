import { ProductCart } from '../../shared/services/product-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/products.service';
import { Component, OnInit, ChangeDetectorRef, OnDestroy, HostListener } from '@angular/core';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit, OnDestroy {
  products: any[];
  isModalEnabled: boolean = false;
  editMode = new Subscription();

  constructor(private productsService: ProductService,
              private route: ActivatedRoute,
              private editModal: EditModalService,
              private cartService: ProductCart,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscribeToModalToggling();
    this.cartService.checkCartExistenseByUserId();
    this.cartService.getCartFromServer();
  }

  ngOnDestroy() {
    this.editMode.unsubscribe();
  }

  public subscribeToModalToggling(): void {
    this.editMode = this.editModal.onEditChange.subscribe(
      (isEditModalEnabled: boolean) => {
        this.isModalEnabled = isEditModalEnabled;
        this.changeDetector.detectChanges();
      }
    );
  }

  @HostListener('scroll', ['$event.target'])
  public onDashboardScroll(event): void {
    if (event.target.offsetHeight + event.target.scrollTop == event.target.scrollHeight) {
       this.route.children[0].children[0].params.subscribe(
         (category) => {
           if (category["cat"] == "pizza" ||
               category["cat"] == "drinks" ||
               category["cat"] == "salads") {
            this.productsService.newProducts.next(true);
           }
         }
       );
    }
 }
}

