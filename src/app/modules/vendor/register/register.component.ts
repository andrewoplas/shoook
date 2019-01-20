import { DropzoneConfigInterface, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { VendorService } from '@core/services/vendor.service';
import { isNull } from 'util';

import { Md5 } from 'ts-md5/dist/md5';
import * as $ from 'jquery';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  forms = this.formBuilder.group({
    first: this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      emailAddress: ["", Validators.required],
      phoneNumber: ["", Validators.required],

      barangay: ["", Validators.required],
      city: ["", Validators.required],
      region: ["", Validators.required],

      username: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    }),
    second: this.formBuilder.group({
      idNumber: ["", Validators.required],
      idName: ["", Validators.required],
      idType: ["", Validators.required],
    }),
    third: this.formBuilder.group({
      accountType: ["", Validators.required],
      legalCompanyName: [""],
      address: ["", Validators.required],
      country: ["", Validators.required],
      postalCode: ["", Validators.required],
      personInCharge: [""],
      businessRegistration: [""],
      sellerVat: [""],
      vatRegistered: [""],
    }),
    fourth: this.formBuilder.group({
      accountName: ["", Validators.required],
      accountNumber: ["", Validators.required],
      bankName: ["", Validators.required],
      branchName: [""],
      bankCode: [""],
      swift: [""],
    }),
  });

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private vendorService: VendorService
  ) { }

  get first() { return this.forms.get("first"); }
  get second() { return this.forms.get("second"); }
  get third() { return this.forms.get("third"); }
  get fourth() { return this.forms.get("fourth"); }

  ngOnInit() {
    this.initializeRegisterSteps();

    eval("$('.captcha').slideToCAPTCHA();");
  }

  initializeRegisterSteps() {    
    $(function() {

      //jQuery time
      var current_fs, next_fs, previous_fs; //fieldsets
      var left, opacity, scale; //fieldset properties which we will animate
      var animating; //flag to prevent quick multi-click glitches

      $(".previous").click(function(){
        if(animating) return false;
        animating = true;
        $('html, body').animate({scrollTop: $('#eliteregister').offset().top - 10}, 750);
        
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();
        $("#eliteregister li").eq($("fieldset").index(current_fs)).removeClass("active");
        previous_fs.show(); 
        previous_fs.addClass('active');
        current_fs.removeClass('active');
        current_fs.animate({opacity: 0}, {
          step: function(now, mx) {
            scale = 0.8 + (1 - now) * 0.2;
            left = ((1-now) * 50)+"%";
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
          }, 
          duration: 600, 
          complete: function(){
            current_fs.hide();
            animating = false;
          }, 
        });
      });
    });
  }

  registerVendor() {
    let first = this.first
    let second = this.second
    let third = this.third
    let fourth = this.fourth
    
    let vendor = {
      firstName: first.value.firstName,
      lastName: first.value.lastName,
      approved: first.value.approved,
      emailAddress: first.value.emailAddress,
      phoneNumber: first.value.phoneNumber,
      barangay: first.value.barangay,
      city: first.value.city,
      region: first.value.region,
      username: first.value.username,
      password: first.value.password,
      dateCreated: Date.now(),
      dateUpdated: Date.now()
    }

    let company = {      
      accountType: third.value.accountType,
      address: third.value.address,
      businessNo: third.value.businessRegistration,
      country: third.value.country,
      name: third.value.legalCompanyName,
      personInCharge: third.value.personInCharge,
      postalCode: third.value.postalCode,
      sellerVat: third.value.sellerVat,
      vatRegistered: third.value.vatRegistered
    }

    let bank = {
	    accountName: fourth.value.accountName,
	    accountNumber: fourth.value.accountNumber,
	    bankCode: fourth.value.bankCode,
	    bankName: fourth.value.bankName,
	    branchName: fourth.value.branchName,
      swift: fourth.value.swift,
    }  

    let v = {
      vendor: vendor,
      company: company,
      bank: bank
    }
    
    this.vendorService.createVendor(v).subscribe(
      data => {
        if(!isNull(data) && data.success) {
          this.upload()
        }
      }
    )

    // swal({
    //   title: 'Thank you for signing up!',
    //   text: "Would you like to upload your first menu?",
    //   type: 'success',
    //   showCancelButton: true,
    //   cancelButtonText: 'LATER',
    //   cancelButtonClass: 'cancel-swal',
    //   confirmButtonText: 'YES',
    //   confirmButtonClass: 'confirm-swal'
    // }).then((result) => {
    //   if (result.value) {
    //     this.router.navigate(['/vendor/menu']);
    //   } else {
    //     swal({
    //       title: 'Redirecting',
    //       text: 'You will be redirected to the vendor page',
    //       showConfirmButton: false,
    //       timer: 2800
    //     })

    //     setTimeout(()=>{
    //       $('html, body').animate({scrollTop: 0}, 1);
    //       this.router.navigate(['/vendor']);  
    //     },3000)
    //   }
    // })
  }

  hasError(field: string) {
    return this.forms.get(field).invalid && (this.forms.get(field).dirty || this.forms.get(field).touched);
  }

  hasSuccess(field: string) {
    return this.forms.get(field).valid && (this.forms.get(field).dirty || this.forms.get(field).touched);
  }
  
  displayFieldCss(field: string) {
    let test = !this.forms.get(field).valid && this.forms.get(field).touched;
    return {
      'has-error': this.hasError(field),
      'has-success': this.hasSuccess(field)
    };
  }

  next(event: Event, fieldset: string) {   
    let element = (event.target as Element);
    Object.keys((<FormGroup>(this.forms.get(fieldset))).controls).forEach(field => {
      const control = this.forms.get(fieldset).get(field);
      control.markAsTouched({ onlySelf: true });
    });

    let current_fs, next_fs, previous_fs;
    let left, opacity, scale;
    let animating;

    if(!animating && !this.forms.get(fieldset).invalid) {
      animating = true;

      $('html, body').animate({scrollTop: $('#eliteregister').offset().top - 10}, 750);
      current_fs = $(element).parent();
      next_fs = $(element).parent().next();
      $("#eliteregister li").eq($("fieldset").index(next_fs)).addClass("active");
      
      next_fs.show(); 
      next_fs.addClass('active');
      current_fs.removeClass('active');
      current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
          scale = 1 - (1 - now) * 0.2;
          left = (now * 50)+"%";
          opacity = 1 - now;
          current_fs.css({'transform': 'scale('+scale+')'});
          next_fs.css({'left': left, 'opacity': opacity});
        }, 
        duration: 300, 
        complete: function(){
          current_fs.hide();
          animating = false;
        }, 
      });
    } else {
      $('html, body').animate({scrollTop: $('.has-error').first().offset().top - 50}, 750);
    }
  }

  /* Dropzone Directive  */
  public type: string = 'component';
  public config: DropzoneConfigInterface = {
    clickable: true, url: '/', acceptedFiles: 'image/*, application/pdf, .doc, .docx', maxFiles: 10, autoProcessQueue: false,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    dictDefaultMessage: 'Drop files here'
  };

  public configBack: DropzoneConfigInterface = {
    clickable: true, url: '/', acceptedFiles: 'image/*', maxFiles: 1, autoProcessQueue: false,
    uploadMultiple: false,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    dictDefaultMessage: 'Drop file of the back side of your ID'
  };

  public configFront: DropzoneConfigInterface = {
    clickable: true, url: '/', acceptedFiles: 'image/*', maxFiles: 1, autoProcessQueue: false,
    uploadMultiple: false,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    dictDefaultMessage: 'Drop file of the front side of your ID'
  };

  @ViewChildren(DropzoneDirective) directiveRef?: QueryList<DropzoneDirective>;
  
  public upload() {
    let dropzones = this.directiveRef.toArray();
    let dropzoneFront = dropzones[0].dropzone();
    let dropzoneBack = dropzones[1].dropzone();
    let dropzoneBank = dropzones[2].dropzone();

    const formdata: FormData = new FormData(); 
    formdata.append('idFront', dropzoneFront.files[0]);
    formdata.append('idBack', dropzoneBack.files[0]);
    formdata.append('documents', dropzoneBank.files);

    this.vendorService.pushFileToStorage(formdata).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log('Percentage: ' + Math.round(100 * event.loaded / event.total));
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
  }
  
  public toggleAutoReset(): void {
    this.config.autoReset = this.config.autoReset ? null : 5000;
    this.config.errorReset = this.config.errorReset ? null : 5000;
    this.config.cancelReset = this.config.cancelReset ? null : 5000;
  }

  // public resetDropzoneUploads(): void {
  //   if (this.directiveRef && this.directiveRef) {
  //     this.directiveRef.reset();
  //   }
  // }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }

  public addedFile(args: any, type: number):void {
    let dropzones = this.directiveRef.toArray();
    let dz = dropzones[type].dropzone();
    
    if(dz.files[1] != null) {
      dz.removeFile(dz.files[0]);
    }
  }

}
