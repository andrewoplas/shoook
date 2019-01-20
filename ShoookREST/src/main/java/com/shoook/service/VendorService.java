package com.shoook.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoook.entity.Menu;
import com.shoook.entity.RequestError;
import com.shoook.entity.RequestResult;
import com.shoook.entity.Vendor;
import com.shoook.entity.VendorBank;
import com.shoook.entity.VendorCompany;
import com.shoook.entity.VendorRegister;
import com.shoook.repository.VendorRepository;

@Service
public class VendorService {
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private VendorRepository repository;
		

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
		
	public RequestResult create(VendorRegister vendorRegister) {
		try {
			
			// Insert vendor
			String code = "test";
			Vendor vendor = vendorRegister.getVendor();
			vendor.setCode(code);
			repository.create(em, vendor);
			
			if(vendor.getId() > 0) {
				VendorBank bank = vendorRegister.getBank();
				bank.setVendor(vendor);
				repository.createVendorBank(em, bank);
				
				VendorCompany company = vendorRegister.getCompany();
				company.setVendor(vendor);
				repository.createVendorCompany(em, company);
			}	
			
			return result(vendor.getId(), true);
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
	
	