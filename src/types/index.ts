export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  image: string;
  featured?: boolean;
  offers?: string[];
  tags: string[];
  veg: boolean;
  totalRatings?: number;
  isPremium?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  veg: boolean;
  rating?: number;
  numRatings?: number;
  bestseller?: boolean;
  isPremium?: boolean; // Added premium flag for menu items
}

export interface RestaurantDetails extends Restaurant {
  location: string;
  items: MenuItem[];
}