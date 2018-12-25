import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-payment',
  templateUrl: '../html/payment.component.html',
  styleUrls: ['../scss/payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
      e.preventDefault();
      $(this).siblings('a.active').removeClass("active");
      $(this).addClass("active");
      var index = $(this).index();
      $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
      $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
  }

  pay() {
    $('#printSave').modal('show');
  }

}
