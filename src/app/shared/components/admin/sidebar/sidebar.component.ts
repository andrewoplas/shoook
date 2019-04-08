import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() firstName;
  @Input() lastName;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  public logout() {
    this.auth.logout();
  }

}
