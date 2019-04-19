package com.shoook.service;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.shoook.entity.Vendor;
import com.shoook.entity.VendorBank;
import com.shoook.entity.VendorCompany;
import com.shoook.entity.VendorRegister;
import com.shoook.http.Message;
import com.shoook.http.RequestError;
import com.shoook.http.RequestResult;
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
			return error(Message.EXCEPTION, ex.getMessage());
		}
	}
	
	public RequestResult retrieveById(String id) {
		try {
			int parsedId = Integer.parseInt(id);
			
			if(repository.contains(em, parsedId)) {
				return result(repository.retrieveById(em, parsedId), true);
			} else {
				// Log the error
				return error(Message.VENDOR_ID_NOT_FOUND, Message.VENDOR_ID_NOT_FOUND_MESSAGE);
			}
			
		} catch (NumberFormatException ex) {
			// Log the error
			return error(Message.NUMBER_FORMAT_EXCEPTION, Message.NUMBER_FORMAT_EXCEPTION_MESSAGE);
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
		}
	}

	public RequestResult create(VendorRegister vendorRegister) {
		try {
			// Insert vendor
			Vendor vendor = vendorRegister.getVendor();
			
			String code = DigestUtils.md5Hex(vendor.getDateCreated().toString()).substring(0, 10);
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
				
				return result(new int[]{vendor.getId(), bank.getId()}, true);
			}	
			
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
		}
		
		return result(null, false);
	}
	
	public RequestResult approve(String id) {
		try {
			int parsedId = Integer.parseInt(id);
			
			if(repository.contains(em, parsedId)) {
				int result = repository.approve(em, parsedId);
				
				return result(result == 1, true);
			} else {
				// Log the error
				return error(Message.VENDOR_ID_NOT_FOUND, Message.VENDOR_ID_NOT_FOUND_MESSAGE);
			}
			
		} catch (NumberFormatException ex) {
			// Log the error
			return error(Message.NUMBER_FORMAT_EXCEPTION, Message.NUMBER_FORMAT_EXCEPTION_MESSAGE);
			
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
		}
	}
		
	public RequestResult update(Vendor pe) {
		try {
			if(repository.contains(em, pe.getId())) {
				repository.update(em, pe);

				return retrieve();
			} else {
				// Log the error
				return error(Message.VENDOR_ID_NOT_FOUND, Message.VENDOR_ID_NOT_FOUND_MESSAGE);
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
				Vendor vendor = repository.retrieveById(em, parsedId);
								
				if(vendor.getMenus().size() == 0) {
					List<VendorBank> banks = vendor.getVendorBanks();
					List<Integer> vendorBankIds = new ArrayList<Integer>();
					for(VendorBank bank : banks) {
						vendorBankIds.add(bank.getId());
					}
					
					repository.delete(em, vendor);
					return result(vendorBankIds, true);
				} else {
					// Log the error
					return error(Message.VENDOR_DELETE_ERROR, Message.VENDOR_DELETE_ERROR_MESSAGE);
				}
				
			} else {
				// Log the error
				return error(Message.VENDOR_ID_NOT_FOUND, Message.VENDOR_ID_NOT_FOUND_MESSAGE);
			}
			
		} catch (NumberFormatException ex) {
			// Log the error
			return error(Message.NUMBER_FORMAT_EXCEPTION, Message.NUMBER_FORMAT_EXCEPTION_MESSAGE);
			
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
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
			if (!directoryId.exists()){ directoryId.mkdirs(); }
			if (!directoryDocuments.exists()){ directoryDocuments.mkdirs(); }
			
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
	
	