import React from 'react';
import { ZekraLogo } from './ZekraLogo';

interface PageTransitionLoaderProps {
  isLoading: boolean;
}

export const PageTransitionLoader: React.FC<PageTransitionLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#FFF9F5]/95 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none transition-opacity duration-200 animate-in fade-in"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Centered ZEKRA Logo */}
        <ZekraLogo size="lg" theme="dark" />

        {/* Minimal Thin Rose Gold / Plum Progress Line */}
        <div className="w-24 h-0.5 bg-[#F1DDE0] rounded-full overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 bg-[#D96A78] rounded-full w-1/2 animate-[progress_0.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};
