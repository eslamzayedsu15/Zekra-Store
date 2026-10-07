import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Truck, MessageCircle } from 'lucide-react';

export const TrustBenefitsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="مميزات وخدمات ذِكرى"
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 filter-none'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5">
        {/* Benefit 1: عربون 50 جنيه */}
        <div
          className={`bg-white rounded-2xl p-4 sm:p-5 border border-[#F1DDE0] shadow-2xs flex items-center gap-3.5 text-right transition-all duration-700 ease-out hover:-translate-y-0.5 hover:shadow-sm ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: isVisible ? '100ms' : '0ms' }}
        >
          <div className="w-11 h-11 rounded-xl bg-[#FFF9F5] border border-[#F1DDE0] flex items-center justify-center text-[#D96A78] shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#D96A78]" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs sm:text-sm font-bold text-[#35101F]">عربون 50 جنيه</h3>
            <p className="text-[11px] text-[#806B72] mt-0.5 font-light">
              والباقي عند الاستلام والمعاينة
            </p>
          </div>
        </div>

        {/* Benefit 2: شحن لكل مصر */}
        <div
          className={`bg-white rounded-2xl p-4 sm:p-5 border border-[#F1DDE0] shadow-2xs flex items-center gap-3.5 text-right transition-all duration-700 ease-out hover:-translate-y-0.5 hover:shadow-sm ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: isVisible ? '220ms' : '0ms' }}
        >
          <div className="w-11 h-11 rounded-xl bg-[#FFF9F5] border border-[#F1DDE0] flex items-center justify-center text-[#D96A78] shrink-0">
            <Truck className="w-5 h-5 text-[#D96A78]" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs sm:text-sm font-bold text-[#35101F]">شحن لكل مصر</h3>
            <p className="text-[11px] text-[#806B72] mt-0.5 font-light">
              لحد باب بيتك (4 - 8 أيام عمل)
            </p>
          </div>
        </div>

        {/* Benefit 3: تصميمك علينا */}
        <div
          className={`bg-white rounded-2xl p-4 sm:p-5 border border-[#F1DDE0] shadow-2xs flex items-center gap-3.5 text-right transition-all duration-700 ease-out hover:-translate-y-0.5 hover:shadow-sm ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: isVisible ? '340ms' : '0ms' }}
        >
          <div className="w-11 h-11 rounded-xl bg-[#FFF9F5] border border-[#F1DDE0] flex items-center justify-center text-[#D96A78] shrink-0">
            <MessageCircle className="w-5 h-5 text-[#D96A78]" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs sm:text-sm font-bold text-[#35101F]">تصميمك علينا</h3>
            <p className="text-[11px] text-[#806B72] mt-0.5 font-light">
              نسّق هديتك وصورك عبر واتساب
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
