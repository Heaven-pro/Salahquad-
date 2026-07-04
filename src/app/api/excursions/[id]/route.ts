// /api/excursions/[id] — PUT (modifier), DELETE (supprimer) — admin only
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { excursionSchema } from '@/lib/validation';
import { getSession } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const parsed = excursionSchema.partial().safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Données invalides' }, { status: 422 });

  const updated = await prisma.excursion.update({ where: { id: params.id }, data: parsed.data });
  return NextResponse.json({ excursion: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  // Suppression douce : on désactive plutôt que de supprimer (réservations liées)
  await prisma.excursion.update({ where: { id: params.id }, data: { active: false } });
  return NextResponse.json({ ok: true });
}
