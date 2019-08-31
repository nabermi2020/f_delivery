import { Component, OnInit } from '@angular/core';
import { EditModalService } from 'src/app/shared/servives/edit-modal.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(private editProfile: EditModalService) { }

  ngOnInit() {
  }

  closeModal() {
    this.editProfile.toggleEditMode();
  }

}
