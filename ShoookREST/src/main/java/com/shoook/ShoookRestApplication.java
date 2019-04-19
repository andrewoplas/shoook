package com.shoook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@SpringBootApplication
public class ShoookRestApplication extends SpringBootServletInitializer{
	
	public static void main(String[] args) {
      SpringApplication.run(ShoookRestApplication.class, args);
	}

	@Override
  	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
	  return builder.sources(ShoookRestApplication.class);
	}
}

