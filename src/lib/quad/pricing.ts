import { PriceUnit } from '@prisma/client';

export type Duration = { label: string; mult: number };

export interface PricingInput {
  priceCents: number;
  unit: PriceUnit;
  durations: Duration[];
  durationIndex: number;
  pilots: number;
  passengers: number;
  children: number;
  category: string;
  promoPercent?: number;
  camelAddon?: boolean;
}

const EUR_TO_MAD = 10;
const PASSENGER_ADDON_CENTS = 500;
const CAMEL_CENTS = 900;

export function computeTotalCents(input: PricingInput): number {
  const {
    priceCents,
    unit,
    durations,
    durationIndex,
    pilots,
    passengers,
    children,
    category,
    promoPercent = 0,
    camelAddon = false,
  } = input;

  const mult = durations[durationIndex]?.mult ?? durations[0]?.mult ?? 1;
  let total = 0;

  if (unit === PriceUnit.VEHICLE) {
    total = priceCents * mult * Math.max(1, pilots);
  } else if (category === 'quad') {
    total = priceCents * mult * Math.max(1, pilots);
    total += PASSENGER_ADDON_CENTS * passengers;
    total += Math.round(priceCents * mult * 0.5) * children;
  } else {
    total = priceCents * mult * Math.max(1, pilots + passengers);
    total += Math.round(priceCents * mult * 0.5) * children;
  }

  const cappedPromo = Math.min(Math.max(promoPercent, 0), 99);
  if (cappedPromo > 0) total *= 1 - cappedPromo / 100;

  if (camelAddon) {
    total += CAMEL_CENTS * Math.max(1, pilots + passengers + children);
  }

  return Math.round(total);
}

export const formatEuro = (cents: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100);

export const formatMAD = (cents: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format((cents / 100) * EUR_TO_MAD);

export const formatDualPrice = (cents: number) =>
  `${formatMAD(cents)} (${formatEuro(cents)})`;
