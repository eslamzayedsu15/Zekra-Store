import React from 'react';
import logoImage from '../assets/images/zekra-logo.png';
import logoLightImage from '../assets/images/zekra-logo-light.png';

interface ZekraLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'wordmark';
  theme?: 'dark' | 'light' | 'gold' | 'rose';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Official ZEKRA logo artwork.
 * `zekra-logo.png` (dark ink, for light backgrounds) and `zekra-logo-light.png`
 * (cream ink, for dark backgrounds such as the footer).
 */
const LOGO_DARK = logoImage;
const LOGO_LIGHT = logoLightImage;

// Matches the artwork proportions (1870x588) so the cropped variants stay exact.
const ASPECT = 1870 / 588;
const ICON_SHARE = 0.315;
const WORDMARK_START = 0.335;

const HEIGHTS: Record<NonNullable<ZekraLogoProps['size']>, string> = {
  sm: 'h-9 md:h-11',
  md: 'h-12 md:h-14',
  lg: 'h-16 md:h-20',
  xl: 'h-24 md:h-28',
};

const HEIGHTS_PX: Record<NonNullable<ZekraLogoProps['size']>, number> = {
  sm: 44,
  md: 56,
  lg: 80,
  xl: 104,
};

export const ZekraLogo: React.FC<ZekraLogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'dark',
  size = 'md',
}) => {
  // The light ink artwork is the readable option on dark surfaces, so every
  // accent theme maps to it as well.
  const src = theme === 'dark' ? LOGO_DARK : LOGO_LIGHT;

  const artwork = (style: React.CSSProperties, className2 = '') => (
    <img
      src={src}
      alt="ذِكرى — ZEKRA"
      draggable={false}
      decoding="async"
      style={style}
      className={`${className2} max-w-none select-none object-contain`}
    />
  );

  if (variant === 'full') {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <span className={`block ${HEIGHTS[size]}`}>{artwork({}, 'h-full w-auto')}</span>
      </span>
    );
  }

  const height = HEIGHTS_PX[size];
  const fullWidth = height * ASPECT;

  if (variant === 'icon') {
    return (
      <span
        className={`block overflow-hidden ${className}`}
        style={{ width: fullWidth * ICON_SHARE, height }}
      >
        {artwork({ width: fullWidth, height, display: 'block' })}
      </span>
    );
  }

  const wordmarkWidth = fullWidth * (1 - WORDMARK_START);
  return (
    <span
      className={`block overflow-hidden ${className}`}
      style={{ width: wordmarkWidth, height }}
    >
      {artwork({
        width: fullWidth,
        height,
        display: 'block',
        marginInlineStart: -fullWidth * WORDMARK_START,
      })}
    </span>
  );
};