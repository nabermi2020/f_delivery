import { LoadingService } from '../services/loading.service';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  showLoading: boolean = false;

  constructor(private editProfile: EditModalService, 
              private loadingService: LoadingService,
              private changeDetector: ChangeDetectorRef ) {
                 
  }
  

  ngOnInit() {
  
  //this.editProfile.toggleEditMode();
 
   this.loadingService.onLoadingChange
   .subscribe(
     (res: boolean) => {
        this.changeDetector.detectChanges();
        this.showLoading = res;
        console.log(res);
      
    
     }
   )
 
  }

  ngOnDestroy() {
    this.showLoading = true;
  }

}
