package com.shoook.service;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.shoook.entity.Menu;
import com.shoook.entity.MenuSearch;
import com.shoook.entity.Vendor;
import com.shoook.entity.VendorDTO;
import com.shoook.http.Message;
import com.shoook.http.RequestError;
import com.shoook.http.RequestResult;
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
	

	public RequestResult search(MenuSearch data) {		
		if(data.getGuests() > 0) {
			return result(repository.search(em, data), true);
		} else {
			return result(repository.searchAll(em), true);
		}
	}
		
	public RequestResult retrieve() {
		try {
			return result(repository.retrieve(em), true);
			
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
		}
	}
	
	public RequestResult retrieveAdmin() {
		try {
			List<Menu> menusList = repository.retrieve(em);
			int length = menusList.size();			
			
			Menu[] menus = menusList.toArray(new Menu[menusList.size()]); 			
			for(int i=0; i<length; i++) {
				VendorDTO vendorDTO = new VendorDTO();
				Vendor vendor = menus[i].getVendor();
				vendorDTO.setFirstName(vendor.getFirstName());
				vendorDTO.setLastName(vendor.getLastName());
				
				menus[i].setVendorDTO(vendorDTO); 
			}
			
			return result(menus, true);
			
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
				return error(Message.MENU_ID_NOT_FOUND, Message.MENU_ID_NOT_FOUND_MESSAGE);
			}
			
		} catch (NumberFormatException ex) {
			// Log the error
			return error(Message.NUMBER_FORMAT_EXCEPTION, Message.NUMBER_FORMAT_EXCEPTION_MESSAGE);
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
		}
	}
	
	public RequestResult retrieveByIdAdmin(String id) {
		try {
			int parsedId = Integer.parseInt(id);
			
			if(repository.contains(em, parsedId)) {
				Menu menu = repository.retrieveById(em, parsedId);
				
				VendorDTO vendorDTO = new VendorDTO();
				Vendor vendor = menu.getVendor();
				vendorDTO.setId(vendor.getId());
				vendorDTO.setFirstName(vendor.getFirstName());
				vendorDTO.setLastName(vendor.getLastName());
				
				menu.setVendorDTO(vendorDTO); 
				
				return result(menu, true);
			} else {
				// Log the error
				return error(Message.MENU_ID_NOT_FOUND, Message.MENU_ID_NOT_FOUND_MESSAGE);
			}
			
		} catch (NumberFormatException ex) {
			// Log the error
			return error(Message.NUMBER_FORMAT_EXCEPTION, Message.NUMBER_FORMAT_EXCEPTION_MESSAGE);
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
		}
	}
	
	public RequestResult retrieveByVendor(String id) {
		try {
			int vendorID = Integer.parseInt(id);
			
			if(vendorRepository.contains(em, vendorID)) {
				return result(repository.retrieveByVendorId(em, vendorID), true);
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
	
	public RequestResult approve(String id) {
		try {
			int parsedId = Integer.parseInt(id);
			
			if(repository.contains(em, parsedId)) {
				int result = repository.approve(em, parsedId);
				
				return result(result == 1, true);
			} else {
				// Log the error
				return error(Message.MENU_ID_NOT_FOUND, Message.MENU_ID_NOT_FOUND_MESSAGE);
			}
			
		} catch (NumberFormatException ex) {
			// Log the error
			return error(Message.NUMBER_FORMAT_EXCEPTION, Message.NUMBER_FORMAT_EXCEPTION_MESSAGE);
			
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
		}
	}
		
	public RequestResult create(Menu menu) {
		try {			
			repository.create(em, menu);
			return result(menu, true);
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
		}
	}
		
	public RequestResult update(Menu pe) {
		try {
			if(repository.contains(em, pe.getId())) {
				repository.update(em, pe);

				return retrieve();
			} else {
				// Log the error
				return error(Message.MENU_ID_NOT_FOUND, Message.MENU_ID_NOT_FOUND_MESSAGE);
			}
			
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
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
//				File directory = new File("../uploads/menus/" + location);
//				if (directory.exists()){ FileUtils.deleteDirectory(directory); }
				return retrieveByVendor(vendorID);
			} else {
				// Log the error
				return error(Message.MENU_ID_NOT_FOUND, Message.MENU_ID_NOT_FOUND_MESSAGE);
			}
			
		} catch (NumberFormatException ex) {
			// Log the error
			return error(Message.NUMBER_FORMAT_EXCEPTION, Message.NUMBER_FORMAT_EXCEPTION_MESSAGE);
			
		} catch (Exception ex) {
			// Log the error
			return error(Message.EXCEPTION, ex.getMessage());
		}
	}
	
	public RequestResult uploadFile(MultipartFile[] images, String vendorID, String menuID) {
		try {			
			// Set and Get directories
			String location = DigestUtils.md5Hex(vendorID + menuID);
			Path pathDocuments = Paths.get("../uploads/menus/" + location);
			File directoryDocuments = new File("../uploads/menus/" + location);
			if (!directoryDocuments.exists()){ directoryDocuments.mkdirs(); }
			
			// Store Documents
			int counter = 0;
			for(MultipartFile image : images) {
				storageService.store(image, pathDocuments, location + (counter++) + ".jpg");
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
	
	