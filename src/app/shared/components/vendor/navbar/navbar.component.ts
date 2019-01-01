import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vendor-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class VendorNavbarComponent implements OnInit {
  @Input() activeLink;

  constructor() { }

  ngOnInit() { 
    
  }
}
