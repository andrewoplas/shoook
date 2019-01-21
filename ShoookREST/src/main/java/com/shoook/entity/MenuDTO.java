package com.shoook.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Entity implementation class for Entity: MenuLite
 *
 */
@Entity
@Table(name="Menu")
public class MenuDTO implements Serializable {
	private static final long serialVersionUID = 1L;
   
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private int active;

	private int approved;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_created")
	private Date dateCreated;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_updated")
	private Date dateUpdated;

	private String desserts;

	private String dishes;

	private String locations;

	@Column(name="minimum_customers_required")
	private int minimumCustomersRequired;

	@Column(name="price_additional_dessert")
	private float priceAdditionalDessert;

	@Column(name="price_additional_lechon")
	private float priceAdditionalLechon;

	@Column(name="price_additional_menu")
	private float priceAdditionalMenu;

	@Column(name="price_four_main_course")
	private float priceFourMainCourse;

	@Column(name="specialty_description")
	private String specialtyDescription;

	@Column(name="style_of_cooking_description")
	private String styleOfCookingDescription;
	
	private String vendor;
	
	private String images;

	public MenuDTO() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getActive() {
		return this.active;
	}

	public void setActive(int active) {
		this.active = active;
	}

	public int getApproved() {
		return this.approved;
	}

	public void setApproved(int approved) {
		this.approved = approved;
	}

	public Date getDateCreated() {
		return this.dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public Date getDateUpdated() {
		return this.dateUpdated;
	}

	public void setDateUpdated(Date dateUpdated) {
		this.dateUpdated = dateUpdated;
	}

	public String getDesserts() {
		return this.desserts;
	}

	public void setDesserts(String desserts) {
		this.desserts = desserts;
	}

	public String getDishes() {
		return this.dishes;
	}

	public void setDishes(String dishes) {
		this.dishes = dishes;
	}

	public String getLocations() {
		return this.locations;
	}

	public void setLocations(String locations) {
		this.locations = locations;
	}

	public int getMinimumCustomersRequired() {
		return this.minimumCustomersRequired;
	}

	public void setMinimumCustomersRequired(int minimumCustomersRequired) {
		this.minimumCustomersRequired = minimumCustomersRequired;
	}

	public float getPriceAdditionalDessert() {
		return this.priceAdditionalDessert;
	}

	public void setPriceAdditionalDessert(float priceAdditionalDessert) {
		this.priceAdditionalDessert = priceAdditionalDessert;
	}

	public float getPriceAdditionalLechon() {
		return this.priceAdditionalLechon;
	}

	public void setPriceAdditionalLechon(float priceAdditionalLechon) {
		this.priceAdditionalLechon = priceAdditionalLechon;
	}

	public float getPriceAdditionalMenu() {
		return this.priceAdditionalMenu;
	}

	public void setPriceAdditionalMenu(float priceAdditionalMenu) {
		this.priceAdditionalMenu = priceAdditionalMenu;
	}

	public float getPriceFourMainCourse() {
		return this.priceFourMainCourse;
	}

	public void setPriceFourMainCourse(float priceFourMainCourse) {
		this.priceFourMainCourse = priceFourMainCourse;
	}

	public String getSpecialtyDescription() {
		return this.specialtyDescription;
	}

	public void setSpecialtyDescription(String specialtyDescription) {
		this.specialtyDescription = specialtyDescription;
	}

	public String getStyleOfCookingDescription() {
		return this.styleOfCookingDescription;
	}

	public void setStyleOfCookingDescription(String styleOfCookingDescription) {
		this.styleOfCookingDescription = styleOfCookingDescription;
	}

	public String getVendor() {
		return vendor;
	}

	public void setVendor(String vendor) {
		this.vendor = vendor;
	}

	public String getImages() {
		return images;
	}

	public void setImages(String images) {
		this.images = images;
	}
	
	
}
