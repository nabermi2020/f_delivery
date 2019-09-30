import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { User } from './../../auth/user.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private editModal: EditModalService) { }

  ngOnInit() {

  }

  // It's not used
  navigateToOrderHistory() {
    this.router.navigate(['dashboard/profile/order-history']);
    console.log('here');
  }

  // It's not used
  navigateToProfile() {
    this.router.navigate([`dashboard/profile/`]);
    console.log('here2');
    console.log(this.id);
  }
}
