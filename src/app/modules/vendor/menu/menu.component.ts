import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes = []
  desserts = []
  locations = []

  constructor() { }

  ngOnInit() {
    eval("[].slice.call(document.querySelectorAll('.sttabs')).forEach(function(el) {new CBPFWTabs(el);});");
    eval('new Dropzone("#dropzone", { url: "/vendor"});')
  }

  deleteMenu() {

  }

  cancelOrder() {

  }

  chooseYear(year: Event) {
    let element = $(event.target as Element);

    if(element.hasClass('active')) {
      element.removeClass('active');
    } else {
      element.addClass('active');
    }
  }

  chooseMonth(month) {
    let element = $(event.target as Element);

    if(element.hasClass('active')) {
      element.removeClass('active');
    } else {
      element.addClass('active');
    }
  }

  publishMenu() {
    swal({
      title: 'Ready for Review',
      text: "Thank you for uploading your product & services. Kindly sit and relax while our marketing team reviews your portfolio.",
      type: 'success',
      showCancelButton: false,
      confirmButtonText: 'OK',
    })
  }

  addDish() {
    swal({
      title: 'Input name of dish to add.',
      input: 'text',
    }).then((result) => {
      if(result.value.length > 0) {
        if(this.dishes.indexOf(result.value) != -1) {
          swal({
            title: 'Ooops!',
            text: "Dish name is already in the list.",
            type: 'error',
            confirmButtonText: 'OK',
          })
        } else {
          this.dishes.push(result.value)
        }
      }
    })
  }

  addDessert() {
    swal({
      title: 'Input name of dessert to add.',
      input: 'text',
    }).then((result) => {
        if(result.value.length > 0) {
          if(this.desserts.indexOf(result.value) != -1) {
            swal({
              title: 'Ooops!',
              text: "Dessert name is already in the list.",
              type: 'error',
              confirmButtonText: 'OK',
            })
          } else {
            this.desserts.push(result.value)
          }
        }
    })
  }

  addLocation() {
    swal({
      title: 'Input name of location to add.',
      input: 'text',
    }).then((result) => {
        if(result.value.length > 0) {
          if(this.locations.indexOf(result.value) != -1) {
            swal({
              title: 'Ooops!',
              text: "Location name is already in the list.",
              type: 'error',
              confirmButtonText: 'OK',
            })
          } else {
            this.locations.push(result.value)
          }
        }
    })
  }

  removeDish(dish) {
    let index = this.dishes.indexOf(dish);
    if(index != -1) {
      this.dishes.splice(index, 1);
    }
  }

  removeDessert(dessert) {
    let index = this.desserts.indexOf(dessert);
    if(index != -1) {
      this.desserts.splice(index, 1);
    }
  }  

  removeLocation(location) {
    let index = this.locations.indexOf(location);
    if(index != -1) {
      this.locations.splice(index, 1);
    }
  } 
}
