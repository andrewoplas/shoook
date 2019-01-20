package com.shoook.entity;

public class VendorRegister {
	private Vendor vendor;
	private VendorBank bank;
	private VendorCompany company;
	
	public VendorRegister() {
		
	}

	public Vendor getVendor() {
		return vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}

	public VendorBank getBank() {
		return bank;
	}

	public void setBank(VendorBank bank) {
		this.bank = bank;
	}

	public VendorCompany getCompany() {
		return company;
	}

	public void setCompany(VendorCompany company) {
		this.company = company;
	}
	
}
