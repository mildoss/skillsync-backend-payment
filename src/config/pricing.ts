export const CREDIT_PACKAGES: Record<string, { priceId: string; creditsToAdd: number }> = {
  'pack_10': {
    priceId: process.env.STRIPE_PRICE_ID_10 || '',
    creditsToAdd: 10,
  },
  'pack_25': {
    priceId: process.env.STRIPE_PRICE_ID_25 || '',
    creditsToAdd: 25,
  },
  'pack_50': {
    priceId: process.env.STRIPE_PRICE_ID_50 || '',
    creditsToAdd: 50,
  },
};