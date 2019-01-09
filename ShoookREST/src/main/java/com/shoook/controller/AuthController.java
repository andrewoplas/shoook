package com.shoook.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shoook.entity.RequestResult;
import com.shoook.entity.UserLogin;
import com.shoook.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthService service;
		
	@CrossOrigin
	@PostMapping(path = "login", produces = MediaType.APPLICATION_JSON_VALUE)
	public RequestResult login(@RequestBody UserLogin user) {
		return service.login(user);
	}
}















