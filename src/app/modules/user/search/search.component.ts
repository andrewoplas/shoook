import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  datePicker
  prevDay

  constructor() { }

  ngOnInit() {
    this.datePicker = eval(
      "$('.txtDate').datepicker({" +
      "  minDate: new Date()," +
      "  language: 'en'," +
      "  dateFormat: 'M d'," +
      "onSelect: function (fd, d, picker) {" +
      "  if (!d) return;" +
      "  var day = d.getDay();" +
      "  if (this.prevDay != undefined && this.prevDay == day) return;" +
      "  this.prevDay = day;" +
      "  $('.date span').html(fd);" +
      "}" +
      "}).data('datepicker');"
    );    
  }

  item_click() {
    eval("$('#itemBook').modal('show')");
  }

  date_click() {
    this.datePicker.show();
  }

}
