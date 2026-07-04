'use client';

import type { SVGProps } from 'react';

export type IconName = 'shield' | 'guide' | 'transfer' | 'price' | 'quad' | 'buggy' | 'cross';

type AppIconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export default function AppIcon({ name, ...props }: AppIconProps) {
  switch (name) {
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M12 2 4.5 5.2v5.6c0 4.9 3.2 9 7.5 11.2 4.3-2.2 7.5-6.3 7.5-11.2V5.2L12 2Z" />
          <path d="m9.2 12.1 1.9 1.9 3.8-4" />
        </svg>
      );
    case 'guide':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M8 7.5 12 4l4 3.5" />
          <path d="M7 8h10v3H7z" />
          <path d="M9 11v4l-3 4" />
          <path d="M15 11v4l3 4" />
          <path d="M10 15h4" />
        </svg>
      );
    case 'transfer':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M3 13h11l3-4h2a2 2 0 0 1 2 2v5h-2" />
          <path d="M6 18a2 2 0 1 0 0 .01M18 18a2 2 0 1 0 0 .01" />
          <path d="M4 7h8" />
          <path d="M4 10h6" />
        </svg>
      );
    case 'price':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
          <path d="M12 7v10" />
          <path d="M9.5 9.5h3.2a1.8 1.8 0 0 1 0 3.6H11a1.8 1.8 0 0 0 0 3.6h3.2" />
        </svg>
      );
    case 'quad':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M6.2 13.5h11.6l1.2 3.5H5l1.2-3.5Z" />
          <path d="M7.6 13.5 9 9.5h6l1.4 4" />
          <path d="M8.2 17.2a1.5 1.5 0 1 0 0 .01M15.8 17.2a1.5 1.5 0 1 0 0 .01" />
          <path d="M6.6 9.5 5.5 12.2M17.4 9.5l1.1 2.7" />
        </svg>
      );
    case 'buggy':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M5 14.5 7 10h10l2 4.5" />
          <path d="M7.5 10 9 7.5h6L16.5 10" />
          <path d="M7.2 17a1.7 1.7 0 1 0 0 .01M16.8 17a1.7 1.7 0 1 0 0 .01" />
          <path d="M3.5 13.8h17" />
          <path d="M9 10.5h6" />
        </svg>
      );
    case 'cross':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M6 18h12" />
          <path d="M8 18V8l4-2 4 2v10" />
          <path d="M16 6h3l1 2-1 2h-3" />
          <path d="M8 12h8" />
          <path d="M4 18l2-4h2" />
        </svg>
      );
    default:
      return null;
  }
}
