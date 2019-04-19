import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from '@core/services/vendor.service';
import { Globals } from '@shared/models/Global';
import {Md5} from 'ts-md5/dist/md5';
import swal from 'sweetalert2';
import * as $ from 'jquery';
import { SwalService } from '@core/services/swal.service';

@Component({
  selector: 'app-vendors-view',
  templateUrl: './vendors-view.component.html',
  styleUrls: ['./vendors-view.component.scss']
})
export class VendorsViewComponent implements OnInit {
  public id;
  public vendor;
  public idPath;
  public imagePath;
  public documentPath;
  
  @ViewChildren('menus') menus: QueryList<any>;

  constructor(
    private route: ActivatedRoute,
    private vendorService: VendorService,
    private swalService: SwalService,
    private global: Globals
  ) {
    this.idPath = this.global.ID_IMAGE_PATH;
    this.documentPath = this.global.DOCUMENT_FILE_PATH;
    this.imagePath = this.global.MENU_IMAGE_PATH;
   }

  ngOnInit() {
    this.route.params.subscribe(params => { this.id = params['id']; });
    this.vendor = null;
    this.getVendor();
  }

  ngAfterViewInit() {
    this.menus.changes.subscribe(t => {
      this.initializeSlick();
    })
  }

  public initializeSlick() {
    let count = this.vendor.menus.length;
    for(let i=0; i<count; i++) {
      eval("$('#image" + i + "').not('.slick-initialized').slick({arrows: false, autoplay: true, autoplaySpeed: 2000, dots: true})");  
    }
  }

  public getVendor() {
    this.vendorService.getVendorById(this.id).subscribe(
      data => {
        if(data.success) {
          this.vendor = data.body;
          
          for(let i=0; i<this.vendor.vendorBanks.length; i++) {
            this.vendor.vendorBanks[i]['documents'] = this.parseBankDocuments(
              this.vendor.vendorBanks[i].bankInformationDocuments, this.vendor.vendorBanks[i].id);
          }
          
          for(let i=0; i<this.vendor.menus.length; i++) {
            this.vendor.menus[i]['menuImages'] = this.parseImages(this.vendor.menus[i].images);
          }
        }
      }
    )
  }

  public hash(str) {
    const MD5 = new Md5();
    return MD5.appendStr(str.toString()).end();
  }

  public parseBankDocuments(documents, bankId) {
    let documentPaths = new Array();
    let documentsArr = documents.split(",");
    let hash = this.hash(bankId);

    for(let i=0; i<documentsArr.length; i++) {
      documentPaths.push([hash + "/" + documentsArr[i], documentsArr[i]]);
    }

    return documentPaths;
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

    this.vendorService.approveVendor(this.vendor.id).subscribe(
      data => {
        if(data.success) {
          this.vendor.approved = 1;
          this.swalService.swalSuccess(
            "Vendor Approved!",
            "Vendor has been successfully approved."
          );
        }
      }
    );
  }

}
