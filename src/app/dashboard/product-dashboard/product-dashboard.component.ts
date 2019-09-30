import { LoadingService } from './../../shared/servives/loading.service';
import { ProductCart } from './../../shared/servives/product-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../shared/servives/products.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { EditModalService } from 'src/app/shared/servives/edit-modal.service';
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

  constructor(private authService: AuthService,
              private productsService: ProductService,
              private route: ActivatedRoute,
              private editModal: EditModalService,
              private cartService: ProductCart,
              private changeDetector: ChangeDetectorRef,
              private loadingService: LoadingService) { }

  ngOnInit() {
    this.editMode = this.editModal.onEditChange.subscribe(
      (res: boolean) => {
        this.isModalEnabled = res;
        this.changeDetector.detectChanges();
      }
    
    )

    this.cartService.checkCartExistenseByUserId();
    this.cartService.getCartFromServer();
  }

  ngOnDestroy() {
    this.editMode.unsubscribe();
  }

}
