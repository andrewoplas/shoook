import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Globals } from '@shared/models/Global';
import * as $ from 'jquery';

declare var require: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChildren('images') images: QueryList<any>;
  public menu: any;
  public menu_items: any;
  public imagePath;
  public forms = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      zipCode: ["", Validators.required],
      emailAddress:  ["", [Validators.email, Validators.required]],
      contact: ["", Validators.required],
      // emailAddress: ["", [Validators.email, Validators.required], this.emailValidator.checkEmailAddress.bind(this.emailValidator)],  
  });

  constructor(
    private router: Router,
    private global: Globals,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() { 
    this.imagePath = this.global.MENU_IMAGE_PATH;
    this.retrieveItem();
  }

  ngAfterViewInit() {
    this.initializeSlick();
  }

  public initializeSlick() {
    if(!$('#menu-images').hasClass('slick-initialized')) {
      eval("$('#menu-images').slick({autoplay: true, autoplaySpeed: 2000, dots: true, arrows: false})");
    }
  }

  public retrieveItem() {
    if (sessionStorage.getItem("item") !== null) {
      let item = JSON.parse(sessionStorage.getItem("item"));
      this.menu = item.menu;
      this.menu_items = item.menu_items
    } else {
      this.router.navigate(['/search']);
    }
  }

  public checkout() {
    Object.keys(this.forms.controls).forEach(field => {
      const control = this.forms.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if(this.forms.valid) {
      let user = {
        firstName: this.forms.value.firstName.trim(),
        lastName: this.forms.value.lastName.trim(),
        gender: this.forms.value.gender.trim(),
        address: this.forms.value.address.trim(),
        city: this.forms.value.city.trim(),
        zipCode: this.forms.value.zipCode.trim(),
        emailAddress: this.forms.value.emailAddress.trim(),
        contact: this.forms.value.contact.trim(),
      }

      if (sessionStorage.getItem("item") !== null) {
        let item = JSON.parse(sessionStorage.getItem("item"));
        item['user'] = user;
        sessionStorage.setItem("item", JSON.stringify(item));
        this.router.navigate(['/payment']);
      } else {
        this.router.navigate(['/search']);
      }
    }
  }

  /* Forms Validation  */
  public displayFieldCss(field: string) {
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
}
