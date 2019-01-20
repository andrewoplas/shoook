package com.shoook.service;

import java.nio.file.Files;
import java.nio.file.Path;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
 
@Service
public class StorageService {
 
	Logger log = LoggerFactory.getLogger(this.getClass().getName());
 
	public void store(MultipartFile file, Path rootLocation) {
		try {
			Files.copy(file.getInputStream(), rootLocation.resolve(file.getOriginalFilename()));
		} catch (Exception e) {
			throw new RuntimeException("FAIL!");
		}
	}
}