interface MenuImage{
    id: number;
    menu_id: number;
    path: string;
}

export interface Menu {
    id: number;
    vendor: number;
    minimumCustomersRequired: number;
    priceFourMainCourse: number;
    priceAdditionalDessert: number;
    priceAdditionalMenu: number;
    priceAdditionalLechon: number;
    dishes: string;
    desserts: string;
    locations: string;
    styleOfCookingDescription: string;
    specialtyDescription: string;
    active: number;
    approved: number;
    dateCreated: Date;
    dateUpdated: Date;
}


    
    
    
    
	
	
	
	
	
	
	
	
	
	
	