'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Locale, Translations } from '@/lib/i18n';
import { computeTotalCents } from '@/lib/pricing';
import { WHATSAPP_NUMBER } from '@/lib/contact';

type Duration = { label: string; mult: number };
type Exc = { slug: string; titleFr: string; titleEn: string; priceCents: number; unit: 'PERSON' | 'VEHICLE'; durations: Duration[]; category: string };

const EUR_TO_MAD = 10;

const NUMBER_LOCALE: Record<Locale, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  es: 'es-ES',
  nl: 'nl-NL',
  de: 'de-DE',
};

const PEOPLE_LABELS: Record<Locale, { pilot: string; passenger: string; child: string }> = {
  fr: { pilot: 'pilote(s)', passenger: 'passager(s)', child: 'enfant(s)' },
  en: { pilot: 'pilot(s)', passenger: 'passenger(s)', child: 'child(ren)' },
  es: { pilot: 'piloto(s)', passenger: 'pasajero(s)', child: 'niños' },
  nl: { pilot: 'piloot(s)', passenger: 'passagier(s)', child: 'kind(eren)' },
  de: { pilot: 'Pilot(en)', passenger: 'Passagier(e)', child: 'Kind(er)' },
};

interface BookingWidgetProps {
  excursions: Exc[];
  locale: Locale;
  reservationLabels: Translations['reservation'];
  bookingLabels: Translations['bookingWidget'];
  bookingInfo: Translations['bookingInfo'];
}

