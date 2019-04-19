package com.shoook.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoook.entity.PotentialEarning;
import com.shoook.http.Message;
import com.shoook.http.RequestError;
import com.shoook.http.RequestResult;
import com.shoook.repository.PotentialEarningRepository;

@Service
public class PotentialEarningService {
	
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private PotentialEarningRepository repository;
	
	public RequestResult retrieve() {
		try {	
			return result(repository.retrieve(em), true);
			
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
		}
	}
	
	public RequestResult retrieveById(String id) {
		try {
			int parsedId = Integer.parseInt(id);
			
			if(repository.contains(em, parsedId)) {
				return result(repository.retrieveById(em, parsedId), true);
			} else {
				return error(Message.PE_ID_NOT_FOUND, Message.PE_ID_NOT_FOUND_MESSAGE);
			}
			
		} catch (NumberFormatException ex) {
			// Log the error
			return error(Message.NUMBER_FORMAT_EXCEPTION, Message.NUMBER_FORMAT_EXCEPTION_MESSAGE);
			
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
		}
	}
	
	public RequestResult create(PotentialEarning pe) {
		try {
			if(!repository.contains(em, pe)) {
				pe = repository.create(em, pe);
				return result(pe, true);
				
			} else {
				return error(Message.PE_ALREADY_EXISTS, Message.PE_ALREADY_EXISTS_MESSAGE);
			}
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
		}
	}
	
	public RequestResult update(PotentialEarning pe) {
		try {
			if(repository.contains(em, pe.getId())) {
				repository.update(em, pe);
				return result(null, true);
				
			} else {
				return error(Message.PE_ID_NOT_FOUND, Message.PE_ID_NOT_FOUND_MESSAGE);
			}
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
		}
	}
	
	public RequestResult delete(String id) {
		try {
			int parsedId = Integer.parseInt(id);
			
			if(repository.contains(em, parsedId)) {
				return result(null, true);
				
			} else {
				return error(Message.PE_ID_NOT_FOUND, Message.PE_ID_NOT_FOUND_MESSAGE);
			}
			
		} catch (NumberFormatException ex) {
			// Log the error
			return error(Message.NUMBER_FORMAT_EXCEPTION, Message.NUMBER_FORMAT_EXCEPTION_MESSAGE);
			
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
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
