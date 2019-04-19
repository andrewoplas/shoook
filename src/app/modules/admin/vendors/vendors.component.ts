import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { VendorService } from '@core/services/vendor.service';
import swal from 'sweetalert2';
import 'datatables.net';
import * as $ from 'jquery';
import { HttpResponse } from '@angular/common/http';
import { SwalService } from '@core/services/swal.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  @ViewChildren('vendors') vendors: QueryList<any>;
  public vendorsList = new Array();
  public _vendorsList = new Array();
  public All = 0;
  public Approved = 1;
  public NeedApproval = 2;
  public currentFilter = 0;

  constructor(
    private vendorService: VendorService,
    private swalService: SwalService
  ) { }

  ngOnInit() {
    this.getVendors();
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

  public getVendors() {
    this.vendorService.getVendors().subscribe(
      data => {
        if(data.success && data.body.length > 0) {
          this._vendorsList = data.body;
          this.filter(0);
        }
      }
    )
  }

  public filter(type) {
    this.vendorsList = [];
    this.currentFilter = type;
    
    if(type == this.All) {
      this.vendorsList = this._vendorsList;
      return;
    }

    for(let i=0; i<this._vendorsList.length; i++) {
      if (type == this.Approved && this._vendorsList[i].approved == 1) {
        this.vendorsList.push(this._vendorsList[i]);
      } else if (type == this.NeedApproval && this._vendorsList[i].approved == 0) {
        this.vendorsList.push(this._vendorsList[i]);
      }
    }
  }

  public refresh() {
    this.getVendors();
  }

  public remove(id) {
    this.vendorService.deleteVendor(id).subscribe(
      data => {
        if(data.success) {
          let bankIds = data.body;
          console.log(bankIds);

          // Remove files related to the vendor
          const formdata: FormData = new FormData(); 
          formdata.append('type', 'documents');
          formdata.append('vendorID', 'documents');
          for(let id of bankIds) {
            formdata.append('vendorBankID[]', id);
          }    

          this.vendorService.removeFileToStorage(formdata).subscribe(event => {
            if (event instanceof HttpResponse) {
              let result = JSON.parse(event.body.toString());
              console.log(result);
              if(result.success) {
                this.swalService.swalSuccess(
                  "Success!",
                  "Vendor has been successfully deleted."
                );
              } else {
                this.swalService.swalError();
              }
            }
          })

        }
      }
    )
  }

}