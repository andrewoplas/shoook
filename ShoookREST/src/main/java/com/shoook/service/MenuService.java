package com.shoook.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoook.entity.Menu;
import com.shoook.entity.RequestError;
import com.shoook.entity.RequestResult;
import com.shoook.repository.MenuRepository;

@Service
public class MenuService {
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private MenuRepository repository;
		

	public RequestResult retrieve() {
		try {
			return result(repository.retrieve(em), true);
			
		} catch (Exception ex) {
			// Log the error
			return error("code", "message");
		}
	}
	
	
	public RequestResult retrieveById(String id) {
		try {
			int parsedId = Integer.parseInt(id);
			
			if(repository.contains(em, parsedId)) {
				return result(repository.retrieveById(em, parsedId), true);
			} else {
				// Log the error
				return error("code", "message");
			}
			
		} catch (NumberFormatException ex) {
			// Log the error
			return error("code", "message");
		} catch (Exception ex) {
			// Log the error
			return error("code", "message");
		}
	}
	
	
	public RequestResult create(Menu menu) {
		try {			
			repository.create(em, menu);
			return retrieve();
		} catch (Exception ex) {
			// Log the error
			return error("code", ex.getMessage());
		}
	}
	
	
	public RequestResult update(Menu pe) {
		try {
			if(repository.contains(em, pe.getId())) {
				repository.update(em, pe);

				return retrieve();
			} else {
				// Log the error
				return error("code", "does not exists");
			}
			
		} catch (Exception ex) {
			// Log the error
			return error("code", "does not exists");
		}
	}
	
	
	
	public RequestResult delete(String id) {
		try {
			int parsedId = Integer.parseInt(id);
			
			if(repository.contains(em, parsedId)) {
				Menu menu = repository.retrieveById(em, parsedId);
				repository.delete(em, menu);
				
				return retrieve();
			} else {
				// Log the error
				return error("code", "does not exists");
			}
			
		} catch (NumberFormatException ex) {
			// Log the error
			return error("code", ex.getMessage());
			
		} catch (Exception ex) {
			// Log the error
			return error("code", ex.getMessage());
		}
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
	
	