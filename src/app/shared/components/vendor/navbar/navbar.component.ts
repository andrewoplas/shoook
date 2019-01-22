import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import * as $ from 'jquery';

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

  scroll(tab) {
    $('html, body').animate({scrollTop: $(tab).offset().top - 100}, 750);
  }

  logout() {
    this.auth.logout();
  }
}
