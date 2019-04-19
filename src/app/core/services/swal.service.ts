import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  constructor() { 
  }

  public swalError(
    title = "Ooops!", 
    message = "An error occurs while processing your request!",
    confirmButtonText = 'OK') 
  {
    swal({
      title: title,
      text: message,
      type: 'error',
      showCancelButton: false,
      confirmButtonText: confirmButtonText,
    });
  }

  public swalSuccess(title, message) {
    swal({
      title: title,
      text: message,
      type: 'success',
      showCancelButton: false,
      confirmButtonText: 'OK',
    });
  }

  public swalLoading(
    title = "Loading", 
    message = "Please wait a moment as we process your request") 
  {
    swal({
      title: title,
      text: message,
      showCancelButton: false,
      showConfirmButton: false
    });
  }

}
