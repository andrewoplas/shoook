import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-landing',
  templateUrl: '../html/landing.component.html',
  styleUrls: ['../scss/landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() { 
    eval("$('#testimonial').slick({slidesToShow: 3,slidesToScroll: 1,autoplay: true,autoplaySpeed: 2000,dots: true})");
    eval("$('#txtTime').timepicki();");
    eval("$('#txtDate').datepicker({minDate: new Date(),language: 'en',dateFormat: 'mm/dd/yyyy'});");
  }
  
}
