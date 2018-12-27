import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: '../html/menu.component.html',
  styleUrls: ['../scss/menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    eval("[].slice.call(document.querySelectorAll('.sttabs')).forEach(function(el) {new CBPFWTabs(el);});");
  }

  deleteMenu() {

  }

  cancelOrder() {
    
  }

  chooseYear(year: Event) {
    let element = $(event.target as Element);

    if(element.hasClass('active')) {
      element.removeClass('active');
    } else {
      element.addClass('active');
    }
  }

  chooseMonth(month) {
    let element = $(event.target as Element);

    if(element.hasClass('active')) {
      element.removeClass('active');
    } else {
      element.addClass('active');
    }
  }

}
