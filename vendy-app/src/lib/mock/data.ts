import type {
  Badge,
  Mission,
  Order,
  Product,
  SellerStats,
  Shop,
  ShopDraft,
  ShopPreset,
  User,
} from "@/types/vendy";

export const CURRENT_USER: User = {
  id: "user-lina",
  name: "Lina Martin",
  email: "lina@vendy.demo",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  buyerMode: true,
  sellerMode: false,
  shopIds: [],
  activeShopId: null,
};

export const SHOPS: Shop[] = [
  {
    id: "shop-lina",
    slug: "lina-studio",
    name: "Lina Studio",
    category: "Mode",
    description: "Streetwear minimal en petites séries, pensé à Paris.",
    location: "Paris, France",
    rating: 4.8,
    sales: 128,
    followers: 2400,
    badge: "Boutique en essor",
    coverImage:
      "https://images.unsplash.com/photo-1441986300917-6466bd776608?w=800&h=600&fit=crop",
    logoImage:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=200&h=200&fit=crop",
    accentColor: "#F04465",
    verified: true,
  },
  {
    id: "shop-pascale",
    slug: "atelier-pascale",
    name: "Atelier Pascale",
    category: "Déco",
    description: "Céramique artisanale et objets faits main.",
    location: "Collobrières, France",
    rating: 4.9,
    sales: 54,
    followers: 820,
    badge: "Boutique vérifiée",
    coverImage:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
    logoImage:
      "https://images.unsplash.com/photo-1578749556568-bc9041751654?w=200&h=200&fit=crop",
    accentColor: "#F04465",
    verified: true,
  },
  {
    id: "shop-nori",
    slug: "studio-nori",
    name: "Studio Nori",
    category: "Déco",
    description: "Déco & céramique minimaliste, petites séries.",
    location: "Marseille, France",
    rating: 4.8,
    sales: 91,
    followers: 1700,
    badge: "Nouvelle boutique",
    coverImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop",
    logoImage:
      "https://images.unsplash.com/photo-1610701596007-de9036c4c1c8?w=200&h=200&fit=crop",
    accentColor: "#F04465",
    verified: false,
  },
  {
    id: "shop-retro",
    slug: "maison-retro",
    name: "Maison Retro",
    category: "Vintage",
    description: "Vintage sélectionné : vestes, denim et pièces rares.",
    location: "Lyon, France",
    rating: 4.9,
    sales: 342,
    followers: 6100,
    badge: "Top Vintage",
    coverImage:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop",
    logoImage:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    accentColor: "#F04465",
    verified: true,
  },
  {
    id: "shop-bijoux",
    slug: "atelier-lune",
    name: "Atelier Lune",
    category: "Bijoux",
    description: "Bijoux fins faits main, argent et pierres naturelles.",
    location: "Lyon, France",
    rating: 4.7,
    sales: 67,
    followers: 940,
    badge: "Créateur",
    coverImage:
      "https://images.unsplash.com/photo-1617039220298-2767a4a1a10a?w=800&h=600&fit=crop",
    logoImage:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop",
    accentColor: "#F04465",
    verified: true,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-hoodie",
    shopId: "shop-lina",
    name: "Sweat oversized graphique",
    price: 64,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop",
    category: "Mode",
    size: "L",
    stock: 4,
    condition: "Neuf",
    description:
      "Sweat oversize au design graphique unique, confortable et facile à porter au quotidien.",
    rating: 4.8,
    reviewCount: 12,
  },
  {
    id: "prod-vase",
    shopId: "shop-nori",
    name: "Vase Solis",
    price: 34,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc9041751654?w=600&h=750&fit=crop",
    category: "Déco",
    stock: 6,
    condition: "Fait main",
    description: "Vase en céramique artisanale, forme organique et finition mate.",
    rating: 4.9,
    reviewCount: 8,
  },
  {
    id: "prod-ring",
    shopId: "shop-bijoux",
    name: "Bague minimal argent",
    price: 42,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=750&fit=crop",
    category: "Bijoux",
    stock: 8,
    condition: "Neuf",
    description: "Bague minimaliste en argent, pour un port quotidien.",
    rating: 4.7,
    reviewCount: 15,
  },
  {
    id: "prod-tote",
    shopId: "shop-nori",
    name: "Tote upcyclée",
    price: 34,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=750&fit=crop",
    category: "Accessoires",
    stock: 6,
    condition: "Fait main",
    description: "Tote bag upcyclée en tissu récupéré, pièce unique.",
    rating: 4.6,
    reviewCount: 5,
  },
  {
    id: "prod-denim",
    shopId: "shop-retro",
    name: "Manteau denim vintage",
    price: 72,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=750&fit=crop",
    category: "Vintage",
    size: "M/L",
    stock: 1,
    condition: "Très bon état",
    description: "Manteau denim vintage sélectionné, coupe structurée.",
    rating: 4.9,
    reviewCount: 22,
  },
  {
    id: "prod-jacket",
    shopId: "shop-pascale",
    name: "Veste lin artisanale",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop",
    category: "Créateurs",
    size: "M",
    stock: 1,
    condition: "Fait main",
    description: "Veste en lin faite main, petite série.",
    rating: 4.8,
    reviewCount: 6,
  },
  {
    id: "prod-print",
    shopId: "shop-pascale",
    name: "Affiche botanique",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=750&fit=crop",
    category: "Déco",
    stock: 12,
    condition: "Neuf",
    description: "Affiche botanique édition limitée, impression artisanale.",
    rating: 4.5,
    reviewCount: 3,
  },
  {
    id: "prod-mug",
    shopId: "shop-nori",
    name: "Mug artisanal",
    price: 24,
    image:
      "https://images.unsplash.com/photo-1514228742589-876d136d2f04?w=600&h=750&fit=crop",
    category: "Déco",
    stock: 10,
    condition: "Fait main",
    description: "Mug en grès émaillé, fabriqué à la main.",
    rating: 4.8,
    reviewCount: 11,
  },
];

