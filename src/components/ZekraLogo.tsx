import React from 'react';

interface ZekraLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'wordmark';
  theme?: 'dark' | 'light' | 'gold' | 'rose';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ZekraLogo: React.FC<ZekraLogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'dark',
  size = 'md',
}) => {
  // Brand colors: Primary (#35101F), Secondary/Rose Pink (#D96A78), Rose Gold (#C9827F), Warm Cream (#FFF9F5)
  const color =
    theme === 'light'
      ? '#FFF9F5'
      : theme === 'gold' || theme === 'rose'
      ? '#C9827F'
      : '#35101F';

  const secondaryColor =
    theme === 'light'
      ? '#EFA0A8'
      : theme === 'gold' || theme === 'rose'
      ? '#D96A78'
      : '#806B72';

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10 md:h-12',
    lg: 'h-14 md:h-16',
    xl: 'h-20 md:h-24',
  }[size];

  // Render the icon emblem: Groom & Bride with gift box, QR corners, and NFC logo
  const renderIcon = (iconSize = 64) => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Outer rounded frame */}
      <rect
        x="6"
        y="6"
        width="148"
        height="148"
        rx="26"
        stroke={color}
        strokeWidth="11"
        fill="transparent"
      />

      {/* QR Code Corner: Top-Left */}
      <rect x="22" y="22" width="24" height="24" stroke={color} strokeWidth="4.5" fill="none" rx="2" />
      <rect x="28" y="28" width="12" height="12" fill={color} rx="1" />

      {/* QR Code Corner: Top-Right */}
      <rect x="114" y="22" width="24" height="24" stroke={color} strokeWidth="4.5" fill="none" rx="2" />
      <rect x="120" y="28" width="12" height="12" fill={color} rx="1" />

      {/* QR Code Corner: Bottom-Left */}
      <rect x="22" y="114" width="24" height="24" stroke={color} strokeWidth="4.5" fill="none" rx="2" />
      <rect x="28" y="120" width="12" height="12" fill={color} rx="1" />

      {/* QR Code Corner: Bottom-Right */}
      <rect x="114" y="114" width="24" height="24" stroke={color} strokeWidth="4.5" fill="none" rx="2" />
      <rect x="120" y="120" width="12" height="12" fill={color} rx="1" />

      {/* NFC Symbol at bottom center */}
      <g transform="translate(71, 118)">
        <path
          d="M3 18V2C3 2 9 6 9 10C9 14 3 18 3 18Z"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M15 2V18C15 18 9 14 9 10C9 6 15 2 15 2Z"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Silhouette: Groom (Left) */}
      <g fill={color}>
        {/* Head */}
        <circle cx="58" cy="58" r="9.5" />
        {/* Torso & Suit */}
        <path d="M50 71C44 75 42 84 41 97L56 97L56 81L62 81C65 77 62 72 58 71H50Z" />
        {/* Arm extending forward */}
        <path d="M54 78C56 83 62 86 71 85C71 83 69 80 64 78L54 78Z" />
      </g>

      {/* Silhouette: Bride (Right) with Veil */}
      <g fill={color}>
        {/* Head */}
        <circle cx="102" cy="62" r="8.5" />
        {/* Hair bun */}
        <circle cx="108" cy="58" r="4.5" />
        {/* Veil flowing behind */}
        <path
          d="M106 58C112 60 119 67 116 83C114 83 111 78 111 75C110 70 108 64 106 58Z"
          fill={color}
        />
        {/* Dress bodice & neck */}
        <path d="M96 74C93 78 91 87 90 97L112 97C110 90 107 80 102 74H96Z" />
        {/* Arm extending forward */}
        <path d="M98 79C95 83 89 85 82 85C82 83 85 81 90 79L98 79Z" />
      </g>

      {/* The Gift Box with Ribbon in the Center */}
      <g>
        <rect x="71" y="73" width="18" height="17" rx="1.5" fill={color} />
        {/* Ribbon cross in subtle contrasting shade */}
        <rect x="78.5" y="73" width="3" height="17" fill={theme === 'light' ? '#35101F' : '#FFF9F5'} />
        <rect x="71" y="80" width="18" height="3" fill={theme === 'light' ? '#35101F' : '#FFF9F5'} />
        {/* Bow on top */}
        <path
          d="M76 71C73 68 76 66 79 69C80 70 80 72 80 73C79 72 78 72 76 71Z"
          fill={color}
        />
        <path
          d="M84 71C87 68 84 66 81 69C80 70 80 72 80 73C81 72 82 72 84 71Z"
          fill={color}
        />
      </g>
    </svg>
  );

  // Render the typography: Arabic "ذِكرى" + Latin "ZEKRA"
  const renderText = () => (
    <div className="flex flex-col items-start justify-center select-none" dir="rtl">
      {/* Arabic Wordmark with Kasra */}
      <div className="flex items-baseline gap-1 font-bold text-2xl md:text-3xl leading-none tracking-tight">
        <span style={{ color }}>ذِكْـرَى</span>
      </div>
      {/* Latin Wordmark spaced out */}
      <div
        className="font-latin tracking-[0.38em] text-[10px] md:text-xs font-semibold uppercase mt-1 leading-none ps-0.5"
        style={{ color: secondaryColor }}
      >
        ZEKRA
      </div>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderIcon(40)}</div>;
  }

  if (variant === 'wordmark') {
    return <div className={`inline-flex items-center ${className}`}>{renderText()}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 md:gap-3.5 ${className}`}>
      {renderIcon(size === 'sm' ? 36 : size === 'lg' ? 56 : size === 'xl' ? 72 : 44)}
      {renderText()}
    </div>
  );
};
