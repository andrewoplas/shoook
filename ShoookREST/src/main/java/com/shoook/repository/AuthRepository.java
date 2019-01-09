package com.shoook.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.shoook.entity.UserLogin;
import com.shoook.entity.UserLoginResponse;
import com.shoook.entity.Vendor;

@Repository
@Transactional
public class AuthRepository {
	private int ADMIN = 0;
	private int VENDOR = 1;
	private int CUSTOMER = 2;
		
	
	public UserLoginResponse loginAdmin(EntityManager em, UserLogin user) {
		UserLoginResponse ulr = null;
		StringBuilder stringQuery = new StringBuilder("FROM Admin WHERE username = :username AND password = :password");
		Query query = em.createQuery(stringQuery.toString());
		query.setParameter("username", user.getUsername());
		query.setParameter("password", user.getPassword());
		List<Vendor> results = query.getResultList();
		
		if(results.size() == 1) {
			//vendor = results.get(0);
		}
				
		return ulr; 
	}
		
	public UserLoginResponse loginVendor(EntityManager em, UserLogin user) {
		UserLoginResponse ulr = null;
		StringBuilder stringQuery = new StringBuilder("FROM Vendor WHERE username = :username AND password = :password");
		Query query = em.createQuery(stringQuery.toString());
		query.setParameter("username", user.getUsername());
		query.setParameter("password", user.getPassword());
		List<Vendor> results = query.getResultList();
		
		if(results.size() == 1) {
			ulr = new UserLoginResponse();
			ulr.setId(results.get(0).getId());
			ulr.setRole(VENDOR);
		}
				
		return ulr; 
	}
	
	public UserLoginResponse loginCustomer(EntityManager em, UserLogin user) {
		UserLoginResponse ulr = null;
		StringBuilder stringQuery = new StringBuilder("FROM Customer WHERE username = :username AND password = :password");
		Query query = em.createQuery(stringQuery.toString());
		query.setParameter("username", user.getUsername());
		query.setParameter("password", user.getPassword());
		List<Vendor> results = query.getResultList();
		
		if(results.size() == 1) {
			//vendor = results.get(0);
		}
				
		return ulr; 
	}
}
