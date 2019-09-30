import { LoadingService } from './../servives/loading.service';
import { EditModalService } from 'src/app/shared/servives/edit-modal.service';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  showLoading: boolean = true;

  constructor(private editProfile: EditModalService, 
              private loadingService: LoadingService ) {
                 
  }
  

  ngOnInit() {
  
  this.editProfile.toggleEditMode();
 
   this.loadingService.onLoadingChange
   .subscribe(
     (res: boolean) => {
     
        this.showLoading = res;
        console.log(res);
      
    
     }
   )
 
  }

  ngOnDestroy() {
    this.showLoading = true;
  }

}
