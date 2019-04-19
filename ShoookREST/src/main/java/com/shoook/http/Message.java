package com.shoook.http;

public class Message {
	
	// General
	public static String EXCEPTION = "EXCEPTION";
	public static String EXCEPTION_MESSAGE = "An error occurs while logging you in. Please try again.";
	
	public static String NUMBER_FORMAT_EXCEPTION = "NUMBER_FORMAT_EXCEPTION";
	public static String NUMBER_FORMAT_EXCEPTION_MESSAGE = "ID of entity given does not exist. Please try again.";
	
	
	public static String PE_ID_NOT_FOUND = "ID_NOT_FOUND_EXCEPTION";
	public static String PE_ID_NOT_FOUND_MESSAGE = "ID of Potential Earning given does not exist.";
	
	public static String PE_ALREADY_EXISTS = "ALREADY_EXISTS_EXCEPTION";
	public static String PE_ALREADY_EXISTS_MESSAGE = "Potential Earning already exists. Please try a new one.";
	
	
	// Menu
	public static String MENU_ID_NOT_FOUND = "ID_NOT_FOUND_EXCEPTION";
	public static String MENU_ID_NOT_FOUND_MESSAGE = "ID of entity given does not exist.";
	
	public static String MENU_ALREADY_EXISTS = "ALREADY_EXISTS_EXCEPTION";
	public static String MENU_ALREADY_EXISTS_MESSAGE = "Menu already exists. Please try a new one.";
	
	
	// Vendor
	public static String VENDOR_ID_NOT_FOUND = "ID_NOT_FOUND_EXCEPTION";
	public static String VENDOR_ID_NOT_FOUND_MESSAGE = "ID of entity given does not exist.";
	
	public static String VENDOR_ALREADY_EXISTS = "ALREADY_EXISTS_EXCEPTION";
	public static String VENDOR_ALREADY_EXISTS_MESSAGE = "Menu already exists. Please try a new one.";
	
	public static String VENDOR_DELETE_ERROR = "VENDOR_HAS_MENU_EXCEPTION";
	public static String VENDOR_DELETE_ERROR_MESSAGE = "Vendor has an existing menus. Cannot delete the vendor.";
}
