// /api/admin/login — POST : authentification de l'administrateur
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSession, destroySession } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const schema = z.object({ email: z.string().email(), password: z.string().min(1) });

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'Champs invalides' }, { status: 422 });

  const { email, password } = parsed.data;
  const user = await prisma.adminUser.findUnique({ where: { email } });
  // Comparaison à temps constant ; message générique pour ne pas révéler l'existence du compte
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
  }
  await createSession(user.id, user.email);
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  destroySession();
  return NextResponse.json({ ok: true });
}
