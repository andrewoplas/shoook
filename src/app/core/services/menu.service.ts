import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpRequest } from "@angular/common/http";
import { Globals } from '@shared/models/Global';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from "rxjs/Observable";
import { catchError, tap } from "rxjs/operators";
import { RequestResult } from '@shared/models/RequestResult';
import { Menu } from '@shared/models/Menu.model';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl: string;
  private baseUrlFileUpload: string;

  constructor(
    private http: HttpClient,
    private global: Globals,
    private errHandler: ErrorHandlerService
  ) {
    this.baseUrl = this.global.BASE_URL + 'menu';
    this.baseUrlFileUpload = "http://shoook.ph/images/upload.php";
  }

  /** POST: search menu to the server */
  public search(menu): Observable<any> {
    return this.http
      .post<RequestResult>(`${this.baseUrl}/search`, menu, httpOptions)
      .pipe(
        tap(_ => this.log(`search menu`)),
        catchError(this.errHandler.handleError)
      );
  }

  /** GET: retrieve entities from the server */
  public getMenus(): Observable<RequestResult> {
    return this.http
      .get<RequestResult>(`${this.baseUrl}/get-menus`, httpOptions)
      .pipe(
        tap(() => this.log("get-menus")),
        catchError(this.errHandler.handleError)
      );
  }

  /** GET: retrieve single entity from the server */
  public getMenuById(id: number): Observable<RequestResult> {
    return this.http
      .get<RequestResult>(`${this.baseUrl}/get-menu/${id}`, httpOptions)
      .pipe(
        tap(() => this.log("get-menu")),
        catchError(this.errHandler.handleError)
      );
  }

  /** GET: retrieve single entity from the server */
  public getMenusByVendor(id: number): Observable<RequestResult> {
    return this.http
      .get<RequestResult>(`${this.baseUrl}/get-menu-vendor/${id}`, httpOptions)
      .pipe(
        tap(() => this.log("get-menu-vendor")),
        catchError(this.errHandler.handleError)
      );
  }

  /** POST: create a new entity to the server */
  public createMenu(menu): Observable<any> {
    return this.http
      .post<RequestResult>(`${this.baseUrl}/create-menu`, menu, httpOptions)
      .pipe(
        tap(_ => this.log(`create menu with id=${menu.id}`)),
        catchError(this.errHandler.handleError)
      );
  }

  /** DELETE: delete the entity from the server */
  public deleteMenu(menu: string | number): Observable<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this.baseUrl}/delete-menu/${menu}`)
      .pipe(
        tap(_ => this.log(`deleted menu id=${menu}`)),
        catchError(this.errHandler.handleError)
      );
  }

  /** PUT: update the entity on the server */
  public updateMenu(menu: Menu): Observable<RequestResult> {
    return this.http
      .put<RequestResult>(`${this.baseUrl}/update-menu`, menu, httpOptions)
      .pipe(
        tap(_ => this.log(`updated menu id=${menu.id}`)),
        catchError(this.errHandler.handleError)
      );
  }

  /** POST: Upload image on the server */
  public pushFileToStorage(formdata: FormData): Observable<HttpEvent<{}>> { 
    const req = new HttpRequest('POST', `${this.baseUrlFileUpload}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }

  /** Log a MenuService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`MenuService: ${message}`);
  }
}
