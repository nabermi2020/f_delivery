import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EditModalService } from 'src/app/shared/servives/edit-modal.service';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {
  @Output() onOrderConfirmed = new EventEmitter();
  isOrderConfirmed: boolean = false;

  constructor(private editModal: EditModalService) { }

  ngOnInit() {
    
  }

  confirmAnOrder() {
    this.editModal.toggleEditMode(); 
    this.isOrderConfirmed = true;
    this.onOrderConfirmed.emit(this.isOrderConfirmed);
  }

  closePopUp() {
    this.editModal.toggleEditMode();  
    this.isOrderConfirmed = false;
  }

}
