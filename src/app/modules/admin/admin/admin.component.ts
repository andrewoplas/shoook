import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
  public admin;

  constructor(private auth: AuthService) { 
    this.admin = this.auth.getUser();
  }

  ngOnInit() {
    $('.preloader').fadeOut();
  }

}
