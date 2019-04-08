import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
  @Input() firstName;
  @Input() lastName;

  constructor(private auth: AuthService) { 
  }

  ngOnInit() {
  }

  public logout() {
    this.auth.logout();
  }
}
