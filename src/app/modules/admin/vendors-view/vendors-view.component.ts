import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from '@core/services/vendor.service';
import { Globals } from '@shared/models/Global';
import {Md5} from 'ts-md5/dist/md5';
import swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-vendors-view',
  templateUrl: './vendors-view.component.html',
  styleUrls: ['./vendors-view.component.scss']
})
export class VendorsViewComponent implements OnInit {
  public id;
  public vendor;
  public idPath;
  public documentPath;

  constructor(
    private route: ActivatedRoute,
    private vendorService: VendorService,
    private global: Globals
  ) {
    this.idPath = this.global.ID_IMAGE_PATH;
    this.documentPath = this.global.DOCUMENT_FILE_PATH;
   }

  ngOnInit() {
    this.route.params.subscribe(params => { this.id = params['id']; });
    this.vendor = null;
    this.getVendor();
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

          console.log(this.vendor);
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

  public approve() {
    alert('approved!');
  }

}
