import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

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
