"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BADGES,
  CURRENT_USER,
  DEFAULT_SHOP_DRAFT,
  MISSIONS,
  SAMPLE_ORDER,
  SHOPS,
} from "@/lib/mock/data";
import type {
  Badge,
  DisputeReason,
  Mission,
  Order,
  OrderStatus,
  Shop,
  ShopDraft,
  User,
  UserIntention,
  UserRole,
} from "@/types/vendy";

interface VendyContextValue {
  user: User;
  role: UserRole;
  intention: UserIntention | null;
  onboardingComplete: boolean;
  onboardingStep: number;
  order: Order;
  missions: Mission[];
  badges: Badge[];
  shopDraft: ShopDraft;
  shopOverrides: Record<string, Partial<Shop>>;
  createdShops: Shop[];
  disputeSubmitted: boolean;
  lastUnlockedBadge: Badge | null;
  setRole: (role: UserRole) => void;
  setIntention: (intention: UserIntention) => void;
  completeOnboarding: (intent?: UserIntention) => void;
  setOnboardingStep: (step: number) => void;
  activateSellerMode: () => void;
  advanceOrderStatus: () => void;
  validateOrder: () => void;
  setActiveShop: (shopId: string) => void;
  messagesEnabled: boolean;
  setMessagesEnabled: (enabled: boolean) => void;
  updateShopDraft: (updates: Partial<ShopDraft>) => void;
  resetShopDraft: () => void;
  createShopFromDraft: () => string;
  updateShopCustomization: (shopId: string, updates: Partial<Shop>) => void;
  advanceMission: (missionId: string) => void;
  submitDispute: (reason: DisputeReason) => void;
  clearLastUnlockedBadge: () => void;
  completeLogin: () => void;
}

