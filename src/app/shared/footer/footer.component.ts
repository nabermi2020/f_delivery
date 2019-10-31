import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  author: string = 'M.Naberezhnyi';

  constructor(private router: Router) {}

  ngOnInit() {}

  public getCurrentYear(): number {
    return new Date().getFullYear();
  }

  public navigateToDashboard(): void {
    this.router.navigate(['dashboard/products/pizza']);
  }
}
