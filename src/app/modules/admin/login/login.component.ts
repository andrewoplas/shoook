import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import swal from 'sweetalert2';
import { AuthService } from '@core/services/auth.service';
import { Role } from '@shared/models/UserLogin.model';
import { SwalService } from '@core/services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public forms = this.fb.group({
    emailAddress: ["", [Validators.required]],
    password: ["", [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private swalService: SwalService
  ) { }

  ngOnInit() {
  }

  login() {
    let user = {
      emailAddress: this.forms.value.emailAddress.trim(),
      password: this.forms.value.password.trim(),
      role: Role.ADMIN
    }; 
    
    this.swalService.swalLoading(
      "Logging in",
      "Please wait a moment as we try to check your credentials."
    );

    this.auth.login(user).subscribe(
      response => {
        if(response != null && response.body != null && response.success == true) {
          swal.close();
          this.auth.successLogin(response.body);
        } else {
          this.swalService.swalError(
            "Error",
            "Invalid Username or Password!",
            "Try Again"
          );
        }
      }, 
    );
  }

}