export const SAMPLE_ORDER: Order = {
  id: "VDY-2048",
  productId: "prod-hoodie",
  buyerName: "Emma Laurent",
  sellerShopId: "shop-lina",
  price: 64,
  shipping: 3.9,
  buyerProtection: 1.9,
  total: 69.8,
  status: "shipped",
  payoutStatus: "pending_validation",
  shippingMethod: "relay",
  deadline: "vendredi",
  createdAt: "2026-07-01",
};

export const MISSIONS: Mission[] = [
  {
    id: "m1",
    label: "Ajoute 3 produits",
    description: "Publie 3 articles pour compléter ta vitrine.",
    progress: 2,
    total: 3,
    completed: false,
    category: "products",
    rewardBadgeId: "badge-catalog",
  },
  {
    id: "m2",
    label: "Partage ta boutique",
    description: "Envoie ton lien sur Instagram ou WhatsApp.",
    progress: 1,
    total: 1,
    completed: true,
    category: "sharing",
    rewardBadgeId: "badge-sharer",
  },
  {
    id: "m3",
    label: "Obtiens ton premier avis",
    description: "Reçois un avis positif d'un acheteur.",
    progress: 0,
    total: 1,
    completed: false,
    category: "reviews",
    rewardBadgeId: "badge-trusted",
  },
  {
    id: "m4",
    label: "Réponds en moins de 2h",
    description: "Maintiens un temps de réponse rapide.",
    progress: 3,
    total: 5,
    completed: false,
    category: "messages",
    rewardBadgeId: "badge-responsive",
  },
  {
    id: "m5",
    label: "Expédie ta prochaine commande",
    description: "Envoie ta commande en moins de 48h.",
    progress: 0,
    total: 1,
    completed: false,
    category: "shipping",
    rewardBadgeId: "badge-fast-shipping",
  },
];

