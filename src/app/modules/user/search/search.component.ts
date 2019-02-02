import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { MenuService } from '@core/services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

declare var require: any

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private datePicker
  private prevDay
  private currentMenu = null;
  private menus = []
  private menu_images = []
  private changeMenu = []
  private addedMenu = []
  

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    let search = {
      occassion: this.route.snapshot.paramMap.get('occassion') != null ? this.route.snapshot.paramMap.get('occassion').trim() : '',
      date: this.route.snapshot.paramMap.get('date') != null ? this.route.snapshot.paramMap.get('date').trim() : '',
      time: this.route.snapshot.paramMap.get('time') != null ? this.route.snapshot.paramMap.get('time').trim() : '',
      location: this.route.snapshot.paramMap.get('location') != null ? this.route.snapshot.paramMap.get('location').trim() : '',
      guests: this.route.snapshot.paramMap.get('guests') != null ? this.route.snapshot.paramMap.get('guests').trim() : '',
    }

    this.menuService.search(search).subscribe(
      data => { 
        if(data.success && data.body.length > 0) {
          this.menus = data.body;

          for (let menu of this.menus) {
            let images = menu.images.split(',');
            let images_req = [], i, count = Number(images[1]);
            
            for(i = 0; i<count; i++) {
              images_req.push(require('../../../../../uploads/menus/' + images[0] + '/' + images[0] + i + '.jpg'))
             }
            
            this.menu_images.push({
              folder: images[0],
              images: images_req
            });
          }
        }  
      }
    );
  }

  ngOnInit() { }

  ngAfterContentInit() {
    this.initSlick();

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

  item_click(menu) {
    if (this.currentMenu != menu) {
      this.addedMenu = []
      this.changeMenu = menu.dishes.split(',');
      this.currentMenu = menu;
    }

    eval("$('#itemBook').modal('show')");
  }

  removeMenu(index) {
    this.addedMenu.push(this.changeMenu[index]);
    this.changeMenu.splice(index, 1);
  }

  addMenu(index) {
    this.changeMenu.push(this.addedMenu[index]);
    this.addedMenu.splice(index, 1);
  }

  initSlick() {
    for (let menu of this.menus) {
      let folder = menu.images.split(',')[0];
      if(!$('#' + folder).hasClass('slick-initialized')) {
        eval("$('#"+ folder +"').slick({autoplay: true, autoplaySpeed: 2000, dots: true, arrows: false})");
      }
    }
  }

  date_click() {
    this.datePicker.show();
  }

  book() {
    if(this.changeMenu.length > 0) {
      let item = {
        menu: this.currentMenu,
        menu_items: this.changeMenu
      }
      sessionStorage.setItem("item", JSON.stringify(item));
      eval("$('#itemBook').modal('hide')");
      this.router.navigate(['/checkout']);
    } else {
      swal({
        title: 'Ooops!',
        text: "Please have atleast 1 menu before booking.",
        type: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK',
      })
    }
  }
}
