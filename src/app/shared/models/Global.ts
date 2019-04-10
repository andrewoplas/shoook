import { Injectable } from "@angular/core";

@Injectable()
export class Globals {

  // REST API
  public BASE_URL: string = 'http://localhost:8080/'; // Local Server
  // public BASE_URL: string = 'https://shoook.herokuapp.com/'; // Deployed Server
  public BASE_URL_FILE_UPLOAD: string = "http://shoook.ph/uploads/upload.php"; // PHP File Upload Rest

  // Image Resources
  public MENU_IMAGE_PATH: string = "http://shoook.ph/uploads/menu/";
  public ID_IMAGE_PATH: string = "http://shoook.ph/uploads/id/";
  public DOCUMENT_FILE_PATH: string = "http://shoook.ph/uploads/documents/";  
}
