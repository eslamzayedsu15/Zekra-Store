import React, { useEffect, useState } from 'react';
import { ZekraLogo } from './ZekraLogo';

const STORAGE_KEY = 'zekra_intro_seen_v1';
const EXIT_AFTER = 1750;
const TOTAL = 2200;

/**
 * First-visit brand intro: a short, one-time reveal of the logo.
 * Once the visitor has seen it, the flag in localStorage keeps it away forever.
 */
export const FirstVisitLoader: React.FC = () => {
  const [state, setState] = useState<'off' | 'on' | 'leaving'>('off');

  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      seen = false;
    }
    if (seen) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Private mode / storage disabled: the intro simply plays again.
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setState('on');

    const leaveTimer = window.setTimeout(() => setState('leaving'), EXIT_AFTER);
    const doneTimer = window.setTimeout(() => {
      setState('off');
      document.body.style.overflow = previousOverflow;
    }, TOTAL);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (state === 'off') return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#FFF9F5] ${
        state === 'leaving' ? 'intro-curtain intro-curtain--out' : 'intro-curtain'
      }`}
      role="status"
      aria-live="polite"
      aria-label="جارٍ تحميل متجر ذِكرى"
    >
      {/* Soft romantic glow behind the mark */}
      <div className="absolute w-[420px] h-[420px] rounded-full bg-[#EFA0A8]/20 blur-3xl intro-glow" />

      <div className="relative flex flex-col items-center gap-6 px-6">
        <div className="intro-logo">
          <ZekraLogo size="lg" theme="dark" />
        </div>

        <div className="h-5 overflow-hidden">
          <p className="intro-tagline text-xs sm:text-sm text-[#806B72] font-light">
            هديتك مش مجرد حاجة... دي ذكرى بتفضل.
          </p>
        </div>

        {/* Minimal progress line */}
        <div className="w-36 sm:w-44 h-[3px] rounded-full bg-[#F1DDE0] overflow-hidden">
          <div className="intro-bar h-full w-full rounded-full bg-gradient-to-l from-[#35101F] via-[#D96A78] to-[#EFA0A8]" />
        </div>
      </div>
    </div>
  );
};