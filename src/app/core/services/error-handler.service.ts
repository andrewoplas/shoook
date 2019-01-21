import { Injectable } from '@angular/core';
import { ErrorHandler } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { _throw } from 'rxjs/observable/throw';
import * as Status  from 'http-status-codes';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor() { }

  public handleError(error: HttpErrorResponse) { 
    let title = '';
    let message = '';

    if(!error.ok) {
      let status = error.status;

      switch(status) {
        case Status.ACCEPTED:
          title = "Accepted";
          message = "The request has been received but not yet acted upon.";
          break;

        case Status.BAD_GATEWAY:
          title = "Bad Gateway";
          message = "The server, while working as a gateway to get a response needed to handle the request, got an invalid response.";
          break;

        case Status.BAD_REQUEST:
          title = "Bad Request";
          message = "The server could not understand the request due to invalid syntax.";
          break;

        case Status.CONFLICT:
          title = "Conflict";
          message = "This response is sent when a request conflicts with the current state of the server.";
          break;

        case Status.CONTINUE:
          title = "Continue";
          message = "This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.";
          break;

        case Status.CREATED:
          title = "Created";
          message = "The request has succeeded and a new resource has been created as a result of it.";
          break;

        case Status.EXPECTATION_FAILED:
          title = "Expectation Failed";
          message = "The expectation indicated by the Expect request header field can't be met by the server.";
          break;

        case Status.FAILED_DEPENDENCY:
          title = "Failed Dependency";
          message = "The request failed due to failure of a previous request.";
          break;

        case Status.FORBIDDEN:
          title = "Forbidden";
          message = "The server understood the request but refuses to authorize it.";
          break;

        case Status.GATEWAY_TIMEOUT:
          title = "Gateway Timeout";
          message = "The server, while acting as a gateway or proxy, cannot get a response in time.";
          break;

        case Status.GONE:
          title = "Gone";
          message = "Access to the target resource is no longer available at the origin server and that this condition is likely to be permanent.";
          break;

        case Status.HTTP_VERSION_NOT_SUPPORTED:
          title = "HTTP Version Not Supported";
          message = "The HTTP version used in the request is not supported by the server.";
          break;

        case Status.IM_A_TEAPOT:
          title = "I'm a teapot";
          message = "The server refuses the attempt to brew coffee with a teapot.";
          break;

        case Status.INSUFFICIENT_STORAGE:
          title = "Insufficient Storage";
          message = "The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.";
          break;

        case Status.INTERNAL_SERVER_ERROR:
          title = "Internal Server Error";
          message = "The server has encountered a situation it doesn't know how to handle.";
          break;

        case Status.LENGTH_REQUIRED:
          title = "Length Required";
          message = "Server rejected the request because the Content-Length header field is not defined and the server requires it.";
          break;

        case Status.LOCKED:
          title = "Locked";
          message = "The resource that is being accessed is locked.";
          break;

        case Status.METHOD_NOT_ALLOWED:
          title = "Method Not Allowed";
          message = "The request method is known by the server but has been disabled and cannot be used.";
          break;

        case Status.MOVED_PERMANENTLY:
          title = "Moved Permanently";
          message = "The URI of the requested resource has been changed. Probably, the new URI would be given in the response.";
          break;

        case Status.MULTI_STATUS:
          title = "Multi-Status";
          message = "Response conveys information about multiple resources in situations where multiple status codes might be appropriate.";
          break;

        case Status.MULTIPLE_CHOICES:
          title = "Multiple Choices";
          message = "The request has more than one possible response. The user-agent or user should choose one of them. There is no standardized way of choosing one of the responses.";
          break;

        case Status.NETWORK_AUTHENTICATION_REQUIRED:
          title = "Network Authentication Required";
          message = "The client needs to authenticate to gain network access.";
          break;

        case Status.NO_CONTENT:
          title = "No Content";
          message = "There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.";
          break;

        case Status.NON_AUTHORITATIVE_INFORMATION:
          title = "Non Authoritative Information";
          message = "Returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. ";
          break;

        case Status.NOT_ACCEPTABLE:
          title = "Not Acceptable";
          message = "The web server, after performing server-driven content negotiation, doesn't find any content following the criteria given by the user agent.";
          break;

        case Status.NOT_FOUND:
          title = "Not Found";
          message = "The server can not find requested resource.";
          break;

        case Status.NOT_IMPLEMENTED:
          title = "Not Implemented";
          message = "The request method is not supported by the server and cannot be handled.";
          break;

        case Status.NOT_MODIFIED:
          title = "Not Modified";
          message = "This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.";
          break;

        case Status.PARTIAL_CONTENT:
          title = "Partial Content";
          message = "Range header sent by the client to separate download into multiple streams.";
          break;

        case Status.PAYMENT_REQUIRED:
          title = "Payment Required";
          message = "Initial aim for creating this code was using it for digital payment systems however this is not used currently.";
          break;

        case Status.PERMANENT_REDIRECT:
          title = "Permanent Redirect";
          message = "The resource is now permanently located at another URI, specified by the Location: HTTP Response header. ";
          break;

        case Status.PRECONDITION_FAILED:
          title = "Precondition Failed";
          message = "The client has indicated preconditions in its headers which the server does not meet.";
          break;

        case Status.PRECONDITION_REQUIRED:
          title = "Precondition Required";
          message = "The origin server requires the request to be conditional.";
          break;

        case Status.PROCESSING:
          title = "Processing";
          message = "The server has received and is processing the request, but no response is available yet.";
          break;

        case Status.PROXY_AUTHENTICATION_REQUIRED:
          title = "Proxy Authentication Required";
          message = "Authentication is needed to be done by a proxy.";
          break;

        case Status.REQUEST_HEADER_FIELDS_TOO_LARGE:
          title = "Request Header Fields Too Large";
          message = "The server is unwilling to process the request because its header fields are too large.";
          break;

        case Status.REQUEST_TIMEOUT:
          title = "Request Timeout";
          message = "This response is sent on an idle connection by some servers, even without any previous request by the client.";
          break;

        case Status.RESET_CONTENT:
          title = "Reset Content";
          message = "This response code is sent after accomplishing request to tell user agent reset document view which sent this request.";
          break;

        case Status.SEE_OTHER:
          title = "See Other";
          message = "The server sent this response to direct the client to get the requested resource at another URI with a GET request.";
          break;

        case Status.SERVICE_UNAVAILABLE:
          title = "Service Unavailable";
          message = "The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded.";
          break;

        case Status.SWITCHING_PROTOCOLS:
          title = "Switching Protocols";
          message = "This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching to.";
          break;

        case Status.TEMPORARY_REDIRECT:
          title = "Temporary Redirect";
          message = "The server sends this response to direct the client to get the requested resource at another URI with same method that was used in the prior request.";
          break;

        case Status.TOO_MANY_REQUESTS:
          title = "Too Many Requests";
          message = "The user has sent too many requests in a given amount of time.";
          break;

        case Status.UNAUTHORIZED:
          title = "Unauthorized";
          message = "The client must authenticate itself to get the requested response.";
          break;

        case Status.UNPROCESSABLE_ENTITY:
          title = "Unprocessable Entity";
          message = "The request was well-formed but was unable to be followed due to semantic errors.";
          break;

        case Status.UNSUPPORTED_MEDIA_TYPE:
          title = "Unsupported Media Type";
          message = "The media format of the requested data is not supported by the server, so the server is rejecting the request.";
          break;

        case Status.USE_PROXY:
          title = "Use Proxy";
          message = "Was defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy.";
          break;

        default: 
          title = "Error";
          message = "There might be a problem in the server. You may try again later.";
          break;
      }
    }
    
    return _throw({
      title: title,
      message:message
    });
  }

  
  public handleErrorV2(error: HttpErrorResponse) { 
    let title = '';
    let message = '';

    if(!error.ok) {
      let status = error.status;

      switch(status) {
        case Status.ACCEPTED:
          title = "Accepted";
          message = "The request has been received but not yet acted upon.";
          break;

        case Status.BAD_GATEWAY:
          title = "Bad Gateway";
          message = "The server, while working as a gateway to get a response needed to handle the request, got an invalid response.";
          break;

        case Status.BAD_REQUEST:
          title = "Bad Request";
          message = "The server could not understand the request due to invalid syntax.";
          break;

        case Status.CONFLICT:
          title = "Conflict";
          message = "This response is sent when a request conflicts with the current state of the server.";
          break;

        case Status.CONTINUE:
          title = "Continue";
          message = "This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.";
          break;

        case Status.CREATED:
          title = "Created";
          message = "The request has succeeded and a new resource has been created as a result of it.";
          break;

        case Status.EXPECTATION_FAILED:
          title = "Expectation Failed";
          message = "The expectation indicated by the Expect request header field can't be met by the server.";
          break;

        case Status.FAILED_DEPENDENCY:
          title = "Failed Dependency";
          message = "The request failed due to failure of a previous request.";
          break;

        case Status.FORBIDDEN:
          title = "Forbidden";
          message = "The server understood the request but refuses to authorize it.";
          break;

        case Status.GATEWAY_TIMEOUT:
          title = "Gateway Timeout";
          message = "The server, while acting as a gateway or proxy, cannot get a response in time.";
          break;

        case Status.GONE:
          title = "Gone";
          message = "Access to the target resource is no longer available at the origin server and that this condition is likely to be permanent.";
          break;

        case Status.HTTP_VERSION_NOT_SUPPORTED:
          title = "HTTP Version Not Supported";
          message = "The HTTP version used in the request is not supported by the server.";
          break;

        case Status.IM_A_TEAPOT:
          title = "I'm a teapot";
          message = "The server refuses the attempt to brew coffee with a teapot.";
          break;

        case Status.INSUFFICIENT_STORAGE:
          title = "Insufficient Storage";
          message = "The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.";
          break;

        case Status.INTERNAL_SERVER_ERROR:
          title = "Internal Server Error";
          message = "The server has encountered a situation it doesn't know how to handle.";
          break;

        case Status.LENGTH_REQUIRED:
          title = "Length Required";
          message = "Server rejected the request because the Content-Length header field is not defined and the server requires it.";
          break;

        case Status.LOCKED:
          title = "Locked";
          message = "The resource that is being accessed is locked.";
          break;

        case Status.METHOD_NOT_ALLOWED:
          title = "Method Not Allowed";
          message = "The request method is known by the server but has been disabled and cannot be used.";
          break;

        case Status.MOVED_PERMANENTLY:
          title = "Moved Permanently";
          message = "The URI of the requested resource has been changed. Probably, the new URI would be given in the response.";
          break;

        case Status.MULTI_STATUS:
          title = "Multi-Status";
          message = "Response conveys information about multiple resources in situations where multiple status codes might be appropriate.";
          break;

        case Status.MULTIPLE_CHOICES:
          title = "Multiple Choices";
          message = "The request has more than one possible response. The user-agent or user should choose one of them. There is no standardized way of choosing one of the responses.";
          break;

        case Status.NETWORK_AUTHENTICATION_REQUIRED:
          title = "Network Authentication Required";
          message = "The client needs to authenticate to gain network access.";
          break;

        case Status.NO_CONTENT:
          title = "No Content";
          message = "There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.";
          break;

        case Status.NON_AUTHORITATIVE_INFORMATION:
          title = "Non Authoritative Information";
          message = "Returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. ";
          break;

        case Status.NOT_ACCEPTABLE:
          title = "Not Acceptable";
          message = "The web server, after performing server-driven content negotiation, doesn't find any content following the criteria given by the user agent.";
          break;

        case Status.NOT_FOUND:
          title = "Not Found";
          message = "The server can not find requested resource.";
          break;

        case Status.NOT_IMPLEMENTED:
          title = "Not Implemented";
          message = "The request method is not supported by the server and cannot be handled.";
          break;

        case Status.NOT_MODIFIED:
          title = "Not Modified";
          message = "This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.";
          break;

        case Status.PARTIAL_CONTENT:
          title = "Partial Content";
          message = "Range header sent by the client to separate download into multiple streams.";
          break;

        case Status.PAYMENT_REQUIRED:
          title = "Payment Required";
          message = "Initial aim for creating this code was using it for digital payment systems however this is not used currently.";
          break;

        case Status.PERMANENT_REDIRECT:
          title = "Permanent Redirect";
          message = "The resource is now permanently located at another URI, specified by the Location: HTTP Response header. ";
          break;

        case Status.PRECONDITION_FAILED:
          title = "Precondition Failed";
          message = "The client has indicated preconditions in its headers which the server does not meet.";
          break;

        case Status.PRECONDITION_REQUIRED:
          title = "Precondition Required";
          message = "The origin server requires the request to be conditional.";
          break;

        case Status.PROCESSING:
          title = "Processing";
          message = "The server has received and is processing the request, but no response is available yet.";
          break;

        case Status.PROXY_AUTHENTICATION_REQUIRED:
          title = "Proxy Authentication Required";
          message = "Authentication is needed to be done by a proxy.";
          break;

        case Status.REQUEST_HEADER_FIELDS_TOO_LARGE:
          title = "Request Header Fields Too Large";
          message = "The server is unwilling to process the request because its header fields are too large.";
          break;

        case Status.REQUEST_TIMEOUT:
          title = "Request Timeout";
          message = "This response is sent on an idle connection by some servers, even without any previous request by the client.";
          break;

        case Status.RESET_CONTENT:
          title = "Reset Content";
          message = "This response code is sent after accomplishing request to tell user agent reset document view which sent this request.";
          break;

        case Status.SEE_OTHER:
          title = "See Other";
          message = "The server sent this response to direct the client to get the requested resource at another URI with a GET request.";
          break;

        case Status.SERVICE_UNAVAILABLE:
          title = "Service Unavailable";
          message = "The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded.";
          break;

        case Status.SWITCHING_PROTOCOLS:
          title = "Switching Protocols";
          message = "This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching to.";
          break;

        case Status.TEMPORARY_REDIRECT:
          title = "Temporary Redirect";
          message = "The server sends this response to direct the client to get the requested resource at another URI with same method that was used in the prior request.";
          break;

        case Status.TOO_MANY_REQUESTS:
          title = "Too Many Requests";
          message = "The user has sent too many requests in a given amount of time.";
          break;

        case Status.UNAUTHORIZED:
          title = "Unauthorized";
          message = "The client must authenticate itself to get the requested response.";
          break;

        case Status.UNPROCESSABLE_ENTITY:
          title = "Unprocessable Entity";
          message = "The request was well-formed but was unable to be followed due to semantic errors.";
          break;

        case Status.UNSUPPORTED_MEDIA_TYPE:
          title = "Unsupported Media Type";
          message = "The media format of the requested data is not supported by the server, so the server is rejecting the request.";
          break;

        case Status.USE_PROXY:
          title = "Use Proxy";
          message = "Was defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy.";
          break;

        default: 
          title = "Error";
          message = "There might be a problem in the server. You may try again later.";
          break;
      }
    }
  
    return {
      title: title,
      message:message
    };
  }
}
