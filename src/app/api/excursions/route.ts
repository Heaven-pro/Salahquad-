// /api/excursions — GET public (liste), POST admin (création)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/quad/prisma';
import { excursionSchema } from '@/lib/quad/validation';
import { getSession } from '@/lib/quad/auth';
import { applyOfferOverrides } from '@/lib/quad/offer-overrides';

export async function GET() {
  const excursions = await prisma.excursion.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json({ excursions: excursions.map(applyOfferOverrides) });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const parsed = excursionSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides', details: parsed.error.flatten() }, { status: 422 });
  }
  const created = await prisma.excursion.create({ data: parsed.data });
  return NextResponse.json({ excursion: created }, { status: 201 });
}
