import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MenuService } from '@core/services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import * as $ from 'jquery';
import { Globals } from '@shared/models/Global';
import { SwalService } from '@core/services/swal.service';

declare var require: any

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public datePicker
  public prevDay
  public currentMenu = null;
  public menuList = []
  public changeMenu = []
  public addedMenu = []
  public imagePath;
  
  @ViewChildren('menus') menus: QueryList<any>;

  constructor(
    private menuService: MenuService,
    private swalService: SwalService,
    private route: ActivatedRoute,
    private router: Router,
    private global: Globals
  ) { 
    this.imagePath = this.global.MENU_IMAGE_PATH;
  }

  ngOnInit() { 
    this.getMenuList();
  }

  ngAfterContentInit() {
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

  ngAfterViewInit() {
    this.menus.changes.subscribe(t => {
      this.initializeSlick();
    })
  }
  
  public getMenuList() {
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
          this.menuList = data.body;
          
          for(let i=0; i<this.menuList.length; i++) {
            this.menuList[i]['menuImages'] = this.parseImages(this.menuList[i].images);
          }
        }       
      }
    );
  }

  public parseImages(images) {
    let arr = images.split(",");
    let hash = arr[0];
    let num = +arr[1];

    let imageArr = new Array();
    for(let i=0; i<num; i++) {
      imageArr.push(hash + "/" + hash + i + ".jpg");
    }

    return imageArr;
  }

  public initializeSlick() {
    let count = this.menus.length;
    for(let i=0; i<count; i++) {
      eval("$('#image" + i + "').not('.slick-initialized').slick({arrows: false, autoplay: true, autoplaySpeed: 2000, dots: true})");  
    }
  }

  public item_click(menu) {
    if (this.currentMenu != menu) {
      this.addedMenu = []
      this.changeMenu = menu.dishes.split(',');
      this.currentMenu = menu;
    }

    eval("$('#itemBook').modal('show')");
  }

  public removeMenu(index) {
    this.addedMenu.push(this.changeMenu[index]);
    this.changeMenu.splice(index, 1);
  }

  public addMenu(index) {
    this.changeMenu.push(this.addedMenu[index]);
    this.addedMenu.splice(index, 1);
  }

  public date_click() {
    this.datePicker.show();
  }

  public book() {
    if(this.changeMenu.length > 0) {
      let item = {
        menu: this.currentMenu,
        menu_items: this.changeMenu
      }
      sessionStorage.setItem("item", JSON.stringify(item));
      eval("$('#itemBook').modal('hide')");
      this.router.navigate(['/checkout']);
      
    } else {
      this.swalService.swalError(
        "Ooops!",
        "Please have atleast 1 menu before booking."
      );
    }
  }
}
