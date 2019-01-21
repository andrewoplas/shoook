package com.shoook.service;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.apache.commons.codec.digest.DigestUtils;

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
	private StorageService storageService;
	
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
			Vendor vendor = vendorRegister.getVendor();
			
			String code = DigestUtils.md5Hex(vendor.getLastName() + vendor.getUsername() + vendor.getDateCreated().toString()).substring(0, 10);
			vendor.setCode(code);
			vendor.setPassword(DigestUtils.md5Hex(vendor.getPassword()));
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

	public RequestResult uploadFile(MultipartFile idFront, MultipartFile idBack, MultipartFile[] documents, String location) {
		try {
			// Set and Get directories
			location = DigestUtils.md5Hex(location);
			Path pathId = Paths.get("../uploads/id/" + location);
			Path pathDocuments = Paths.get("../uploads/documents/" + location);
			File directoryId = new File("../uploads/id/" + location);
			File directoryDocuments = new File("../uploads/documents/" + location);
			if (!directoryId.exists()){ directoryId.mkdir(); }
			if (!directoryDocuments.exists()){ directoryDocuments.mkdir(); }
			
			System.out.println("LOCATION:  " + location);
			
			// Store Front ID
			storageService.store(idFront, pathId, "front.jpg");
			
			// Store Back ID
			storageService.store(idBack, pathId, "back.jpg");
			
			// Store Documents
			for(MultipartFile document : documents) {
				storageService.store(document, pathDocuments, document.getOriginalFilename());
		    }
			
			return result(null, true);
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
	
	