const ORDER_FLOW: OrderStatus[] = [
  "payment_secured",
  "seller_preparing",
  "label_generated",
  "shipped",
  "in_transit",
  "delivered",
  "waiting_validation",
  "validated",
  "money_released",
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const VendyContext = createContext<VendyContextValue | null>(null);

export function VendyProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(CURRENT_USER);
  const [role, setRole] = useState<UserRole>("buyer");
  const [intention, setIntentionState] = useState<UserIntention | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [order, setOrder] = useState<Order>(SAMPLE_ORDER);
  const [messagesEnabled, setMessagesEnabled] = useState(true);
  const [shopDraft, setShopDraft] = useState<ShopDraft>(DEFAULT_SHOP_DRAFT);
  const [shopOverrides, setShopOverrides] = useState<Record<string, Partial<Shop>>>({});
  const [createdShops, setCreatedShops] = useState<Shop[]>([]);
  const [missions, setMissions] = useState<Mission[]>(MISSIONS);
  const [badges, setBadges] = useState<Badge[]>(BADGES);
  const [disputeSubmitted, setDisputeSubmitted] = useState(false);
  const [lastUnlockedBadge, setLastUnlockedBadge] = useState<Badge | null>(null);

  const setIntention = useCallback((value: UserIntention) => {
    setIntentionState(value);
  }, []);

  const completeOnboarding = useCallback((intent?: UserIntention) => {
    const resolved = intent ?? intention;
    setOnboardingComplete(true);
    if (resolved === "sell") {
      setUser((prev) => ({
        ...prev,
        sellerMode: true,
        shopIds: ["shop-lina"],
        activeShopId: "shop-lina",
      }));
      setRole("seller");
    }
  }, [intention]);

  const activateSellerMode = useCallback(() => {
    setUser((prev) => ({
      ...prev,
      sellerMode: true,
      shopIds: prev.shopIds.length ? prev.shopIds : ["shop-lina"],
      activeShopId: prev.activeShopId ?? "shop-lina",
    }));
    setRole("seller");
  }, []);

  const advanceOrderStatus = useCallback(() => {
    setOrder((prev) => {
      const idx = ORDER_FLOW.indexOf(prev.status);
      if (idx < 0 || idx >= ORDER_FLOW.length - 1) return prev;
      const next = ORDER_FLOW[idx + 1];
      return {
        ...prev,
        status: next,
        payoutStatus:
          next === "money_released" ? "available" : prev.payoutStatus,
      };
    });
  }, []);

  const validateOrder = useCallback(() => {
    setOrder((prev) => ({
      ...prev,
      status: "validated",
      payoutStatus: "available",
    }));
  }, []);

  const setActiveShop = useCallback((shopId: string) => {
    setUser((prev) => ({ ...prev, activeShopId: shopId }));
  }, []);

  const updateShopDraft = useCallback((updates: Partial<ShopDraft>) => {
    setShopDraft((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetShopDraft = useCallback(() => {
    setShopDraft(DEFAULT_SHOP_DRAFT);
  }, []);

  const createShopFromDraft = useCallback(() => {
    const id = `shop-${Date.now()}`;
    const slug = slugify(shopDraft.name) || "ma-boutique";
    const newShop: Shop = {
      id,
      slug,
      name: shopDraft.name || "Ma boutique",
      category: shopDraft.category,
      description: shopDraft.description || "Boutique indépendante sur Vendy.",
      location: shopDraft.location || "France",
      rating: 0,
      sales: 0,
      followers: 0,
      badge: "Nouvelle boutique",
      coverImage: shopDraft.coverImage,
      logoImage: shopDraft.logoImage,
      accentColor: shopDraft.accentColor,
      theme: shopDraft.theme,
      verified: false,
    };
    setCreatedShops((prev) => [...prev, newShop]);
    setUser((prev) => ({
      ...prev,
      sellerMode: true,
      shopIds: [...prev.shopIds, id],
      activeShopId: id,
    }));
    setRole("seller");
    return id;
  }, [shopDraft]);

  const updateShopCustomization = useCallback(
    (shopId: string, updates: Partial<Shop>) => {
      setShopOverrides((prev) => ({
        ...prev,
        [shopId]: { ...prev[shopId], ...updates },
      }));
    },
    [],
  );

  const unlockBadge = useCallback((badgeId: string) => {
    setBadges((prev) => {
      const badge = prev.find((b) => b.id === badgeId);
      if (!badge || badge.unlocked) return prev;
      const updated = prev.map((b) =>
        b.id === badgeId
          ? { ...b, unlocked: true, unlockedAt: new Date().toISOString().slice(0, 10) }
          : b,
      );
      setLastUnlockedBadge(updated.find((b) => b.id === badgeId) ?? null);
      return updated;
    });
  }, []);

  const advanceMission = useCallback(
    (missionId: string) => {
      setMissions((prev) =>
        prev.map((m) => {
          if (m.id !== missionId || m.completed) return m;
          const progress = Math.min(m.progress + 1, m.total);
          const completed = progress >= m.total;
          if (completed && m.rewardBadgeId) {
            unlockBadge(m.rewardBadgeId);
          }
          return { ...m, progress, completed };
        }),
      );
    },
    [unlockBadge],
  );

  const submitDispute = useCallback((_reason: DisputeReason) => {
    setDisputeSubmitted(true);
  }, []);

  const clearLastUnlockedBadge = useCallback(() => {
    setLastUnlockedBadge(null);
  }, []);

  const completeLogin = useCallback(() => {
    setOnboardingComplete(true);
  }, []);

  const value = useMemo(
    () => ({
      user,
      role,
      intention,
      onboardingComplete,
      onboardingStep,
      order,
      missions,
      badges,
      shopDraft,
      shopOverrides,
      createdShops,
      disputeSubmitted,
      lastUnlockedBadge,
      setRole,
      setIntention,
      completeOnboarding,
      setOnboardingStep,
      activateSellerMode,
      advanceOrderStatus,
      validateOrder,
      setActiveShop,
      messagesEnabled,
      setMessagesEnabled,
      updateShopDraft,
      resetShopDraft,
      createShopFromDraft,
      updateShopCustomization,
      advanceMission,
      submitDispute,
      clearLastUnlockedBadge,
      completeLogin,
    }),
    [
      user,
      role,
      intention,
      onboardingComplete,
      onboardingStep,
      order,
      missions,
      badges,
      shopDraft,
      shopOverrides,
      createdShops,
      disputeSubmitted,
      lastUnlockedBadge,
      messagesEnabled,
      setIntention,
      completeOnboarding,
      activateSellerMode,
      advanceOrderStatus,
      validateOrder,
      setActiveShop,
      updateShopDraft,
      resetShopDraft,
      createShopFromDraft,
      updateShopCustomization,
      advanceMission,
      submitDispute,
      clearLastUnlockedBadge,
      completeLogin,
    ],
  );

  return (
    <VendyContext.Provider value={value}>{children}</VendyContext.Provider>
  );
}

export function useVendy() {
  const ctx = useContext(VendyContext);
  if (!ctx) throw new Error("useVendy must be used within VendyProvider");
  return ctx;
}

export function useActiveShop() {
  const { user, shopOverrides, createdShops } = useVendy();
  const base =
    [...SHOPS, ...createdShops].find((s) => s.id === user.activeShopId) ??
    SHOPS[0];
  const overrides = shopOverrides[base.id] ?? {};
  return { ...base, ...overrides };
}

export function useAllShops() {
  const { shopOverrides, createdShops } = useVendy();
  return [...SHOPS, ...createdShops].map((shop) => ({
    ...shop,
    ...(shopOverrides[shop.id] ?? {}),
  }));
}
