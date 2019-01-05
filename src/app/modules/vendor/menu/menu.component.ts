import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import swal from 'sweetalert2';
import { DropzoneConfigInterface, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '@core/services/menu.service';
import { Menu } from '@shared/models/Menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes = []
  desserts = []
  locations = []
  submitted = false;
  menuList = Array<any>();

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
    private menuService: MenuService
  ) { }

  ngOnInit() {
    eval("[].slice.call(document.querySelectorAll('.sttabs')).forEach(function(el) {new CBPFWTabs(el);});");

    this.menuService.getMenus().subscribe(
      data => { 
        if(data.success && data.body.length > 0) {
          this.menuList = data.body;
        }        
      }
    );
  }

  public deleteMenu(id) {
    this.menuService.deleteMenu(id).subscribe(
      data => { 
        if(data.success) { 
          this.menuList = data.body;

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

    if(this.forms.valid && this.validateItems()) {
      let menu = {
        vendor: {id: 1},
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
          if(data.success) { 
            this.menuList = data.body;
            
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
              text: data.body.message,
              type: 'error',
              showCancelButton: false,
              confirmButtonText: 'OK',
            })
          }
        }
      );
    } else {
      // this.upload();
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

  public upload() {
    let dropzone = this.directiveRef.dropzone();

    let files = dropzone.files;
    console.log(dropzone);
    console.log(files);
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
}
