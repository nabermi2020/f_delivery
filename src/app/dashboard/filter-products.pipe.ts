import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(value: any, category?: any): any {
    let filteredProducts = [];
    if( value ) {
      value.forEach( (item) => {
        if ( item.productCategories.includes(category)) {
          filteredProducts.push(item);
        }
      });
    }
 
    console.log('YEP');
    return filteredProducts;
  }

}
