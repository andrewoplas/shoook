import { Component, OnInit } from '@angular/core';

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

}
