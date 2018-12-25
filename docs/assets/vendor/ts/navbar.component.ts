import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vendor-navbar',
  templateUrl: '../html/navbar.component.html',
  styleUrls: ['../scss/navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() activeLink;

  constructor() { }

  ngOnInit() { 
    
  }
}
