import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  activeCategory: string = 'All';
  @Output() onActiveCategorySelected = new EventEmitter();
  activeFilter: [];
  filters =  {
    'pizza': ['All', 'Vegetarian', 'With Meat', 'With seafood', 'With Cheese'],
    'drinks': ['All', 'Alcoholic', 'Non alcoholic', 'Lemonades'],
    'salads': ['All', 'Vegetarian', 'Seafood', 'With Meat']
  }

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.children[0].params
      .subscribe(
        res => {
          
          this.activeCategory = res["cat"];
          this.activeFilter = this.filters[this.activeCategory];
          this.activeCategory = 'All';

          // console.log(this.activeCategory);   
          // console.log(this.activeFilter);
        }
      )
      
       
  }

  filterProductsByCategory(filter) {
    this.activeCategory = filter;
    this.onActiveCategorySelected.emit(filter);
  }

}
