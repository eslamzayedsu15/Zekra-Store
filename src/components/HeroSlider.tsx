import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Truck,
  MessageCircle,
  Star,
} from 'lucide-react';
import { SMART_FRAME_PRODUCT, SMART_FRAME_BLACK, SMART_FRAME_WHITE } from '../data/mockData';

interface HeroSliderProps {
  onDiscover: () => void;
}

interface SlideItem {
  id: string;
  image: string;
  title: string;
  tag: string;
  subtitle: string;
  price: string;
  oldPrice: string;
}

const SLIDES: SlideItem[] = [
  {
    id: 'black-frame',
    image: SMART_FRAME_BLACK,
    title: 'برواز الذكريات الذكي · فريم أسود',
    tag: 'الإصدار الأكثر طلباً',
    subtitle: 'أكريليك نقي مقاوم للصدمات مع كود ذاكرة وشريحة NFC',
    price: '550 ج.م',
    oldPrice: '800 ج.م',
  },
  {
    id: 'white-frame',
    image: SMART_FRAME_WHITE,
    title: 'برواز الذكريات الذكي · فريم أبيض',
    tag: 'أناقة ونقاء هادئ',
    subtitle: 'تصميم مينيمال عصري يمنح مساحتك لمسة نور وسكينة',
    price: '550 ج.م',
    oldPrice: '800 ج.م',
  },
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onDiscover }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch Swipe State
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<any>(null);

  // Auto-play interval
  useEffect(() => {
    if (isPaused) return;

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
  };

  // Mobile Touch handlers (RTL aware)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      const threshold = 40; // minimum swipe distance

      if (diff > threshold) {
        // Swipe left (in RTL: next slide)
        setCurrentSlide(1);
      } else if (diff < -threshold) {
        // Swipe right (in RTL: prev slide)
        setCurrentSlide(0);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;

    // Resume autoplay after 4s
    setTimeout(() => setIsPaused(false), 4000);
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-3 sm:pt-8 pb-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ================= HERO TEXT COLUMN ================= */}
        <div className="lg:col-span-6 space-y-5 text-center lg:text-start flex flex-col items-center lg:items-start">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#35101F] leading-[1.26] md:leading-[1.16]">
            هديتك مش مجرد حاجة... <br />
            <span className="text-[#D96A78]">دي ذكرى بتفضل.</span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#806B72] max-w-lg leading-relaxed font-light">
            هدايا مميزة للمخطوبين والأزواج، مصممة مخصوص علشان تخلّي كل لحظة ذكرى.
          </p>

          {/* Primary CTA */}
          <div className="pt-1 w-full sm:w-auto">
            <button
              type="button"
              onClick={onDiscover}
              className="w-full sm:w-auto py-4 px-10 bg-[#35101F] hover:bg-[#2B101A] text-white rounded-2xl font-bold text-sm sm:text-base transition-all shadow-xl active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>اكتشف الهدايا ←</span>
            </button>
          </div>

          {/* Subtle rating guarantee bar */}
          <div className="flex items-center gap-2 pt-1 text-xs text-[#806B72]">
            <div className="flex items-center text-[#D96A78]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#D96A78] text-[#D96A78]" />
              ))}
            </div>
            <span className="font-semibold text-[#35101F]">5.0 من 5</span>
            <span>· أكثر من 140 عريس وعروسة وثّقوا ذكراهم معنا</span>
          </div>
        </div>

        {/* ================= HERO PRODUCT SHOWCASE CARD / SLIDER ================= */}
        <div className="lg:col-span-6 relative w-full">
          <div
            className="relative rounded-3xl overflow-hidden bg-white shadow-xl border border-[#F1DDE0] select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Floating Header Tag: "الأكثر طلبًا" */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#35101F] text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#EFA0A8]" />
                <span>الأكثر طلبًا</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#35101F] text-xs font-semibold border border-[#F1DDE0] shadow-xs">
                {SLIDES[currentSlide].tag}
              </span>
            </div>

            {/* Large Product Image Frame with Slide Track */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#2B101A]">
              <div
                className="flex h-full w-full transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(${currentSlide * 100}%)`,
                }}
              >
                {SLIDES.map((slide, index) => (
                  <div
                    key={slide.id}
                    onClick={onDiscover}
                    className="relative min-w-full h-full cursor-pointer group"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B101A]/85 via-transparent to-transparent" />
                  </div>
                ))}
              </div>

              {/* Slider Arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-[#35101F] shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer"
                aria-label="السابق"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-[#35101F] shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer"
                aria-label="التالي"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Slider Dots */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-[#35101F]/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'w-5 bg-[#D96A78]' : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`شريحة ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Showcase Card Details Bottom Panel */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#F1DDE0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-right">
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#35101F] truncate">
                    {SMART_FRAME_PRODUCT.name}
                  </h3>
                  <div className="flex items-center text-[#D96A78] text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#D96A78]" />
                    <span className="font-mono font-bold ms-1 text-[#35101F]">5.0</span>
                  </div>
                </div>
                <p className="text-xs text-[#806B72] truncate">
                  {SLIDES[currentSlide].subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F1DDE0]">
                <div className="text-right sm:text-left">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base sm:text-lg font-black text-[#35101F] font-mono">
                      {SMART_FRAME_PRODUCT.price} ج.م
                    </span>
                    <span className="text-xs text-[#806B72] line-through font-mono">
                      {SMART_FRAME_PRODUCT.originalPrice} ج.م
                    </span>
                  </div>
                  <span className="text-[10px] text-[#D96A78] font-bold block">
                    عربون 50 ج.م فقط
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onDiscover}
                  className="py-2.5 px-4 rounded-xl bg-[#35101F] hover:bg-[#2B101A] text-white text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>شوف التفاصيل →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
