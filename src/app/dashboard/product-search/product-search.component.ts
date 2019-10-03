import { ProductService } from 'src/app/shared/services/products.service';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  @Output() onSearchDone = new EventEmitter();
  constructor(private productService: ProductService) { }
  results = [];

  ngOnInit() {
    
  }

  searchProducts(requestedQuery) {
    const query = (requestedQuery.value).trim().replace(/(\s\s\s*)/g, ' ');
    this.results = [];
    if (query.length >= 3) {
      console.log(query);
      
      this.productService.searchProducts(query)
        .subscribe( 
         
          res => {
             
                    if (res[0]) {
                        
                        this.results.push(res[0]);
                        console.log(this.results);
                        
                    } else {
                       
                       
                       this.results = [];
                    }  
                    //this.onSearchDone.emit(this.results);
          }
         
        )
    } else if (query.length == 0) {
     
      this.onSearchDone.emit('All');
    }
    //console.log(this.results);
     //console.log(this.productService.results);
    
  }

}
