import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';


@Injectable()
export class EmailAddressValidator {

  debouncer: any;

  constructor(private auth: AuthService){
  }

  checkEmailAddress(control: FormControl): any {
    if (control.value == '') {
      return;
    }
    clearTimeout(this.debouncer);
    
    return new Promise(resolve => {

      this.debouncer = setTimeout(() => {
        this.auth.validateEmailAddress(control.value).subscribe((result) => {
          if(result.success){
            resolve({'emailAddressInUse': true});    
          } else {
            resolve(null);
          }
        }, (err) => {
          resolve({'emailAddressInUse': true});
        });

      }, 1000);      

    });
  }
}