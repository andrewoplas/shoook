import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: '../html/landing.component.html',
  styleUrls: ['../scss/landing.component.scss']
})
export class LandingComponent implements OnInit {
  link = "overview";

  constructor() { }

  ngOnInit() {
  }

}
