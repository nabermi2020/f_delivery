import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() productData: Product;
  constructor() { }

  ngOnInit() {
    
  }

}
