import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: '../html/register.component.html',
  styleUrls: ['../scss/register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

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

      $(".next").click(function(){
        if(animating) return false;
        animating = true;

        $('html, body').animate({
            scrollTop: $('#eliteregister').offset().top - 10
        }, 750);
        
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        
        //activate next step on progressbar using the index of next_fs
        $("#eliteregister li").eq($("fieldset").index(next_fs)).addClass("active");
        
        //show the next fieldset
        next_fs.show(); 
        next_fs.addClass('active');
        current_fs.removeClass('active');
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
          step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50)+"%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'transform': 'scale('+scale+')'});
            next_fs.css({'left': left, 'opacity': opacity});
          }, 
          duration: 300, 
          complete: function(){
            current_fs.hide();
            animating = false;
          }, 
          //this comes from the custom easing plugin
          // easing: 'easeInOutBack'
        });
      });
      
      $(".previous").click(function(){
        if(animating) return false;
        animating = true;

        $('html, body').animate({
          scrollTop: $('#eliteregister').offset().top - 10
        }, 750);
        
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();
        
        //de-activate current step on progressbar
        $("#eliteregister li").eq($("fieldset").index(current_fs)).removeClass("active");
        
        //show the previous fieldset
        previous_fs.show(); 
        previous_fs.addClass('active');
        current_fs.removeClass('active');
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
          step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1-now) * 50)+"%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
          }, 
          duration: 600, 
          complete: function(){
            current_fs.hide();
            animating = false;
          }, 
          //this comes from the custom easing plugin
          // easing: 'easeInBack'
        });
      });
    });
  }

  registerVendor() {
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
        this.router.navigate(['menu']);
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
}
