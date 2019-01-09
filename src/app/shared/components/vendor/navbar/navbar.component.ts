import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'vendor-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class VendorNavbarComponent implements OnInit {
  @Input() activeLink;
  @Input() potentialEarning;

  loggedIn: boolean

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() { 
    this.loggedIn = this.auth.isloggedIn() && this.auth.isVendor();
  }

  logout() {
    this.auth.logout();
  }
}
