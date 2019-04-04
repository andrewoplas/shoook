import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneConfigInterface, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '@core/services/menu.service';
import { AuthService } from '@core/services/auth.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { LoadingBarService } from '@ngx-loading-bar/core';
import * as $ from 'jquery';
import swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuImagesError;
  dishes = [];
  desserts = [];
  locations = [];
  submitted = false;
  menuList = Array<any>();
  vendorID;

  forms = this.fb.group({
    customers: ["", Validators.required],
    mainCourse: ["", Validators.required],
    additionalMenu: ["", Validators.required],
    additionalDessert: ["", Validators.required],
    additionalLechon: ["", Validators.required],
    styleOfCooking: ["", Validators.required],
    specialty: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private menuService: MenuService,
    private loadingBar: LoadingBarService
  ) {
    this.menuImagesError = false;
   }

  ngOnInit() {
    eval("[].slice.call(document.querySelectorAll('.sttabs')).forEach(function(el) {new CBPFWTabs(el);});");
    this.vendorID = this.auth.getUser().id;
    this.menuService.getMenusByVendor(this.vendorID).subscribe(
      data => { 
        if(data.success && data.body.length > 0) {
          this.menuList = data.body;
        }        
      }
    );
  }

  public addMenuClick() {
    $('.add-menu-tab').parent().trigger('click');
  }

  public deleteMenu(id) {
    this.menuService.deleteMenu(id).subscribe(
      data => { 
        if(data.success) { 
          this.menuList = data.body;
          console.log(this.menuList);
          console.log(data.body);

          swal({
            title: 'Success!',
            text: "Menu has successfully deleted.",
            type: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK',
          })
        } else {
          swal({
            title: 'Ooops!',
            text: "An error occured while processing your request",
            type: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
          })
        }
      }
    );
  }

  public cancelOrder() {
  }

  public chooseYear(year: Event) {
    let element = $(event.target as Element);

    if(element.hasClass('active')) {
      element.removeClass('active');
    } else {
      element.addClass('active');
    }
  }

  public chooseMonth(month) {
    let element = $(event.target as Element);

    if(element.hasClass('active')) {
      element.removeClass('active');
    } else {
      element.addClass('active');
    }
  }

  /* Add Menu  */
  public publishMenu() {
    this.submitted = true;

    Object.keys(this.forms.controls).forEach(field => {
      const control = this.forms.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if (this.directiveRef.dropzone().files.length == 0) {
      this.menuImagesError = true;
      return;
    }

    swal({
      title: 'Processing!',
      text: 'Please wait a moment as we try to register you.',
      showCancelButton: false,
      showConfirmButton: false
    });
   
    if(this.forms.valid && this.validateItems()) {
      let menu = {
        vendor: {id: this.vendorID},
        minimumCustomersRequired: this.forms.value.customers.trim(),
        priceFourMainCourse: this.forms.value.mainCourse.trim(),
        priceAdditionalDessert: this.forms.value.additionalDessert.trim(),
        priceAdditionalMenu: this.forms.value.additionalMenu.trim(),
        priceAdditionalLechon: this.forms.value.additionalLechon.trim(),
        dishes: this.dishes.join(","),
        desserts: this.desserts.join(","),
        locations: this.locations.join(","),
        styleOfCookingDescription: this.forms.value.styleOfCooking.trim(),
        specialtyDescription: this.forms.value.specialty.trim(),
        dateCreated: Date.now(),
        dateUpdated: Date.now()
      }

      this.menuService.createMenu(menu).subscribe(
        data => { 
          if(data!= null && data.success) { 
            let formdata = this.upload(this.vendorID, data.body.id);            
            this.menuService.pushFileToStorage(formdata).subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {
                this.loadingBar.set(Math.round(100 * event.loaded / event.total));
              } else if (event instanceof HttpResponse) {
                this.loadingBar.stop();
                let result = JSON.parse(event.body.toString());
                
                if(result.success) {
                  this.menuService.getMenusByVendor(this.vendorID).subscribe(
                    data => { 
                      if(data.success && data.body.length > 0) {
                        this.menuList = data.body;
                      }        
                    }
                  );

                  this.resetForm();

                  swal({
                    title: 'Ready for Review',
                    text: "Thank you for uploading your product & services. Kindly sit and relax while our marketing team reviews your portfolio.",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                  })
                } else {
                  swal({
                    title: 'Ooops!',
                    text: "Something went wrong as we process your request. Please try again later.",
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                  })
                }
              }
            });
          } else {
            swal({
              title: 'Ooops!',
              text: data.body.message,
              type: 'error',
              showCancelButton: false,
              confirmButtonText: 'OK',
            })
          }
        }
      );
    }
  }

  public addDish() {
    swal({
      title: 'Input name of dish to add.',
      input: 'text',
    }).then((result) => {
      if(result.value && result.value.length > 0) {
        if(this.dishes.indexOf(result.value) != -1) {
          swal({
            title: 'Ooops!',
            text: "Dish name is already in the list.",
            type: 'error',
            confirmButtonText: 'OK',
          })
        } else {
          this.dishes.push(result.value)
          this.submitted = false;
        }
      }
    })
  }

  public addDessert() {
    swal({
      title: 'Input name of dessert to add.',
      input: 'text',
    }).then((result) => {
        if(result.value && result.value.length > 0) {
          if(this.desserts.indexOf(result.value) != -1) {
            swal({
              title: 'Ooops!',
              text: "Dessert name is already in the list.",
              type: 'error',
              confirmButtonText: 'OK',
            })
          } else {
            this.desserts.push(result.value)
            this.submitted = false;
          }
        }
    })
  }

  public addLocation() {
    swal({
      title: 'Input name of location to add.',
      input: 'text',
    }).then((result) => {
        if(result.value && result.value.length > 0) {
          if(this.locations.indexOf(result.value) != -1) {
            swal({
              title: 'Ooops!',
              text: "Location name is already in the list.",
              type: 'error',
              confirmButtonText: 'OK',
            })
          } else {
            this.locations.push(result.value)
            this.submitted = false;
          }
        }
    })
  }

  public removeDish(dish) {
    let index = this.dishes.indexOf(dish);
    if(index != -1) {
      this.dishes.splice(index, 1);
    }
  }

  public removeDessert(dessert) {
    let index = this.desserts.indexOf(dessert);
    if(index != -1) {
      this.desserts.splice(index, 1);
    }
  }  

  public removeLocation(location) {
    let index = this.locations.indexOf(location);
    if(index != -1) {
      this.locations.splice(index, 1);
    }
  } 

  public validateItems() {
    return this.dishes.length > 0 && this.desserts.length > 0 && this.locations.length > 0;
  }

  public resetForm() {
    this.forms.reset();
    this.dishes = [];
    this.desserts = [];
    this.locations = [];
    this.resetDropzoneUploads();
  }

  /* Forms Validation  */
  public displayFieldCss(field: string) {
    let test = !this.forms.get(field).valid && this.forms.get(field).touched;
    return {
      'has-error': this.hasError(field),
      'has-success': this.hasSuccess(field)
    };
  }

  private hasError(field: string) {
    return this.forms.get(field).invalid && (this.forms.get(field).dirty || this.forms.get(field).touched);
  }

  private hasSuccess(field: string) {
    return this.forms.get(field).valid && (this.forms.get(field).dirty || this.forms.get(field).touched);
  }

  /* Dropzone Directive  */
  public type: string = 'component';
  public config: DropzoneConfigInterface = {
    clickable: true,
    url: '/',
    acceptedFiles: 'image/*',
    maxFiles: 5,
    autoProcessQueue: false,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;

  public upload(vendorID, menuID) {
    let images = this.directiveRef.dropzone().files;

    const formdata: FormData = new FormData(); 
    formdata.append('vendorID', vendorID);
    formdata.append('menuID', menuID);
    for(let image of images) {
      formdata.append('images[]', image);
    }    

    return formdata;
  }


  public toggleAutoReset(): void {
    this.config.autoReset = this.config.autoReset ? null : 5000;
    this.config.errorReset = this.config.errorReset ? null : 5000;
    this.config.cancelReset = this.config.cancelReset ? null : 5000;
  }

  public resetDropzoneUploads(): void {
    if (this.directiveRef && this.directiveRef) {
      this.directiveRef.reset();
    }
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }

  public addedFileDocuments(args: any):void {
    let dz = this.directiveRef.dropzone();
    
    if(dz.files.length > 5) {
      dz.removeFile(dz.files[5]);

      swal({
        title: "Ooops!",
        text: "Maximum of 5 files are allowed to be uploaded. You may reset your files.",
        type: 'warning'
      })
    }    
  }
}
