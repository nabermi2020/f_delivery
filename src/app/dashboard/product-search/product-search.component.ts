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
  results: Array<any>;

  ngOnInit() {
    
  }

  searchProducts(requestedQuery) {
    const query = (requestedQuery.value).trim().replace(/(\s\s\s*)/g, ' ');
    this.results = [];
    if (query.length >= 3) {
      console.log(query);
      
      this.productService.searchProducts(query)
        .subscribe( 
          (searchResults: Array<any>) => {
          if (searchResults) {
              this.results = this.getformattedResults(searchResults);
          } else {             
              this.results = [];
          }  
            
          this.onSearchDone.emit(this.results);
          }
        );
     } else if (query.length == 0) {     
       this.onSearchDone.emit('All');
     }
  }

  getformattedResults(searchResults) {
    const results = [];
    searchResults.forEach(searchResByProdCategory => {
      searchResByProdCategory.forEach(item => {
        results.push(item);
      });
    });

    return results;
  }
}


