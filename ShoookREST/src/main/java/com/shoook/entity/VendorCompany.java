package com.shoook.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;


/**
 * The persistent class for the vendor_company database table.
 * 
 */
@Entity
@Table(name="vendor_company")
@NamedQuery(name="VendorCompany.findAll", query="SELECT v FROM VendorCompany v")
public class VendorCompany implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="account_type")
	private String accountType;

	private String address;

	@Column(name="business_no")
	private String businessNo;

	private String country;

	private String name;

	@Column(name="person_in_charge")
	private String personInCharge;

	@Column(name="postal_code")
	private int postalCode;

	@Column(name="seller_vat")
	private String sellerVat;

	@Column(name="vat_registered")
	private int vatRegistered;

	//bi-directional many-to-one association to Vendor
	@ManyToOne
	@JsonBackReference
	private Vendor vendor;

	public VendorCompany() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBusinessNo() {
		return this.businessNo;
	}

	public void setBusinessNo(String businessNo) {
		this.businessNo = businessNo;
	}

	public String getCountry() {
		return this.country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPersonInCharge() {
		return this.personInCharge;
	}

	public void setPersonInCharge(String personInCharge) {
		this.personInCharge = personInCharge;
	}

	public int getPostalCode() {
		return this.postalCode;
	}

	public void setPostalCode(int postalCode) {
		this.postalCode = postalCode;
	}

	public String getSellerVat() {
		return this.sellerVat;
	}

	public void setSellerVat(String sellerVat) {
		this.sellerVat = sellerVat;
	}

	public int getVatRegistered() {
		return this.vatRegistered;
	}

	public void setVatRegistered(int vatRegistered) {
		this.vatRegistered = vatRegistered;
	}

	public Vendor getVendor() {
		return this.vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}
	
	public String getAccountType() {
		return this.accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

}