import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() landing

  constructor() { }

  ngOnInit() {
  }

}
