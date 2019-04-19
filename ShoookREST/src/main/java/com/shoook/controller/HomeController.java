package com.shoook.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/")
public class HomeController {
		
	@RequestMapping(method = RequestMethod.GET)
	public String retrieve() {
		return "Hellow World";
	}
}