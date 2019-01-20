package com.shoook;

import javax.annotation.Resource;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.shoook.service.StorageService;

@SpringBootApplication
public class ShoookRestApplication{	

	public static void main(String[] args) {
		SpringApplication.run(ShoookRestApplication.class, args);
	}
}

