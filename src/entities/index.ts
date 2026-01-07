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
  /** @wixFieldType datetime */
  publishDate?: Date | string;
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
  /** @wixFieldType date */
  dateIssued?: Date | string;
}


/**
 * Collection ID: users
 * Interface for Users
 */
export interface Users {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
}


/**
 * Collection ID: orders
 * Interface for Orders
 */
export interface Orders {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
}


/**
 * Collection ID: members
 * Interface for Members
 */
export interface Members {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
}


/**
 * Collection ID: communityposts
 * Interface for CommunityPosts
 */
export interface CommunityPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType reference */
  userid?: Users;
  /** @wixFieldType text */
  userId?: string;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType number */
  likes?: number;
  /** @wixFieldType number */
  replies?: number;
  /** @wixFieldType datetime */
  createdDate?: Date | string;
  /** @wixFieldType image */
  postImage?: string;
  /** @wixFieldType boolean */
  isResolved?: boolean;
}


/**
 * Collection ID: deliveryagents
 * Interface for DeliveryAgents
 */
export interface DeliveryAgents {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phone?: string;
  /** @wixFieldType text */
  vehicleType?: string;
  /** @wixFieldType text */
  vehiclePlateNumber?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType number */
  earnings?: number;
  /** @wixFieldType number */
  assignedOrdersCount?: number;
  /** @wixFieldType image */
  profilePicture?: string;
}


/**
 * Collection ID: deliverytracking
 * Interface for DeliveryTracking
 */
export interface DeliveryTracking {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  orderId?: string;
  /** @wixFieldType reference */
  orderid?: Orders;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType text */
  currentLocation?: string;
  /** @wixFieldType datetime */
  estimatedDelivery?: Date | string;
  /** @wixFieldType text */
  driverName?: string;
  /** @wixFieldType text */
  driverPhone?: string;
  /** @wixFieldType number */
  temperature?: number;
  /** @wixFieldType datetime */
  lastUpdate?: Date | string;
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
 * Collection ID: loyaltyprogram
 * Interface for LoyaltyProgram
 */
export interface LoyaltyProgram {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType reference */
  memberid?: Members;
  /** @wixFieldType text */
  memberId?: string;
  /** @wixFieldType number */
  pointsBalance?: number;
  /** @wixFieldType text */
  tier?: string;
  /** @wixFieldType number */
  totalSpent?: number;
  /** @wixFieldType datetime */
  joinDate?: Date | string;
  /** @wixFieldType datetime */
  lastRedeemDate?: Date | string;
  /** @wixFieldType text */
  tierBenefits?: string;
}


/**
 * Collection ID: notifications
 * Interface for Notifications
 */
export interface Notifications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  userId?: string;
  /** @wixFieldType text */
  type?: string;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  message?: string;
  /** @wixFieldType boolean */
  readStatus?: boolean;
  /** @wixFieldType datetime */
  creationDate?: Date | string;
}


/**
 * Collection ID: nutritioninfo
 * Interface for NutritionInfo
 */
export interface NutritionInfo {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType reference */
  productid?: Products;
  /** @wixFieldType text */
  productId?: string;
  /** @wixFieldType number */
  calories?: number;
  /** @wixFieldType number */
  protein?: number;
  /** @wixFieldType number */
  carbs?: number;
  /** @wixFieldType number */
  fat?: number;
  /** @wixFieldType number */
  fiber?: number;
  /** @wixFieldType text */
  vitamins?: string;
  /** @wixFieldType text */
  minerals?: string;
  /** @wixFieldType text */
  allergens?: string;
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
 * Collection ID: productreviews
 * Interface for ProductReviews
 */
export interface ProductReviews {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  productId?: string;
  /** @wixFieldType text */
  userId?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType text */
  reviewTitle?: string;
  /** @wixFieldType text */
  comment?: string;
  /** @wixFieldType datetime */
  creationDate?: Date | string;
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
  /** @wixFieldType multi_reference */
  recipes?: Recipes[];
}


/**
 * Collection ID: recipes
 * Interface for Recipes
 */
export interface Recipes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType multi_reference */
  productids?: Products[];
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  ingredients?: string;
  /** @wixFieldType text */
  instructions?: string;
  /** @wixFieldType number */
  prepTime?: number;
  /** @wixFieldType number */
  servings?: number;
  /** @wixFieldType text */
  difficulty?: string;
  /** @wixFieldType image */
  image?: string;
  /** @wixFieldType text */
  tags?: string;
}


/**
 * Collection ID: subscriptions
 * Interface for SubscriptionPlans
 */
export interface SubscriptionPlans {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  frequency?: string;
  /** @wixFieldType text */
  items?: string;
  /** @wixFieldType text */
  benefits?: string;
  /** @wixFieldType image */
  image?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
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
  /** @wixFieldType date */
  assignmentDate?: Date | string;
  /** @wixFieldType text */
  permissionsSummary?: string;
}


/**
 * Collection ID: wishlist
 * Interface for Wishlist
 */
export interface Wishlist {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  userId?: string;
  /** @wixFieldType text */
  productId?: string;
  /** @wixFieldType datetime */
  dateAdded?: Date | string;
  /** @wixFieldType number */
  quantity?: number;
  /** @wixFieldType text */
  notes?: string;
}
