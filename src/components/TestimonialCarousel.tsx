'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Locale } from '@/lib/i18n';

interface Review {
  name: string;
  location: string;
  textFr: string;
  textEn: string;
  rating: number;
}

export default function TestimonialCarousel({ reviews, locale }: { reviews: Review[]; locale: Locale }) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const total = reviews.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  if (!reviews.length) return null;

  const review = reviews[current];
  const text = locale === 'fr' ? review.textFr : review.textEn;

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="text-center mb-6">
        <svg className="w-10 h-10 mx-auto text-dune/30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </div>

      <div className="text-center transition-all duration-500">
        <div className="flex justify-center gap-1 mb-5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <svg key={i} className="w-5 h-5 star" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <p className="text-lg md:text-xl text-bone/90 leading-relaxed italic mb-6 px-4">&ldquo;{text}&rdquo;</p>

        <div>
          <p className="font-bold text-bone">{review.name}</p>
          <p className="text-sm text-muted">{review.location}</p>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-bone hover:bg-dune/10 transition-all"
        aria-label="Avis précédent"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-bone hover:bg-dune/10 transition-all"
        aria-label="Avis suivant"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="flex justify-center gap-2 mt-8">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${index === current ? 'w-8 bg-dune' : 'w-2 bg-dune/25 hover:bg-dune/50'}`}
            aria-label={`Avis ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
