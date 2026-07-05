export type UserRole = "buyer" | "seller";
export type UserIntention = "buy" | "sell";

export type ShopCategory =
  | "Mode"
  | "Vintage"
  | "Bijoux"
  | "Déco"
  | "Accessoires"
  | "Créateurs"
  | "Friperie";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  buyerMode: boolean;
  sellerMode: boolean;
  shopIds: string[];
  activeShopId: string | null;
}

export interface Shop {
  id: string;
  slug: string;
  name: string;
  category: ShopCategory;
  description: string;
  location: string;
  rating: number;
  sales: number;
  followers: number;
  badge: string;
  coverImage: string;
  logoImage: string;
  accentColor: string;
  theme?: ShopTheme;
  verified: boolean;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  price: number;
  image: string;
  category: ShopCategory;
  size?: string;
  stock: number;
  condition: string;
  description: string;
  rating: number;
  reviewCount: number;
}

export type OrderStatus =
  | "payment_secured"
  | "seller_preparing"
  | "label_generated"
  | "shipped"
  | "in_transit"
  | "delivered"
  | "waiting_validation"
  | "validated"
  | "money_released";

export type PayoutStatus =
  | "pending_validation"
  | "available"
  | "transfer_requested"
  | "paid"
  | "on_hold";

export interface Order {
  id: string;
  productId: string;
  buyerName: string;
  sellerShopId: string;
  price: number;
  shipping: number;
  buyerProtection: number;
  total: number;
  status: OrderStatus;
  payoutStatus: PayoutStatus;
  shippingMethod: "relay" | "home";
  deadline?: string;
  createdAt: string;
}

export type ShopTheme = "light" | "dark";

export interface ShopPreset {
  id: string;
  name: string;
  coverImage: string;
  logoImage: string;
  accentColor: string;
  theme: ShopTheme;
}

export interface ShopDraft {
  name: string;
  description: string;
  category: ShopCategory;
  location: string;
  instagram: string;
  coverImage: string;
  logoImage: string;
  accentColor: string;
  theme: ShopTheme;
}

export type MissionCategory =
  | "products"
  | "sharing"
  | "shipping"
  | "reviews"
  | "messages";

export interface Mission {
  id: string;
  label: string;
  description: string;
  progress: number;
  total: number;
  completed: boolean;
  category: MissionCategory;
  rewardBadgeId?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export type DisputeReason =
  | "not_received"
  | "damaged"
  | "not_as_described"
  | "other";

export interface SellerStats {
  sales7d: number[];
  sales30d: number;
  conversionRate: number;
  avgShippingDays: number;
  validationRate: number;
  pendingBalance: number;
  availableBalance: number;
  ranking: { category: string; position: number; target: number };
}

export type FlowStepId =
  | "published"
  | "shared"
  | "ordered"
  | "label"
  | "shipped"
  | "validated"
  | "paid";

export interface FlowStep {
  id: FlowStepId;
  label: string;
}
