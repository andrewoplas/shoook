package com.shoook.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.shoook.entity.Menu;
import com.shoook.entity.MenuDTO;
import com.shoook.entity.MenuSearch;

@Repository
@Transactional
public class MenuRepository {
	
	public int approve(EntityManager em, int parsedId) {
		StringBuilder stringQuery = new StringBuilder("UPDATE Menu SET approved = :approved WHERE id = :menuID");
		Query query = em.createQuery(stringQuery.toString());
		query.setParameter("approved", 1);
		query.setParameter("menuID", parsedId);
		return query.executeUpdate();
	}
	
	public List<Menu> retrieve(EntityManager em) {
		List<Menu> data = new ArrayList<Menu>();	
		
		StringBuilder sql = new StringBuilder("FROM Menu");
		Query query = em.createQuery(sql.toString());
		List<?> results = query.getResultList();
		
		for(Object result: results) {
			data.add(Menu.class.cast(result));
		}
		
		return data;
	}
	
	public List<Menu> retrieveByVendorId(EntityManager em, int vendorID) {
		List<Menu> data = new ArrayList<Menu>();	
		
		StringBuilder sql = new StringBuilder("FROM Menu WHERE vendor_id = :vendor_id");		
		Query query = em.createQuery(sql.toString());
		query.setParameter("vendor_id", vendorID);
		List<?> results = query.getResultList();
		
		for(Object result: results) {
			data.add(Menu.class.cast(result));
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
	
	public void create(EntityManager em, Menu menu) {
		em.persist(menu);
		em.flush();
	}
	
	public void update(EntityManager em, Menu menu) {
		em.merge(menu);
	}
	
	public void delete(EntityManager em, Menu menu) {
		em.remove(menu);
	}
	
	public boolean updateImageFileName(EntityManager em, int menuID, String fileNames) {
		StringBuilder stringQuery = new StringBuilder("UPDATE Menu SET images = :images WHERE id = :id");
		Query query = em.createQuery(stringQuery.toString());
		query.setParameter("id", menuID);
		query.setParameter("images", fileNames);
		int count = query.executeUpdate();
		
		return count > 0;
	}
	
	public boolean contains(EntityManager em, int id) {
		StringBuilder stringQuery = new StringBuilder("FROM Menu WHERE id = :id");
		Query query = em.createQuery(stringQuery.toString());
		query.setParameter("id", id);
		
		return !query.getResultList().isEmpty();
	}

	public List<MenuDTO> search(EntityManager em, MenuSearch menu) {
		List<MenuDTO> data = new ArrayList<MenuDTO>();	
		
		StringBuilder sql = new StringBuilder("FROM MenuDTO WHERE minimum_customers_required = :guests AND locations LIKE CONCAT('%',:locations,'%') AND active = :active AND approved = :approved");		
		Query query = em.createQuery(sql.toString());
		query.setParameter("guests", menu.getGuests());
		query.setParameter("locations", menu.getLocation());
		query.setParameter("active", 1);
		query.setParameter("approved", 1);
		
		List<?> results = query.getResultList();
		
		for(Object result: results) {
			data.add(MenuDTO.class.cast(result));
		}
		
		return data;
	}
	
	public List<MenuDTO> searchAll(EntityManager em) {
		List<MenuDTO> data = new ArrayList<MenuDTO>();	
		
		StringBuilder sql = new StringBuilder("FROM MenuDTO WHERE active = :active AND approved = :approved");		
		Query query = em.createQuery(sql.toString());
		query.setParameter("active", 1);
		query.setParameter("approved", 1);
		
		List<?> results = query.getResultList();
		
		for(Object result: results) {
			data.add(MenuDTO.class.cast(result));
		}
		
		return data;
	}
}
