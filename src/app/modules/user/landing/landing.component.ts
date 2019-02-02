import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public forms = this.formBuilder.group({
    occassion: [""],
    date: [""],
    time: [""],
    location: [""],
    numberOfGuest: [""]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  public ngOnInit() { 
    eval("$('#testimonial').slick({slidesToShow: 3,slidesToScroll: 1,autoplay: true,autoplaySpeed: 2000,dots: true})");
    eval("$('#txtTime').timepicki();");
    eval("$('#txtDate').datepicker({minDate: new Date(),language: 'en',dateFormat: 'mm/dd/yyyy'});");
  }

  public search() {
    let search = {
      occassion: this.forms.value.occassion.trim(),
      date: this.forms.value.date.trim(),
      time: this.forms.value.time.trim(),
      location: this.forms.value.location.trim(),
      guests: this.forms.value.numberOfGuest.trim(),
    }

    this.router.navigate(['/search', search]);
  }

}
