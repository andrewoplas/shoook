package com.shoook.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.shoook.entity.Menu;
import com.shoook.entity.MenuDTO;
import com.shoook.entity.Vendor;
import com.shoook.entity.VendorBank;
import com.shoook.entity.VendorCompany;

@Repository
@Transactional
public class VendorRepository {
	
	public List<MenuDTO> retrieve(EntityManager em) {
		List<MenuDTO> data = new ArrayList<MenuDTO>();	
		
		StringBuilder sql = new StringBuilder("FROM MenuDTO");
		Query query = em.createQuery(sql.toString());
		List<?> results = query.getResultList();
		
		for(Object result: results) {
			data.add(MenuDTO.class.cast(result));
		}
		
		return data;
	}
	
	public Menu retrieveById(EntityManager em, int id) {
		Menu menu = em.find(Menu.class, id);
		return menu;
	}
	
	public MenuDTO retrieveByIdDTO(EntityManager em, int id) {
		MenuDTO menu = em.find(MenuDTO.class, id);
		return menu;
	}
	
	public void create(EntityManager em, Vendor vendor) {
		em.persist(vendor);
		em.flush();
	}
	
	public void createVendorBank(EntityManager em, VendorBank bank) {
		em.persist(bank);
		em.flush();
	}
	
	public void createVendorCompany(EntityManager em, VendorCompany company) {
		em.persist(company);
		em.flush();
	}
	
	public void update(EntityManager em, Menu menu) {
		em.merge(menu);
	}
	
	public void delete(EntityManager em, Menu menu) {
		em.remove(menu);
	}
	
	public boolean contains(EntityManager em, int id) {
		StringBuilder stringQuery = new StringBuilder("FROM Menu WHERE id = :id");
		Query query = em.createQuery(stringQuery.toString());
		query.setParameter("id", id);
		
		return !query.getResultList().isEmpty();
	}
}
