package com.shoook.controller;
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

import com.shoook.entity.RequestResult;
import com.shoook.entity.Vendor;
import com.shoook.entity.VendorRegister;
import com.shoook.service.VendorService;

@RestController
@RequestMapping("/vendor")
public class VendorController {
	
	@Autowired
	private VendorService service;
	
	@CrossOrigin
	@PostMapping("/uploadImage")
	public RequestResult handleFileUpload(
			@RequestParam("idFront") MultipartFile idFront,
			@RequestParam("idBack") MultipartFile idBack,
			@RequestParam("documents") MultipartFile[] documents,
			@RequestParam("location") String location) 
	{
		return service.uploadFile(idFront, idBack, documents, location);		
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
    @PutMapping(path = "update-vendor", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult update(@RequestBody Vendor data) {
    	return service.update(data);
	}
	
	@CrossOrigin
    @DeleteMapping(path = "delete-vendor/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult delete(@PathVariable(name = "id", required = true) String id) {
    	return service.delete(id);
	}
    
}