// ============================================================
//  /api/bookings
//  POST : création d'une réservation (public)
//  GET  : liste des réservations (admin only)
// ============================================================
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { sendBookingEmails } from '@/lib/mail';
import { computeTotalCents, type Duration } from '@/lib/pricing';
import { prisma } from '@/lib/prisma';
import { bookingSchema } from '@/lib/validation';

const makeRef = () => `SQM-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides', details: parsed.error.flatten() }, { status: 422 });
  }

  const d = parsed.data;

  if (d.website && d.website.length > 0) {
    return NextResponse.json({ ok: true, reference: makeRef() });
  }

  const exc = await prisma.excursion.findUnique({ where: { slug: d.excursionSlug } });
  if (!exc || !exc.active) {
    return NextResponse.json({ error: 'Excursion introuvable' }, { status: 404 });
  }

  let promoPercent = 0;
  if (d.promoCode) {
    const promo = await prisma.promotion.findUnique({ where: { code: d.promoCode.toUpperCase() } });
    if (promo && promo.active && (!promo.expiresAt || promo.expiresAt > new Date())) {
      promoPercent = promo.percent;
    }
  }

  const durations = exc.durations as unknown as Duration[];
  const totalCents = computeTotalCents({
    priceCents: exc.priceCents,
    unit: exc.unit,
    durations,
    durationIndex: d.durationIndex,
    pilots: d.pilots,
    passengers: d.passengers,
    children: d.children,
    category: exc.category,
    camelAddon: d.camelAddon,
    promoPercent,
  });

  const reference = makeRef();
  const durationLabel = durations[d.durationIndex]?.label ?? durations[0]?.label ?? '—';

  const booking = await prisma.booking.create({
    data: {
      reference,
      excursionId: exc.id,
      date: new Date(d.date),
      timeSlot: d.timeSlot,
      durationLabel,
      pilots: d.pilots,
      passengers: d.passengers,
      children: d.children,
      camelAddon: d.camelAddon,
      hotelPickup: d.hotelPickup,
      pickupAddress: d.pickupAddress ?? null,
      totalCents,
      customerName: d.customerName,
      customerEmail: d.customerEmail || '',
      customerPhone: d.customerPhone,
      message: d.message,
      locale: d.locale,
      promoCode: d.promoCode ?? null,
    },
  });

  void sendBookingEmails({
    reference,
    title: d.locale === 'en' ? exc.titleEn : exc.titleFr,
    date: d.date,
    timeSlot: d.timeSlot,
    durationLabel,
    pilots: d.pilots,
    passengers: d.passengers,
    children: d.children,
    totalCents,
    customerName: d.customerName,
    customerEmail: d.customerEmail || '',
    customerPhone: d.customerPhone,
    pickupAddress: d.pickupAddress ?? null,
  });

  return NextResponse.json({ ok: true, reference, totalCents, bookingId: booking.id }, { status: 201 });
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: { excursion: { select: { titleFr: true, category: true } } },
    take: 200,
  });

  return NextResponse.json({ bookings });
}
