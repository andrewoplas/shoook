package com.shoook.entity;

public class RequestResult {
	private boolean success;
	
	private Object body;
	
	
	public RequestResult() {
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public Object getBody() {
		return body;
	}

	public void setBody(Object body) {
		this.body = body;
	}
}
