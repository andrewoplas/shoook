import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '@shared/models/Global';
import {Md5} from 'ts-md5/dist/md5';
import swal from 'sweetalert2';
import * as $ from 'jquery';
import { MenuService } from '@core/services/menu.service';
import { SwalService } from '@core/services/swal.service';

@Component({
  selector: 'app-menus-view',
  templateUrl: './menus-view.component.html',
  styleUrls: ['./menus-view.component.scss']
})
export class MenusViewComponent implements OnInit {
  public id;
  public vendor;
  public menu;
  public imagePath;
  @ViewChildren('menuImages') menus: QueryList<any>;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private swalService: SwalService,
    private global: Globals
  ) {
    this.imagePath = this.global.MENU_IMAGE_PATH;
   }

  ngOnInit() {
    this.route.params.subscribe(params => { this.id = params['id']; });
    this.vendor = null;
    this.menu = null;
    this.getMenu();
  }

  ngAfterViewInit() {
    this.menus.changes.subscribe(t => {
      this.initializeSlick();
    })
  }

  public initializeSlick() {   
      eval("$('#image').not('.slick-initialized').slick({arrows: false, autoplay: true, autoplaySpeed: 2000, dots: true})");  
      eval("initializeGallery()");  
  }

  public getMenu() {
    this.menuService.getMenuByIdAdmin(this.id).subscribe(
      data => {
        if(data.success) {
          this.menu = data.body;
          this.menu['menuImages'] = this.parseImages(this.menu.images);
          this.menu['menuDishes'] = this.menu.dishes.split(',');
          this.menu['menuDesserts'] = this.menu.desserts.split(',');
          this.menu['menuLocations'] = this.menu.locations.split(',');
          this.vendor = this.menu.vendorDTO;
        }
      }
    )
  }

  public hash(str) {
    const MD5 = new Md5();
    return MD5.appendStr(str.toString()).end();
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

  public approve() {
    this.swalService.swalLoading();

    this.menuService.approveMenu(this.menu.id).subscribe(
      data => {
        if(data.success) {
          this.menu.approved = 1;
          this.swalService.swalSuccess(
            "Menu Approved!",
            "Menu has been successfully approved."
          );
        }
      }
    );
  }

}
