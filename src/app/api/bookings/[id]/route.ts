// /api/bookings/[id] — PATCH : changer le statut (confirmer / annuler) — admin
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({ status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']) });

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Statut invalide' }, { status: 422 });

  try {
    const updated = await prisma.booking.update({ where: { id: params.id }, data: { status: parsed.data.status } });
    return NextResponse.json({ booking: updated });
  } catch {
    return NextResponse.json({ error: 'Réservation introuvable' }, { status: 404 });
  }
}
