package com.shoook.controller;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.shoook.entity.Menu;
import com.shoook.entity.RequestResult;
import com.shoook.entity.VendorRegister;
import com.shoook.service.StorageService;
import com.shoook.service.VendorService;

@RestController
@RequestMapping("/vendor")
public class VendorController {
	
	@Autowired
	private VendorService service;
	
	@Autowired
	private StorageService storageService;
	
	List<String> files = new ArrayList<String>();
	 
	@CrossOrigin
	@PostMapping("/uploadImage")
	public RequestResult handleFileUpload(
			@RequestParam("idFront") MultipartFile idFront,
			@RequestParam("idBack") MultipartFile idBack,
			@RequestParam("documents") MultipartFile documents[],
			@RequestParam("location") String location) {
		
		try {
			// Set and Get directories
			Path pathId = Paths.get("../src/assets/uploads/id/" + location);
			Path pathDocuments = Paths.get("../src/assets/uploads/documents/" + location);
			File directory = new File("../src/assets/uploads/id/" + location);
			if (!directory.exists()){
		        directory.mkdir();
		    }
			
			// Store Front ID
			storageService.store(idFront, pathId);
			files.add(idFront.getOriginalFilename());
			
			// Store Back ID
			storageService.store(idBack, pathId);
			files.add(idBack.getOriginalFilename());
			
			System.out.println("Documents:" + documents.length);  
			
			String message = "You successfully uploaded " + idFront.getOriginalFilename() + "!";
			RequestResult result = new RequestResult();
			result.setBody(message);
			result.setSuccess(true);
			return result;
		} catch (Exception e) {
			String message = "FAIL to upload " + file.getOriginalFilename() + "!";
			RequestResult result = new RequestResult();
			result.setBody(message);
			result.setSuccess(false);
			
			return result;
		}
	}
	@CrossOrigin
	@GetMapping(path = "get-menus", produces = MediaType.APPLICATION_JSON_VALUE)	
	public RequestResult retrieve() {
		return service.retrieve();
	}
	
	@CrossOrigin
    @GetMapping(path = "get-menu/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult retrieveById(@PathVariable(name = "id", required = true)String id) {
		return service.retrieveById(id);
	}
	
	@CrossOrigin
	@PostMapping(path = "create-vendor", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult create(@RequestBody VendorRegister data) {
		return service.create(data);
	}
	
	@CrossOrigin
    @PutMapping(path = "update-menu", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult update(@RequestBody Menu data) {
    	return service.update(data);
	}
	
	@CrossOrigin
    @DeleteMapping(path = "delete-menu/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult delete(@PathVariable(name = "id", required = true) String id) {
    	return service.delete(id);
	}
    
}