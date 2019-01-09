import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import swal from 'sweetalert2';
import { AuthService } from '@core/services/auth.service';
import { Role } from '@shared/models/UserLogin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  forms = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    let user = {
      username: this.forms.value.username.trim(),
      password: this.forms.value.password.trim(),
      role: Role.VENDOR
    };    

    this.auth.login(user).subscribe(
      response => {
        if(response != null && response.success == true) {
          this.auth.successLogin(response.body);
        } else {
          swal({
            title: "Error",
            text: "Invalid Username or Password!",
            type: "error",
            confirmButtonText: "Try Again",
            confirmButtonColor: "#A40020"
          });
        }
      }, 
    );
  }

}
