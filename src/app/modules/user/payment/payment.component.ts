import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import html2canvas from 'html2canvas'; 
import swal from 'sweetalert2';
import * as jspdf from 'jspdf';  
import * as $ from 'jquery';
import { toBase64String } from '@angular/compiler/src/output/source_map';



declare var require: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [DatePipe]
})
export class PaymentComponent implements OnInit {
  public menu: any;
  public menu_items: any;
  public menu_images = [];
  public monthly = 6;
  public pay_date

  constructor(
    private router: Router,
    private pipeDate: DatePipe
  ) { 
    this.retrieveItem();
  }

  ngOnInit() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
      e.preventDefault();
      $(this).siblings('a.active').removeClass("active");
      $(this).addClass("active");
      let index = $(this).index();
      $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
      $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });

    this.pay_date = new Date();
    this.pay_date.setDate(this.pay_date.getDate()+2);
  }

  retrieveItem() {
    if (sessionStorage.getItem("item") !== null) {
      let item = JSON.parse(sessionStorage.getItem("item"));
      console.log(item.user);
      if(item.user == null || item.user == undefined) {
        this.router.navigate(['/search']);
      }

      this.menu = item.menu;
      this.menu_items = item.menu_items
      let images = this.menu.images.split(',');
      let i, count = Number(images[1]);
      for(i = 0; i<count; i++) { 
        this.menu_images.push(require('../../../../../uploads/menus/' + images[0] + '/' + images[0] + i + '.jpg'))
      }

    } else {
      this.router.navigate(['/search']);
    }
  }

  initSlick() {
    if(!$('#menu-images').hasClass('slick-initialized')) {
      eval("$('#menu-images').slick({autoplay: true, autoplaySpeed: 2000, dots: true, arrows: false})");
    }
  }

  pay() {
    this.pay_date = new Date();
    this.pay_date.setDate(this.pay_date.getDate()+2);
    eval("$('#printSave').modal('show')");    
  }

  convertPdf() {  
    $('#content').removeClass('hide');
    swal({
      title: 'Processing!',
      text: 'Please wait a moment as we generate a copy of pdf for you.',
      showCancelButton: false,
      showConfirmButton: false
    });    

    let data = document.getElementById('content');  
    html2canvas(data).then(canvas => {  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'in', 'letter', true);
      let margins = { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5 }
      let imageWidth = 8.5 - margins.left - margins.right;    
      pdf.addImage(contentDataURL, 'PNG', margins.left, margins.top, imageWidth, 0, undefined, 'FAST');
      pdf.save('shoook.pdf');

      $('#content').addClass('hide');
      eval("$('#printSave').modal('hide')");    
      swal({
        title: 'Successful',
        text: "We have successfully created a pdf for you.",
        type: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
      })
    });  
  }  

  getPayments() {
    this.pay_date = new Date();
    let amount = Math.round(this.menu.priceFourMainCourse / this.monthly);
    let months = [], i=0;

    for(i = 1; i<=this.monthly; i++) {
      
      if(i == 1) {
        months.push({
          month: '1st Month',
          date: 'within 48hours',
          amount: amount
        });
      } else if (i == 2) {
        months.push({
          month: '2nd Month',
          date: this.pipeDate.transform(this.pay_date, 'dd-MMM-y'),
          amount: amount
        });
      } else if (i == 3) {
        months.push({
          month: '3rd Month',
          date: this.pipeDate.transform(this.pay_date, 'dd-MMM-y'),
          amount: amount
        });
      } else {
        months.push({
          month: i +'th Month',
          date: this.pipeDate.transform(this.pay_date, 'dd-MMM-y'),
          amount: amount
        });
      }

      this.pay_date.setMonth(this.pay_date.getMonth()+1);
    }

    return months;
  }

}