/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: blogposts
 * Interface for BlogPosts
 */
export interface BlogPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType image */
  featuredImage?: string;
  /** @wixFieldType text */
  excerpt?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType datetime @format {$date: "ISO_STRING"} (e.g., {$date: "2024-03-10T00:00:00Z"}) */
  publishDate?: { $date: string };
}


/**
 * Collection ID: certifications
 * Interface for Certifications
 */
export interface Certifications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType image */
  logo?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  issuingBody?: string;
  /** @wixFieldType url */
  certificationUrl?: string;
  /** @wixFieldType date @format YYYY-MM-DD */
  dateIssued?: string;
}


/**
 * Collection ID: farmerprofiles
 * Interface for FarmerProfiles
 */
export interface FarmerProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType image */
  photo?: string;
  /** @wixFieldType text */
  biography?: string;
  /** @wixFieldType text */
  farmName?: string;
  /** @wixFieldType text */
  specialty?: string;
  /** @wixFieldType text */
  location?: string;
}


/**
 * Collection ID: productcategories
 * Interface for ProductCategories
 */
export interface ProductCategories {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType image */
  categoryImage?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: products
 * Interface for Products
 */
export interface Products {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType boolean */
  isSeasonal?: boolean;
}


/**
 * Collection ID: trustbadges
 * Interface for TrustBadges
 */
export interface TrustBadges {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  icon?: string;
  /** @wixFieldType url */
  linkUrl?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: userroles
 * Interface for UserRoles
 */
export interface UserRoles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  roleType?: string;
  /** @wixFieldType text */
  memberId?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
  /** @wixFieldType date @format YYYY-MM-DD */
  assignmentDate?: string;
  /** @wixFieldType text */
  permissionsSummary?: string;
}


/**
 * Collection ID: userroles
 * Interface for UserRoles
 */
export interface UserRoles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  roleType?: string;
  /** @wixFieldType text */
  memberId?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
  /** @wixFieldType date @format YYYY-MM-DD */
  assignmentDate?: string;
  /** @wixFieldType text */
  permissionsSummary?: string;
}
