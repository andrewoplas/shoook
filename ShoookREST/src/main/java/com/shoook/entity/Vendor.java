package com.shoook.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonManagedReference;


/**
 * The persistent class for the vendor database table.
 * 
 */
@Entity
@Table(name="vendor")
@NamedQuery(name="Vendor.findAll", query="SELECT v FROM Vendor v")
public class Vendor implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private int approved;

	private String barangay;

	private String city;

	private String code;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_created")
	private Date dateCreated;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_updated")
	private Date dateUpdated;

	@Column(name="email_address")
	private String emailAddress;

	@Column(name="first_name")
	private String firstName;

	@Column(name="last_name")
	private String lastName;

	@Column(name="phone_number")
	private String phoneNumber;

	private String region;
	
	private String password;

	//bi-directional many-to-one association to Menu	
	@OneToMany(mappedBy="vendor")
	@JsonManagedReference
	private List<Menu> menus;

	//bi-directional many-to-one association to VendorBank
	@OneToMany(mappedBy="vendor")
	@JsonManagedReference
	private List<VendorBank> vendorBanks;

	//bi-directional many-to-one association to VendorCompany
	@OneToMany(mappedBy="vendor")
	@JsonManagedReference
	private List<VendorCompany> vendorCompanies;

	public Vendor() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getApproved() {
		return this.approved;
	}

	public void setApproved(int approved) {
		this.approved = approved;
	}

	public String getBarangay() {
		return this.barangay;
	}

	public void setBarangay(String barangay) {
		this.barangay = barangay;
	}

	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
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

	public String getEmailAddress() {
		return this.emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhoneNumber() {
		return this.phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getRegion() {
		return this.region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public List<Menu> getMenus() {
		return this.menus;
	}

	public void setMenus(List<Menu> menus) {
		this.menus = menus;
	}

	public Menu addMenus(Menu menus) {
		getMenus().add(menus);
		menus.setVendor(this);

		return menus;
	}

	public Menu removeMenus(Menu menus) {
		getMenus().remove(menus);
		menus.setVendor(null);

		return menus;
	}

	public List<VendorBank> getVendorBanks() {
		return this.vendorBanks;
	}

	public void setVendorBanks(List<VendorBank> vendorBanks) {
		this.vendorBanks = vendorBanks;
	}

	public VendorBank addVendorBank(VendorBank vendorBank) {
		getVendorBanks().add(vendorBank);
		vendorBank.setVendor(this);

		return vendorBank;
	}

	public VendorBank removeVendorBank(VendorBank vendorBank) {
		getVendorBanks().remove(vendorBank);
		vendorBank.setVendor(null);

		return vendorBank;
	}

	public List<VendorCompany> getVendorCompanies() {
		return this.vendorCompanies;
	}

	public void setVendorCompanies(List<VendorCompany> vendorCompanies) {
		this.vendorCompanies = vendorCompanies;
	}

	public VendorCompany addVendorCompany(VendorCompany vendorCompany) {
		getVendorCompanies().add(vendorCompany);
		vendorCompany.setVendor(this);

		return vendorCompany;
	}

	public VendorCompany removeVendorCompany(VendorCompany vendorCompany) {
		getVendorCompanies().remove(vendorCompany);
		vendorCompany.setVendor(null);

		return vendorCompany;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}