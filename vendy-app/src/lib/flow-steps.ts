export const SELLER_FLOW_STEPS = [
  { id: "published", label: "Publié" },
  { id: "shared", label: "Partagé" },
  { id: "ordered", label: "Commande" },
  { id: "label", label: "Étiquette" },
  { id: "shipped", label: "Expédié" },
  { id: "validated", label: "Validation" },
  { id: "paid", label: "Payé" },
] as const;

export const BUYER_FLOW_STEPS = [
  { id: "payment", label: "Paiement sécurisé" },
  { id: "preparing", label: "Vendeur prépare" },
  { id: "label", label: "Étiquette générée" },
  { id: "shipped", label: "Expédié" },
  { id: "transit", label: "En transit" },
  { id: "delivered", label: "Livré" },
  { id: "validation", label: "Validation" },
  { id: "paid", label: "Payé" },
] as const;

export function orderStatusToFlowIndex(status: string): number {
  const map: Record<string, number> = {
    payment_secured: 0,
    seller_preparing: 1,
    label_generated: 2,
    shipped: 3,
    in_transit: 4,
    delivered: 5,
    waiting_validation: 6,
    validated: 6,
    money_released: 7,
  };
  return map[status] ?? 0;
}

export function sellerDashboardFlowIndex(status: string): number {
  const map: Record<string, number> = {
    payment_secured: 2,
    seller_preparing: 2,
    label_generated: 3,
    shipped: 4,
    in_transit: 4,
    delivered: 5,
    waiting_validation: 5,
    validated: 6,
    money_released: 6,
  };
  return map[status] ?? 1;
}
