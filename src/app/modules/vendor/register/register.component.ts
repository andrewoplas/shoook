import { DropzoneConfigInterface, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { VendorService } from '@core/services/vendor.service';
import { isNull } from 'util';

import * as $ from 'jquery';
import swal from 'sweetalert2';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public pass: string;
  public confirmPass: string;
  public idFrontError: boolean;
  public idBackError: boolean;
  public documentsError: boolean;
  public alphanumeric = {'0': { pattern: new RegExp('\[A-Za-zÑñ\.\,0-9 \]')}};
  public forms = this.formBuilder.group({
    first: this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      emailAddress: ["", [Validators.email, Validators.required]],
      phoneNumber: ["", [Validators.required, Validators.minLength(10)]],

      barangay: ["", Validators.required],
      city: ["", Validators.required],
      region: ["", Validators.required],

      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
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
      bankCode: ["", Validators.required],
      swift: ["", Validators.required],
    }),
  });


  get first() { return this.forms.get("first"); }
  get second() { return this.forms.get("second"); }
  get third() { return this.forms.get("third"); }
  get fourth() { return this.forms.get("fourth"); }
  get formValues() {
    let first = this.first
    let second = this.second
    let third = this.third
    let fourth = this.fourth
    
    let vendor = {
      firstName: first.value.firstName.trim(),
      lastName: first.value.lastName.trim(),
      approved: 0,
      emailAddress: first.value.emailAddress.trim(),
      phoneNumber: first.value.phoneNumber.trim(),
      barangay: first.value.barangay.trim(),
      city: first.value.city.trim(),
      region: first.value.region.trim(),
      username: first.value.username.trim(),
      password: first.value.password,
      dateCreated: Date.now(),
      dateUpdated: Date.now()
    }

    let company = {      
      accountType: third.value.accountType.trim(),
      address: third.value.address.trim(),
      businessNo: third.value.businessRegistration.trim(),
      country: third.value.country.trim(),
      name: third.value.legalCompanyName.trim(),
      personInCharge: third.value.personInCharge.trim(),
      postalCode: third.value.postalCode.trim(),
      sellerVat: third.value.sellerVat.trim(),
      vatRegistered: third.value.vatRegistered.trim()
    }

    let bank = {
	    accountName: fourth.value.accountName.trim(),
	    accountNumber: fourth.value.accountNumber.trim(),
	    bankCode: fourth.value.bankCode.trim(),
	    bankName: fourth.value.bankName.trim(),
	    branchName: fourth.value.branchName.trim(),
      swift: fourth.value.swift.trim(),
    }  

    let v = {
      vendor: vendor,
      company: company,
      bank: bank
    }

    return v;
  }

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private vendorService: VendorService,
    private loadingBar: LoadingBarService
  ) {
    this.idFrontError = false;
    this.idBackError = false;
    this.documentsError = false;
   }

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
    let element = (event.target as Element);
    Object.keys((<FormGroup>(this.forms.get('fourth'))).controls).forEach(field => {
      const control = this.forms.get('fourth').get(field);
      control.markAsTouched({ onlySelf: true });
    });

    let dropzones = this.directiveRef.toArray();

    if (dropzones[2].dropzone().files.length <= 0) {
        this.documentsError = true; 
        return;
    } else if (!this.forms.valid) {
        return;
    }

    let vendor = this.formValues

    swal({
      title: 'Processing!',
      text: 'Please wait a moment as we try to register you.',
      showCancelButton: false,
      showConfirmButton: false
    });
    
    this.vendorService.createVendor(vendor).subscribe(
      data => {
        if(!isNull(data) && data.success) {
          let formdata = this.upload(data.body);
          this.loadingBar.start();

          this.vendorService.pushFileToStorage(formdata).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.loadingBar.set(Math.round(100 * event.loaded / event.total));
            } else if (event instanceof HttpResponse) {
              this.loadingBar.stop();
              console.log(event);

              swal({
                title: 'Thank you for signing up!',
                text: "Would you like to upload your first menu?",
                type: 'success',
                showCancelButton: true,
                cancelButtonText: 'LATER',
                cancelButtonClass: 'cancel-swal',
                confirmButtonText: 'YES',
                confirmButtonClass: 'confirm-swal'
              }).then((result) => {
                if (result.value) {
                  this.router.navigate(['/vendor/menu']);
                } else {
                  swal({
                    title: 'Redirecting',
                    text: 'You will be redirected to the vendor page',
                    showConfirmButton: false,
                    timer: 2800
                  })
          
                  setTimeout(()=>{
                    $('html, body').animate({scrollTop: 0}, 1);
                    this.router.navigate(['/vendor']);  
                  },3000)
                }
              })
            }
          });
        }
      }
    )
  }

  hasError(field: string) {
    return this.forms.get(field).invalid && (this.forms.get(field).dirty || this.forms.get(field).touched);
  }

  hasSuccess(field: string) {
    return this.forms.get(field).valid && (this.forms.get(field).dirty || this.forms.get(field).touched);
  }
  
  displayFieldCss(field: string) {
    return {
      'has-error': this.hasError(field),
      'has-success': this.hasSuccess(field)
    };
  }

  samePassword() {
    let same = this.first.value.password == this.first.value.confirmPassword;
    let result = {
      'has-error': this.hasError('first.confirmPassword') || !same,
      'has-success': this.hasSuccess('first.confirmPassword') && same
    }

    return result;
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
    let error = false;

    if(fieldset == 'first' && this.first.value.password != this.first.value.confirmPassword) {
      error = true;
    } else if (fieldset == 'second') {
      let dropzones = this.directiveRef.toArray();
      if (dropzones[0].dropzone().files.length <= 0) { this.idFrontError = true; }
      if (dropzones[1].dropzone().files.length <= 0) { this.idBackError = true; }
      error = this.idFrontError || this.idBackError;
    }

    if(!animating && !this.forms.get(fieldset).invalid && !error) {
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
  
  public upload(id) {
    let dropzones = this.directiveRef.toArray();
    let idFront = dropzones[0].dropzone().files[0];
    let idBack = dropzones[1].dropzone().files[0];
    let documents = dropzones[2].dropzone().files;
    
    const formdata: FormData = new FormData(); 
    formdata.append('location', id);
    formdata.append('idFront', idFront);
    formdata.append('idBack', idBack);
    for(let document of documents) {
      formdata.append('documents', document);
    }    

    return formdata;
  }
  
  public toggleAutoReset(): void {
    this.config.autoReset = this.config.autoReset ? null : 5000;
    this.config.errorReset = this.config.errorReset ? null : 5000;
    this.config.cancelReset = this.config.cancelReset ? null : 5000;
  }

  public resetDocumentsDropzone(): void {
    let dropzones = this.directiveRef.toArray();
    dropzones[2].reset();
  }

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

    if (type == 0) {
      this.idFrontError = false;
    } else if (type == 1) {
      this.idBackError = false;
    }
  }

  public addedFileDocuments(args: any):void {
    let dropzones = this.directiveRef.toArray();
    let dz = dropzones[2].dropzone();
    
    if(dz.files.length > 10) {
      dz.removeFile(dz.files[10]);

      swal({
        title: "Ooops!",
        text: "Maximum of 10 files are allowed to be uploaded. You may reset your files.",
        type: 'warning'
      })
    }

    this.documentsError = false;
  }
  
}
