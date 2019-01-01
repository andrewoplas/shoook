package com.shoook.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoook.entity.PotentialEarning;
import com.shoook.entity.RequestError;
import com.shoook.entity.RequestResult;
import com.shoook.repository.PotentialEarningRepository;

@Service
public class PotentialEarningService {
	
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private PotentialEarningRepository repository;
	
	
	public RequestResult retrieve() {
		RequestResult result = new RequestResult();
		result.setSuccess(true);
		result.setBody(repository.retrieve(em));
		
		return result;
	}
	
	public RequestResult retrieveById(String id) {
		RequestResult result = new RequestResult();		
		
		try {
			int parsedId = Integer.parseInt(id);
			
			if(repository.contains(em, parsedId)) {
				result.setBody(repository.retrieveById(em, parsedId));
				result.setSuccess(true);
			}
		} catch (NumberFormatException ex) {
			// Log the error
			
			RequestError error = new RequestError();
			error.setCode("123");
			error.setMessage("123");
			
			result.setSuccess(false);
			result.setBody(error);
		} catch (Exception ex) {
			// Log the error
			RequestError error = new RequestError();
			error.setCode("123");
			error.setMessage("123");
			
			result.setSuccess(false);
			result.setBody(error);
		}
		
		return result;
	}
	
	public RequestResult create(PotentialEarning pe) {
		RequestResult result = new RequestResult();
		
		try {
			if(!repository.contains(em, pe)) {
				pe = repository.create(em, pe);
				
				result.setSuccess(true);
				result.setBody(pe);
			} else {
				// Throw already exists exception
				throw new Exception();
			}
		} catch (Exception ex) {
			// Log the error
			RequestError error = new RequestError();
			error.setCode("123");
			error.setMessage("123");
			
			result.setSuccess(false);
			result.setBody(error);
		}
		
		return result;
	}
	
	public RequestResult update(PotentialEarning pe) {
		RequestResult result = new RequestResult();
		
		try {
			if(repository.contains(em, pe.getId())) {
				repository.update(em, pe);
				
				result.setSuccess(true);
				result.setBody(pe);
			} else {
				// Throw pe does not exists exception
				throw new Exception();
			}
		} catch (Exception ex) {
			// Log the error
			RequestError error = new RequestError();
			error.setCode("123");
			error.setMessage("123");
			
			result.setSuccess(false);
			result.setBody(error);
		}
		
		return result;
	}
	
	public RequestResult delete(String id) {
		RequestResult result = new RequestResult();
		
		try {
			int parsedId = Integer.parseInt(id);
			
			if(repository.contains(em, parsedId)) {
				repository.delete(em, repository.retrieveById(em, parsedId));
				result.setSuccess(true);
			} else {
				// Throw pe does not exists exception
				throw new Exception();
			}
			
		} catch (NumberFormatException ex) {
			// Log the error
			
			RequestError error = new RequestError();
			error.setCode("123");
			error.setMessage("123");
			
			result.setSuccess(false);
			result.setBody(error);
		} catch (Exception ex) {
			// Log the error
			RequestError error = new RequestError();
			error.setCode("123");
			error.setMessage("123");
			
			result.setSuccess(false);
			result.setBody(error);
		}
		
		return result;
	}
}
