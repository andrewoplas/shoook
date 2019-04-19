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

import com.shoook.entity.Menu;
import com.shoook.entity.MenuSearch;
import com.shoook.http.RequestResult;
import com.shoook.service.MenuService;

@RestController
@RequestMapping("/menu")
public class MenuController {
	
	@Autowired
	private MenuService service;
	
	@CrossOrigin
	@PostMapping("/uploadImage")
	public RequestResult handleFileUpload(
			@RequestParam("images") MultipartFile[] images,
			@RequestParam("vendorID") String vendorID,
			@RequestParam("menuID") String menuID
	) {
		return service.uploadFile(images, vendorID, menuID);		
	}
	
	@CrossOrigin
	@PostMapping(path = "search", produces = MediaType.APPLICATION_JSON_VALUE)	
	public RequestResult search(@RequestBody MenuSearch data) {
		return service.search(data);
	}
	
	@CrossOrigin
	@GetMapping(path = "get-menus", produces = MediaType.APPLICATION_JSON_VALUE)	
	public RequestResult retrieve() {
		return service.retrieve();
	}
	
	@CrossOrigin
	@GetMapping(path = "get-menus-admin", produces = MediaType.APPLICATION_JSON_VALUE)	
	public RequestResult retrieveAdmin() {
		return service.retrieveAdmin();
	}
	
	@CrossOrigin
    @GetMapping(path = "get-menu/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult retrieveById(@PathVariable(name = "id", required = true)String id) {
		return service.retrieveById(id);
	}
	
	@CrossOrigin
    @GetMapping(path = "get-menu-admin/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult retrieveByIdAdmin(@PathVariable(name = "id", required = true)String id) {
		return service.retrieveByIdAdmin(id);
	}
	
	@CrossOrigin
    @GetMapping(path = "get-menu-vendor/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult retrieveByVendor(@PathVariable(name = "id", required = true)String id) {
		return service.retrieveByVendor(id);
	}
	
	@CrossOrigin
	@PostMapping(path = "approve", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult approve(@RequestBody String id) {
		return service.approve(id);
	}
	
	@CrossOrigin
	@PostMapping(path = "create-menu", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult create(@RequestBody Menu data) {		
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