package com.shoook.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.shoook.entity.PotentialEarning;

@Repository
public class PotentialEarningRepository {
	
	public List<PotentialEarning> retrieve(EntityManager em) {
		List<PotentialEarning> data = null;	
		StringBuilder sql = new StringBuilder("FROM PotentialEarning");
		Query query = em.createQuery(sql.toString());
		data = query.getResultList();		
		
		return data;
	}
	
	public PotentialEarning retrieveById(EntityManager em, int id) {
		PotentialEarning potentialEarning = em.find(PotentialEarning.class, id);
		return potentialEarning;
	}
	
	public PotentialEarning create(EntityManager em, PotentialEarning potentialEarning) {
		em.persist(potentialEarning);
		em.flush();
		
		return potentialEarning;
	}
	
	public void update(EntityManager em, PotentialEarning pe) {
		em.merge(pe);
	}
	
	public void delete(EntityManager em, PotentialEarning pe) {
		em.remove(pe);
	}
	
	public boolean contains(EntityManager em, int id) {
		StringBuilder stringQuery = new StringBuilder("FROM PotentialEarning WHERE id = :id");
		Query query = em.createQuery(stringQuery.toString());
		query.setParameter("id", id);
		
		return !query.getResultList().isEmpty();
	}
	
	public boolean contains(EntityManager em, PotentialEarning pe) {
		StringBuilder stringQuery = new StringBuilder("FROM PotentialEarning WHERE place = :place AND type = :type AND earnings = :earnings");
		Query query = em.createQuery(stringQuery.toString());
		query.setParameter("place", pe.getPlace());
		query.setParameter("type", pe.getType());
		query.setParameter("earnings", pe.getEarnings());
		
		return !query.getResultList().isEmpty();
	}
}