export default function BookingWidget({ excursions, locale, reservationLabels, bookingLabels, bookingInfo }: BookingWidgetProps) {
  const [slug, setSlug] = useState(excursions[0]?.slug ?? '');
  const [durIdx, setDurIdx] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [pilots, setPilots] = useState(1);
  const [passengers, setPassengers] = useState(0);
  const [children, setChildren] = useState(0);
  const [pickup, setPickup] = useState(true);
  const [pickupAddress, setPickupAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [ref, setRef] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const exc = useMemo(() => excursions.find((e) => e.slug === slug) ?? excursions[0], [slug, excursions]);
  const isQuadPassengerLimited = exc?.category === 'quad' && exc?.unit === 'PERSON';
  const maxPassengers = isQuadPassengerLimited ? pilots : 30;

  useEffect(() => {
    if (isQuadPassengerLimited) {
      setPassengers((current) => Math.min(current, pilots));
    }
  }, [isQuadPassengerLimited, pilots]);

  const totalCents = useMemo(() => {
    if (!exc) return 0;
    return computeTotalCents({
      priceCents: exc.priceCents,
      unit: exc.unit,
      durations: exc.durations,
      durationIndex: durIdx,
      pilots,
      passengers,
      children,
      category: exc.category,
      camelAddon: false,
    });
  }, [exc, durIdx, pilots, passengers, children]);

  const numberLocale = NUMBER_LOCALE[locale];
  const euro = (c: number) => new Intl.NumberFormat(numberLocale, { style: 'currency', currency: 'EUR' }).format(c / 100);
  const mad = (c: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format((c / 100) * EUR_TO_MAD);
  const dualPrice = (c: number) => `${mad(c)} (${euro(c)})`;

  const categories = useMemo(() => {
    const map = new Map<string, Exc[]>();
    excursions.forEach((e) => {
      const cat = e.category;
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(e);
    });
    return map;
  }, [excursions]);

  const labels = reservationLabels.form;
  const localeText = PEOPLE_LABELS[locale];

  async function submit() {
    if (!name || !phone || !date) {
      setErrorMsg(labels.errorMissing);
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          excursionSlug: slug,
          date,
          timeSlot: time,
          durationIndex: durIdx,
          pilots,
          passengers,
          children,
          camelAddon: false,
          hotelPickup: pickup,
          pickupAddress: pickup ? pickupAddress : undefined,
          customerName: name,
          customerPhone: phone,
          message: message || undefined,
          locale,
          website: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la réservation');
      setRef(data.reference);
      setStatus('done');
    } catch (error: unknown) {
      setErrorMsg(error instanceof Error ? error.message : 'Une erreur est survenue. Essayez via WhatsApp.');
      setStatus('error');
    }
  }

  function whatsapp() {
    if (!exc) return;
    const summary = `${pilots} ${localeText.pilot}, ${passengers} ${localeText.passenger}, ${children} ${localeText.child}`;
    const title = locale === 'fr' ? exc.titleFr : exc.titleEn;
    const msg = `${bookingLabels.whatsapp.intro}\n\n${bookingLabels.whatsapp.activity}\n• ${title}\n• ${bookingLabels.whatsapp.duration}: ${exc.durations[durIdx]?.label ?? ''}\n• ${bookingLabels.whatsapp.dateAt}: ${date} ${time}\n• ${bookingLabels.whatsapp.people}: ${summary}\n• ${bookingLabels.whatsapp.totalEstimate}: ${dualPrice(totalCents)}\n\n${bookingLabels.whatsapp.thanks}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  const inputCls = 'w-full bg-ink/80 border border-dune/15 rounded-xl px-4 py-3 text-bone focus:border-dune/50 focus:ring-1 focus:ring-dune/20 outline-none transition-all text-sm';
  const labelCls = 'block text-xs font-bold uppercase tracking-wide text-muted mb-1.5';

  if (status === 'done') {
    return (
      <div className="max-w-lg mx-auto rounded-3xl glass-strong p-10 text-center animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-zellige/20 text-zellige mx-auto flex items-center justify-center mb-5">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-dune-soft mb-2">{reservationLabels.successTitle}</h3>
        <p className="text-muted mb-1">{reservationLabels.successSubtitle}</p>
        <p className="font-display text-3xl text-bone mb-4">{ref}</p>
        <p className="text-muted text-sm">{reservationLabels.successMessage}</p>
        <div className="divider-dune my-6" />
        <p className="text-muted text-xs">{reservationLabels.helpText}</p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${reservationLabels.successTitle} ${ref} ${reservationLabels.helpText}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 text-[#1FA855] font-semibold text-sm hover:underline"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          {reservationLabels.whatsappButton}
        </a>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr,380px] gap-10 items-start">
      <div className="rounded-3xl glass-strong p-7 md:p-8 shadow-2xl">
        <h3 className="font-display text-2xl mb-1">{reservationLabels.title}</h3>
        <p className="text-muted text-sm mb-6">{reservationLabels.desc}</p>

        <div className="mb-4">
          <label className={labelCls}>{labels.experience}</label>
          <select className={inputCls} value={slug} onChange={(e) => { setSlug(e.target.value); setDurIdx(0); }}>
            {Array.from(categories.entries()).map(([cat, excs]) => (
              <optgroup key={cat} label={cat}>
                {excs.map((e) => (
                  <option key={e.slug} value={e.slug}>
                    {locale === 'fr' ? e.titleFr : e.titleEn} — {mad(e.priceCents)} ({euro(e.priceCents)}){e.unit === 'VEHICLE' ? `/${locale === 'fr' ? 'véhicule' : locale === 'en' ? 'vehicle' : locale === 'es' ? 'vehículo' : locale === 'nl' ? 'voertuig' : 'Fahrzeug'}` : `/${locale === 'fr' ? 'pers' : locale === 'en' ? 'pers' : locale === 'es' ? 'pers' : locale === 'nl' ? 'pers' : 'pers'}`}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className={labelCls}>{labels.date}</label>
            <input type="date" className={inputCls} value={date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>{labels.time}</label>
            <select className={inputCls} value={time} onChange={(e) => setTime(e.target.value)}>
              {['09:00', '10:30', '14:00', '16:00', '18:00'].map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        {exc && exc.durations.length > 1 && (
          <div className="mb-4">
            <label className={labelCls}>{labels.duration}</label>
            <select className={inputCls} value={durIdx} onChange={(e) => setDurIdx(Number(e.target.value))}>
              {exc.durations.map((d, index) => (
                <option key={index} value={index}>{d.label}</option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mb-4">
          {([
            [labels.pilots, pilots, setPilots, 1, 10] as const,
            [labels.passengers, passengers, setPassengers, 0, maxPassengers] as const,
            [labels.children, children, setChildren, 0, 10] as const,
          ]).map(([label, value, setter, min, max]) => (
            <div key={label}>
              <label className={labelCls}>{label}</label>
              <div className="flex items-center border border-dune/15 rounded-xl bg-ink/80 overflow-hidden">
                <button type="button" className="w-10 h-11 text-dune text-lg hover:bg-dune/10 transition-colors" onClick={() => setter(Math.max(min, value - 1))}>−</button>
                <span className="flex-1 text-center text-bone text-sm font-semibold">{value}</span>
                <button type="button" className="w-10 h-11 text-dune text-lg hover:bg-dune/10 transition-colors disabled:cursor-not-allowed disabled:opacity-40" disabled={value >= max} onClick={() => setter(Math.min(max, value + 1))}>+</button>
              </div>
            </div>
          ))}
        </div>

        {exc?.category === 'quad' && exc.unit === 'PERSON' && (
          <p className="text-xs text-dune/80 mb-4">
            {locale === 'fr'
              ? '2 personnes maximum par quad. Le nombre de passagers est limité au nombre de pilotes.'
              : locale === 'en'
              ? 'Maximum 2 people per quad. Passenger count is limited by the number of pilots.'
              : locale === 'es'
              ? 'Máximo 2 personas por quad. El número de pasajeros está limitado al número de pilotos.'
              : locale === 'nl'
              ? 'Maximaal 2 personen per quad. Het aantal passagiers is beperkt tot het aantal piloten.'
              : 'Maximal 2 Personen pro Quad. Die Zahl der Passagiere ist auf die Zahl der Piloten begrenzt.'}
          </p>
        )}

        <div className="space-y-2 mb-5">
          <label className="flex items-center gap-3 text-sm text-[#d7cdb9] cursor-pointer p-2 rounded-xl hover:bg-dune/5 transition-colors">
            <input type="checkbox" checked={pickup} onChange={(e) => setPickup(e.target.checked)} className="accent-dune w-4 h-4" />
            {labels.hotelPickup}
          </label>
        </div>

        {pickup && (
          <div className="mb-5">
            <label className={labelCls}>{labels.address}</label>
            <input className={inputCls} placeholder={labels.address} value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} />
          </div>
        )}

        <div className="grid gap-3 mb-5">
          <input className={inputCls} placeholder={labels.placeholderName} value={name} onChange={(e) => setName(e.target.value)} />
          <input className={inputCls} placeholder={labels.placeholderPhone} value={phone} onChange={(e) => setPhone(e.target.value)} />
          <textarea className={`${inputCls} resize-none`} rows={2} placeholder={labels.placeholderMessage} value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>

        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>

        <div className="flex items-baseline justify-between border-y border-dashed border-dune/15 py-4 mb-5">
          <span className="text-xs uppercase tracking-wider text-muted">{reservationLabels.total}</span>
          <div className="text-right">
            <span className="font-display text-3xl text-dune-soft block">{totalCents > 0 ? mad(totalCents) : '—'}</span>
            {totalCents > 0 && <span className="text-sm text-muted">{euro(totalCents)}</span>}
          </div>
        </div>

        {status === 'error' && (
          <div className="mb-4 p-3 rounded-xl bg-saffron/10 border border-saffron/20">
            <p className="text-saffron text-sm">{errorMsg}</p>
          </div>
        )}

        <button
          onClick={submit}
          disabled={status === 'sending'}
          className="w-full rounded-full bg-gradient-to-br from-dune-soft to-dune text-[#211a10] font-bold py-4 mb-3 btn-shine disabled:opacity-60 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {status === 'sending' ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              {locale === 'fr' ? 'Envoi en cours...' : locale === 'en' ? 'Sending...' : locale === 'es' ? 'Enviando...' : locale === 'nl' ? 'Bezig met verzenden...' : 'Wird gesendet...'}
            </span>
          ) : reservationLabels.confirmButton}
        </button>

        <button
          onClick={whatsapp}
          className="w-full rounded-full bg-[#1FA855] text-white font-bold py-4 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          {reservationLabels.whatsappButton}
        </button>
      </div>

      <div className="space-y-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display text-xl text-bone mb-4">{bookingInfo.contactTitle}</h3>
          <ul className="space-y-3 text-sm text-muted">
            {bookingInfo.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-zellige mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted mb-3">💳 {bookingInfo.paymentTitle}</h4>
          <p className="text-sm text-muted">{bookingInfo.paymentDesc}</p>
        </div>

        <div className="glass rounded-2xl p-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted mb-3">📞 {bookingInfo.contactTitle}</h4>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#1FA855] font-semibold hover:underline">
            {bookingInfo.contactPhone}
          </a>
          <p className="text-sm text-muted mt-1">{bookingInfo.contactDesc}</p>
        </div>
      </div>
    </div>
  );
}
