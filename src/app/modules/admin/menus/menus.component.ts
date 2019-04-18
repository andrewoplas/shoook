import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MenuService } from '@core/services/menu.service';
import swal from 'sweetalert2';
import 'datatables.net';
import * as $ from 'jquery';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  @ViewChildren('menus') vendors: QueryList<any>;
  public menusList = new Array();
  public _menusList = new Array();
  public All = 0;
  public Approved = 1;
  public NeedApproval = 2;
  public currentFilter = 0;


  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.getMenus();
  }

  ngAfterViewInit() {
    this.vendors.changes.subscribe(t => {
      this.initializeDatatable();
    })
  }

  public initializeDatatable() {
    if (!$.fn.DataTable.isDataTable('#table')) {
      setTimeout(function(){
        $('#table').dataTable();
      }, 500);

      eval("$('[data-toggle=tooltip]').tooltip();");
    }
  }

  public getMenus() {
    this.menuService.getMenusAdmin().subscribe(
      data => {
        if(data.success && data.body.length > 0) {
          console.log(data.body);
          this._menusList = data.body;
          this.filter(0);
        }
      }
    )
  }

  public filter(type) {
    this.menusList = [];
    this.currentFilter = type;
    
    if(type == this.All) {
      this.menusList = this._menusList;
      return;
    }

    for(let i=0; i<this._menusList.length; i++) {
      if (type == this.Approved && this._menusList[i].approved == 1) {
        this.menusList.push(this._menusList[i]);
      } else if (type == this.NeedApproval && this._menusList[i].approved == 0) {
        this.menusList.push(this._menusList[i]);
      }
    }
  }

  public removeVendor(id) {
    console.log(id);
  }

}
