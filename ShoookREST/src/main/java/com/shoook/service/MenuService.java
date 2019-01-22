package com.shoook.service;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.shoook.entity.Menu;
import com.shoook.entity.RequestError;
import com.shoook.entity.RequestResult;
import com.shoook.repository.MenuRepository;
import com.shoook.repository.VendorRepository;

@Service
public class MenuService {
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private MenuRepository repository;
	
	@Autowired
	private VendorRepository vendorRepository;
	
	@Autowired
	private StorageService storageService;
		

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
	
	public RequestResult retrieveByVendor(String id) {
		try {
			int vendorID = Integer.parseInt(id);
			
			if(vendorRepository.contains(em, vendorID)) {
				return result(repository.retrieve(em, vendorID), true);
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
			return result(menu, true);
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
		
	public RequestResult delete(String menuID) {
		try {
			int parsedId = Integer.parseInt(menuID);
			Menu menu = repository.retrieveById(em, parsedId);
			
			if(repository.contains(em, parsedId)) {
				String vendorID = Integer.toString(menu.getVendor().getId());
				String location = DigestUtils.md5Hex(vendorID + menuID);
				
				repository.delete(em, menu);
				
				// Set and Delete it
				File directory = new File("../uploads/menus/" + location);
				if (directory.exists()){ FileUtils.deleteDirectory(directory); }
				
				return retrieveByVendor(vendorID);
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
	
	public RequestResult uploadFile(MultipartFile[] images, String vendorID, String menuID) {
		try {			
			// Set and Get directories
			String location = DigestUtils.md5Hex(vendorID + menuID);
			Path pathDocuments = Paths.get("../uploads/menus/" + location);
			File directoryDocuments = new File("../uploads/menus/" + location);
			if (!directoryDocuments.exists()){ directoryDocuments.mkdir(); }
			
			// Store Documents
			int counter = 0;
			for(MultipartFile image : images) {
				storageService.store(image, pathDocuments, (counter++) + ".jpg");
		    }
			
			String imageFilenames =  location + "," + images.length;
			boolean result = repository.updateImageFileName(em, Integer.parseInt(menuID), imageFilenames);
			
			return result(null, result);
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
	
	