export const BADGES: Badge[] = [
  {
    id: "badge-sharer",
    title: "Partageur",
    description: "Tu as partagé ta boutique pour la première fois.",
    emoji: "📣",
    unlocked: true,
    unlockedAt: "2026-06-28",
  },
  {
    id: "badge-catalog",
    title: "Vitrine complète",
    description: "3 produits publiés sur ta boutique.",
    emoji: "✨",
    unlocked: false,
  },
  {
    id: "badge-trusted",
    title: "Vendeur de confiance",
    description: "Premier avis positif reçu.",
    emoji: "⭐",
    unlocked: false,
  },
  {
    id: "badge-responsive",
    title: "Réponse rapide",
    description: "5 réponses en moins de 2h.",
    emoji: "⚡",
    unlocked: false,
  },
  {
    id: "badge-fast-shipping",
    title: "Expédition express",
    description: "Commande expédiée en moins de 48h.",
    emoji: "🚀",
    unlocked: false,
  },
  {
    id: "badge-rising",
    title: "Boutique en essor",
    description: "10 ventes réalisées sur Vendy.",
    emoji: "🌱",
    unlocked: true,
    unlockedAt: "2026-06-15",
  },
];

export const SHOP_PRESETS: ShopPreset[] = [
  {
    id: "preset-minimal",
    name: "Minimal",
    coverImage:
      "https://images.unsplash.com/photo-1441986300917-6466bd776608?w=800&h=600&fit=crop",
    logoImage:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=200&h=200&fit=crop",
    accentColor: "#F04465",
    theme: "light",
  },
  {
    id: "preset-vintage",
    name: "Vintage",
    coverImage:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop",
    logoImage:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    accentColor: "#B45309",
    theme: "light",
  },
  {
    id: "preset-artisan",
    name: "Artisan",
    coverImage:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
    logoImage:
      "https://images.unsplash.com/photo-1578749556568-bc9041751654?w=200&h=200&fit=crop",
    accentColor: "#059669",
    theme: "light",
  },
  {
    id: "preset-noir",
    name: "Noir",
    coverImage:
      "https://images.unsplash.com/photo-1557683316-973673bdar71?w=800&h=600&fit=crop",
    logoImage:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop",
    accentColor: "#F04465",
    theme: "dark",
  },
];

export const DEFAULT_SHOP_DRAFT: ShopDraft = {
  name: "",
  description: "",
  category: "Mode",
  location: "",
  instagram: "",
  coverImage: SHOP_PRESETS[0].coverImage,
  logoImage: SHOP_PRESETS[0].logoImage,
  accentColor: SHOP_PRESETS[0].accentColor,
  theme: "light",
};

export const SHIPPING_CATEGORIES = [
  { id: "light", label: "Léger", hint: "T-shirt, bijou — 500 g", weight: "500 g" },
  { id: "medium", label: "Moyen", hint: "Sweat, jean — 1 kg", weight: "1 kg" },
  { id: "heavy", label: "Lourd", hint: "Veste, chaussures — 2 kg", weight: "2 kg" },
] as const;

export const DISPUTE_REASONS = [
  { id: "not_received" as const, label: "Je n'ai pas reçu l'article", icon: "📦" },
  { id: "damaged" as const, label: "L'article est endommagé", icon: "💔" },
  { id: "not_as_described" as const, label: "Ne correspond pas à la description", icon: "🔍" },
  { id: "other" as const, label: "Autre problème", icon: "💬" },
];

export const SELLER_STATS: SellerStats = {
  sales7d: [3, 5, 2, 8, 4, 6, 7],
  sales30d: 128,
  conversionRate: 4.2,
  avgShippingDays: 1.8,
  validationRate: 96,
  pendingBalance: 64,
  availableBalance: 128,
  ranking: { category: "Vintage", position: 12, target: 10 },
};

export const CATEGORIES = [
  "Tout",
  "Mode",
  "Bijoux",
  "Déco",
  "Créateurs",
  "Accessoires",
  "Vintage",
] as const;

export function getShop(id: string) {
  return SHOPS.find((s) => s.id === id);
}

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getShopProducts(shopId: string) {
  return PRODUCTS.filter((p) => p.shopId === shopId);
}
