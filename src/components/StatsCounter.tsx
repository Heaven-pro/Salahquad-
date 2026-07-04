'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix: string;
}

const STATS: Stat[] = [
  { label: 'Clients satisfaits', value: 2500, suffix: '+', prefix: '' },
  { label: 'Note moyenne', value: 4.9, suffix: '★', prefix: '' },
  { label: 'Excursions / jour', value: 7, suffix: 'j/7', prefix: '' },
  { label: "Années d'expérience", value: 8, suffix: '+', prefix: '' },
];

function AnimatedNumber({
  target,
  duration = 2000,
  suffix,
  prefix = '',
}: {
  target: number;
  duration?: number;
  suffix: string;
  prefix: string;
}) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const isDecimal = target % 1 !== 0;

          function animate(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const val = eased * target;
            setCurrent(isDecimal ? Math.round(val * 10) / 10 : Math.floor(val));
            if (progress < 1) requestAnimationFrame(animate);
          }

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl text-gradient">
      {prefix}
      {current}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
      {STATS.map((stat) => (
        <div key={stat.label} className="text-center">
          <AnimatedNumber target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
          <p className="text-muted text-sm mt-2 font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
