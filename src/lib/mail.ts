// ============================================================
//  Envoi d'e-mails transactionnels (Nodemailer / SMTP)
//  - Confirmation au client
//  - Notification à l'administrateur
//  En l'absence de configuration SMTP, on logge sans planter.
// ============================================================
import nodemailer from 'nodemailer';
import { formatDualPrice } from './pricing';

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function transporter() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

const GOLD = '#C9A24B';

export interface MailBooking {
  reference: string;
  title: string;
  date: string;
  timeSlot: string;
  durationLabel: string;
  pilots: number;
  passengers: number;
  children: number;
  totalCents: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupAddress: string | null;
}

function customerHtml(b: MailBooking) {
  return `<div style="font-family:Arial,sans-serif;background:#14100C;color:#F7F1E6;padding:32px;border-radius:14px;max-width:560px">
    <h1 style="color:${GOLD};font-size:22px;margin:0 0 6px">Demande de réservation reçue ✅</h1>
    <p style="color:#A99B86">Merci ${escapeHtml(b.customerName)}, votre demande est bien enregistrée. Notre équipe vous confirme la disponibilité très vite.</p>
    <div style="background:#1E1813;border:1px solid rgba(201,162,75,.25);border-radius:10px;padding:18px;margin:18px 0">
      <p style="margin:4px 0"><b>Référence :</b> ${b.reference}</p>
      <p style="margin:4px 0"><b>Activité :</b> ${b.title}</p>
      <p style="margin:4px 0"><b>Date :</b> ${b.date} à ${b.timeSlot} (${b.durationLabel})</p>
      <p style="margin:4px 0"><b>Participants :</b> ${b.pilots} pilote(s), ${b.passengers} passager(s), ${b.children} enfant(s)</p>
      <p style="margin:10px 0 0;font-size:20px;color:${GOLD}"><b>Total estimé : ${formatDualPrice(b.totalCents)}</b></p>
    </div>
    <p style="color:#A99B86;font-size:13px">Paiement sur place le jour de l'activité. Annulation gratuite jusqu'à 24h avant.</p>
    <p style="color:#A99B86;font-size:13px">WhatsApp : 0610818391 - Salah Quad Marrakech</p>
  </div>`;
}

function adminHtml(b: MailBooking) {
  return `<div style="font-family:Arial,sans-serif">
    <h2>🛎️ Nouvelle réservation - ${b.reference}</h2>
    <ul>
      <li><b>Activité :</b> ${b.title}</li>
      <li><b>Date :</b> ${b.date} ${b.timeSlot} (${b.durationLabel})</li>
      <li><b>Participants :</b> ${b.pilots}P / ${b.passengers}pass / ${b.children}enf</li>
      <li><b>Total :</b> ${formatDualPrice(b.totalCents)}</li>
      <li><b>Client :</b> ${escapeHtml(b.customerName)} - ${b.customerEmail ? escapeHtml(b.customerEmail) : '—'} - ${b.customerPhone}</li>
      <li><b>Pickup :</b> ${b.pickupAddress || '—'}</li>
    </ul>
    <p>Confirmez / annulez depuis le tableau de bord.</p>
  </div>`;
}

export async function sendBookingEmails(b: MailBooking) {
  const tx = transporter();
  if (!tx) {
    console.log('[mail] SMTP non configuré — e-mails simulés pour', b.reference);
    return;
  }

  const from = process.env.MAIL_FROM || 'Salah Quad Marrakech <no-reply@salahquad.com>';
  try {
    if (b.customerEmail) {
      await tx.sendMail({ from, to: b.customerEmail, subject: `Réservation ${b.reference} - Salah Quad Marrakech`, html: customerHtml(b) });
    }
    const adminTo = process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_EMAIL;
    if (adminTo) {
      await tx.sendMail({ from, to: adminTo, subject: `🛎️ Nouvelle réservation ${b.reference}`, html: adminHtml(b) });
    }
  } catch (e) {
    console.error('[mail] échec envoi', e);
  }
}
