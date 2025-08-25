// types/types.ts
export interface Image {
  image_url: string;
}

export interface Property {
  property_id: number;
  host_id: number;
  property_type_id: number;
  town_id: number;
  title: string;
  property_description: string;
  address: string;
  property_latitude: number;
  property_longitude: number;
  bedrooms?: number;
  bathrooms?: number;
  max_guests?: number;
  base_price: number;
  cleaning_fee: number;
  security_deposit: number;
  is_active: boolean;
  min_stay_nights: number;
  max_stay_nights: number;
  property_created_at: string;
  property_updated_at: string;

  // Location data
  town_id_actual: number;
  town_name: string;
  city_id: number;
  town_created_at: string;

  city_id_actual: number;
  city_name: string;
  country_id: number;
  city_latitude: number;
  city_longitude: number;
  city_description: string;
  city_created_at: string;

  country_id_actual: number;
  country_name: string;
  country_code: string;
  country_created_at: string;

  // Legacy fields (if you need backwards compatibility)
  images?: Image[];
  amenities?: string[];
}

export interface Host {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
}

export interface BlockedDate {
  id: number;
  property_id: number;
  blocked_date: string;
  reason?: string;
}

export interface Review {
  reviewer_id: number;
  rating: number;
  title: string;
  comment: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
}

export interface Amenity {
  name: string;
  icon: string;
}

export interface PropertyData {
  property: Property | null;
  host: Host | null;
  blockedDates: BlockedDate[];
  reviews: Review[];
  amenities: Amenity[];
  images: Image[];
  metadata: {
    totalReviews: number;
    averageRating: number;
  };
}

export interface Booking {
  property_id: number | undefined;
  host_id: number | undefined;
  guest_id: number | undefined;
  check_in_date: Date | null;
  check_out_date: Date | null;
  total_price: number | undefined;
  amount_of_nights: number | null;
}

export interface fullPropertyData {
  address: string | null;
  base_price: string | null;
  bathrooms: string | null;
  bedrooms: number | null;
  created_at: string | null;
  description: string | null;
  host_id: number | null;
  id: number | null;
  latitude: string | null;
  longitude: string | null;
  max_guests: number | null;
  property_type_id: number | null;
  title: string | null;
  town_id: number | null;
  updated_at: string | null;
}
