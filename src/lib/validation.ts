// Validation stricte des entrées (anti-injection / données malformées) via Zod
import { z } from 'zod';

export const bookingSchema = z.object({
  excursionSlug: z.string().min(1).max(60),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date invalide'),
  timeSlot: z.string().min(1).max(20),
  durationIndex: z.number().int().min(0).max(10).default(0),
  pilots: z.number().int().min(1).max(30),
  passengers: z.number().int().min(0).max(30),
  children: z.number().int().min(0).max(30),
  camelAddon: z.boolean().default(false),
  hotelPickup: z.boolean().default(true),
  pickupAddress: z.string().max(200).optional(),
  customerName: z.string().min(2).max(120),
  customerEmail: z.string().max(160).optional(),
  customerPhone: z.string().min(6).max(40),
  message: z.string().max(1000).optional(),
  locale: z.enum(['fr', 'en', 'es', 'nl', 'de']).default('fr'),
  promoCode: z.string().max(40).optional(),
  // Honeypot anti-spam : doit rester vide
  website: z.string().max(0).optional(),
}).superRefine((data, ctx) => {
  if (data.passengers > data.pilots) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['passengers'],
      message: 'Le nombre de passagers ne peut pas dépasser le nombre de pilotes.',
    });
  }
});

export const excursionSchema = z.object({
  slug: z.string().min(1).max(60),
  category: z.string().min(1).max(40),
  titleFr: z.string().min(1), titleEn: z.string().min(1),
  descFr: z.string().min(1), descEn: z.string().min(1),
  priceCents: z.number().int().min(0),
  unit: z.enum(['PERSON', 'VEHICLE']),
  rating: z.number().min(0).max(5).default(4.9),
  reviews: z.string().default('0'),
  tagFr: z.string().optional(), tagEn: z.string().optional(),
  durations: z.array(z.object({ label: z.string(), mult: z.number() })).min(1),
  includesFr: z.array(z.string()),
  includesEn: z.array(z.string()),
  active: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export type BookingInput = z.infer<typeof bookingSchema>;
