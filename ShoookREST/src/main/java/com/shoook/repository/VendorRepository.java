package com.shoook.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.shoook.entity.Vendor;
import com.shoook.entity.VendorBank;
import com.shoook.entity.VendorCompany;
import com.shoook.entity.VendorDTO;

@Repository
@Transactional
public class VendorRepository {
	
	public List<VendorDTO> retrieve(EntityManager em) {
		List<VendorDTO> data = new ArrayList<VendorDTO>();	
		
		StringBuilder sql = new StringBuilder("FROM VendorDTO");
		Query query = em.createQuery(sql.toString());
		List<?> results = query.getResultList();
		
		for(Object result: results) {
			data.add(VendorDTO.class.cast(result));
		}
		
		return data;
	}
	
	public int approve(EntityManager em, int parsedId) {
		StringBuilder stringQuery = new StringBuilder("UPDATE Vendor SET approved = :approved WHERE id = :vendorId");
		Query query = em.createQuery(stringQuery.toString());
		query.setParameter("approved", 1);
		query.setParameter("vendorId", parsedId);
		return query.executeUpdate();
	}
	
	public Vendor retrieveById(EntityManager em, int id) {
		Vendor vendor = em.find(Vendor.class, id);
		return vendor;
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
	
	public void update(EntityManager em, Vendor vendor) {
		em.merge(vendor);
	}
	
	public void delete(EntityManager em, Vendor vendor) {
		em.remove(vendor);
	}
	
	public boolean contains(EntityManager em, int id) {
		StringBuilder stringQuery = new StringBuilder("FROM Vendor WHERE id = :id");
		Query query = em.createQuery(stringQuery.toString());
		query.setParameter("id", id);
		
		return !query.getResultList().isEmpty();
	}


}
