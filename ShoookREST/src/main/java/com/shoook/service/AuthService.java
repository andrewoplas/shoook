package com.shoook.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoook.entity.UserLogin;
import com.shoook.http.Message;
import com.shoook.http.RequestError;
import com.shoook.http.RequestResult;
import com.shoook.repository.AuthRepository;

@Service
public class AuthService {
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private AuthRepository repository;
	
	private int ADMIN = 0;
	
	private int VENDOR = 1;
	
	private int CUSTOMER = 2;
		
	
	public RequestResult login(UserLogin user) {
		try {
			Object userResponse = null;
			user.setPassword(DigestUtils.md5Hex(user.getPassword()));
			
			if(user.getRole() == ADMIN) {
				userResponse = repository.loginAdmin(em, user);
			} else if(user.getRole() == VENDOR) {
				userResponse = repository.loginVendor(em, user);
			} else if(user.getRole() == CUSTOMER) {
				userResponse = repository.loginCustomer(em, user);
			} else {
				throw new Exception();
			}		
			
			return result(userResponse, true);
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, Message.EXCEPTION_MESSAGE);
		}
	}
	
	public RequestResult checkVendorEmailAddress(String emailAddress) {
		return result(null, repository.checkVendorEmailAddress(em, emailAddress));
	}
	
	
	// Helper Functions
		private RequestResult result(Object body, boolean success) {
			RequestResult result = new RequestResult();
			result.setSuccess(success);
			result.setBody(body);
			
			return result;
		}	
		
		private RequestResult error(String code, String message) {
			RequestError error = new RequestError();
			error.setCode(code);
			error.setMessage(message);
			return result(error, false);
		}
}
	
	