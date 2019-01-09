import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Globals } from '@shared/models/Global';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { catchError, tap } from "rxjs/operators";
import { ErrorHandlerService } from './error-handler.service';
import { UserLogin, Role } from '@shared/models/UserLogin.model';


const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private global: Globals,
    private errHandler: ErrorHandlerService,
    private router: Router
  ) {
    this.baseUrl = this.global.BASE_URL + 'auth';    
  }

  /** POST: Retrieve user */
  public login(user): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/login`, user, httpOptions)
      .pipe(
        tap(_ => this.log(`login user with username=${user.username}`)),
        catchError(this.errHandler.handleError)
      );
  }

  public successLogin(user) {
    localStorage.setItem('user_credentials', JSON.stringify(user));
    
    if(user.role == Role.ADMIN) {
      this.router.navigate(['/admin']);  
    } else if(user.role == Role.VENDOR) {
      this.router.navigate(['/vendor/menu']);  
    } else if(user.role == Role.CUSTOMER) {
      this.router.navigate(['/']);  
    }
  }

  public isAdmin() {
    let user = this.getUser();
    return user != null && user.role == Role.ADMIN;
  }

  public isVendor() {
    let user = this.getUser();
    return user != null && user.role == Role.VENDOR;
  }

  public isCustomer() {
    let user = this.getUser();
    return user != null && user.role == Role.CUSTOMER;
  }

  public isloggedIn() {
    return localStorage.getItem("user_credentials");
  }

  public logout() {
    localStorage.removeItem('user_credentials');
    this.router.navigate(['/']);
  }

  public getUser() {
    return JSON.parse(localStorage.getItem('user_credentials'));
  }

  /** Log a MenuService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`MenuService: ${message}`);
  }
}
