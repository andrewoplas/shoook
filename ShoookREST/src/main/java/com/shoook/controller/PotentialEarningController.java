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
import org.springframework.web.bind.annotation.RestController;

import com.shoook.entity.PotentialEarning;
import com.shoook.entity.RequestResult;
import com.shoook.service.PotentialEarningService;

@RestController
@RequestMapping("/potential-earning")
public class PotentialEarningController {
	
	@Autowired
	private PotentialEarningService service;
	
	@CrossOrigin
	@GetMapping(path = "get-potential-earnings", produces = MediaType.APPLICATION_JSON_VALUE)	
	public RequestResult retrieve() {
		return service.retrieve();
	}
	
    @GetMapping(path = "get-potential-earning/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult retrieveById(@PathVariable(name = "id", required = true)String id) {
		return service.retrieveById(id);
	}
	
	@PostMapping(path = "create-potential-earning", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult create(@RequestBody PotentialEarning data) {
		return service.create(data);
	}
	
    @PutMapping(path = "update-potential-earning", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult update(@RequestBody PotentialEarning data) {
    	return service.update(data);
	}
	
    @DeleteMapping(path = "delete-potential-earning/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult delete(@PathVariable(name = "id", required = true) String id) {
    	return service.delete(id);
	}
    
}