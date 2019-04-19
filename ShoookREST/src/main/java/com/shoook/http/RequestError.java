package com.shoook.http;

public class RequestError {
	private String code;
	private String message;
	
	public RequestError() {
	}	
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
