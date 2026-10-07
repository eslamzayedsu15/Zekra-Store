import React, { useState, useEffect, useRef } from 'react';
import { SmartFrameProduct } from '../types';
import { SMART_FRAME_PRODUCT, PAYMENT_CONFIG } from '../data/mockData';
import { ProductGalleryModal } from './ProductGalleryModal';
import { ProductVideoSection } from './ProductVideoSection';
import { ProductReviewsSection } from './ProductReviewsSection';
import {
  ShieldCheck,
  Truck,
  Sparkles,
  Heart,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Check,
  MessageCircle,
  Copy,
  Clock,
  CheckCircle2,
  Lock,
  Layers,
  Baby,
  Smile,
  Home,
  GraduationCap,
  HeartHandshake,
  ArrowLeft,
  Info,
} from 'lucide-react';

interface ProductDetailPageProps {
  product?: SmartFrameProduct;
  onInstantBuy: (size: 'صغير' | 'كبير', color: 'أسود' | 'أبيض') => void;
  onNavigateHome: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product = SMART_FRAME_PRODUCT,
  onInstantBuy,
  onNavigateHome,
}) => {
  // Option state
  const [selectedSize, setSelectedSize] = useState<'صغير' | 'كبير'>('صغير');
  const [selectedColor, setSelectedColor] = useState<'أسود' | 'أبيض'>('أسود');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Lightbox gallery modal state
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  // Deposit account copy states
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // Sticky bottom bar visibility trigger
  const [showStickyBar, setShowStickyBar] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const bottom = heroRef.current.getBoundingClientRect().bottom;
        setShowStickyBar(bottom < 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openGalleryAt = (idx: number) => {
    setGalleryStartIndex(idx);
    setIsGalleryOpen(true);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(type);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const whatsappInquiryUrl = `https://wa.me/${PAYMENT_CONFIG.whatsapp.phone}?text=${encodeURIComponent(
    `أهلاً ذِكرى 🤍 أستفسر عن تصميم برواز الذكريات الذكي (المقاس: ${selectedSize}، لون الفريم: ${selectedColor})`
  )}`;

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#2B101A] pb-20 pt-10">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-[#806B72] font-medium">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-[#35101F] transition-colors cursor-pointer"
          >
            الرئيسية
          </button>
          <span>/</span>
          <span className="text-[#35101F] font-semibold">{product.name}</span>
        </nav>
      </div>

      {/* ========================================================
          PRODUCT HERO / ABOVE THE FOLD
          Mobile: Images first -> Name -> Price -> Options -> CTA
          Desktop: Two columns (Gallery left / Details right)
         ======================================================== */}
      <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT: IMAGE GALLERY (Mobile: Top, Desktop: Left Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Interactive Image Frame */}
            <div
              className="relative aspect-[4/3] sm:aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#F1DDE0] shadow-sm cursor-pointer group"
              onClick={() => openGalleryAt(activeImageIndex)}
            >
              <img
                src={product.images[activeImageIndex]?.url}
                alt={product.images[activeImageIndex]?.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Badges Overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#35101F]/85 backdrop-blur-md text-white text-xs font-semibold shadow-md">
                  {product.badge}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#35101F] text-xs font-bold border border-[#F1DDE0] shadow-sm">
                  {product.images[activeImageIndex]?.tag}
                </span>
              </div>

              {/* Zoom Lightbox Hint Icon */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openGalleryAt(activeImageIndex);
                }}
                className="absolute bottom-4 left-4 p-2.5 rounded-full bg-white/90 text-[#35101F] shadow-lg hover:scale-105 transition-all backdrop-blur-md cursor-pointer"
                title="فتح الصور بالحجم الكامل"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnails Row with Clear Active States */}
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all p-0.5 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#35101F] ring-2 ring-[#EFA0A8]/40 shadow-sm'
                      : 'border-[#F1DDE0] opacity-70 hover:opacity-100 hover:border-[#D96A78]'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-[#35101F]/70 text-white text-[10px] font-bold">
                    {img.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO, SELECTION & PURCHASE */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-right">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-[#D96A78]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <span className="text-xs text-[#806B72] font-semibold">
                  (5.0 · أكثر من 140 تقييم موثق)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#35101F] tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs font-mono text-[#806B72] mt-0.5">
                {product.nameEn}
              </p>
            </div>

            {/* Price Box with Deposit Split */}
            <div className="p-4 rounded-2xl bg-white border border-[#F1DDE0] shadow-xs space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[#35101F] font-mono">
                  {product.price} <span className="text-base font-normal text-[#806B72]">ج.م</span>
                </span>
                <span className="text-sm text-[#806B72] line-through font-mono">
                  {product.originalPrice} ج.م
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EFA0A8]/20 text-[#35101F] font-bold border border-[#F1DDE0]">
                  وفر 250 ج.م
                </span>
              </div>

              {/* Deposit clarification */}
              <div className="pt-2 border-t border-[#F1DDE0] flex items-center justify-between text-xs">
                <span className="font-bold text-[#D96A78]">عربون تأكيد الطلب:</span>
                <span className="font-mono font-bold text-[#35101F]">50 ج.م فقط</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#806B72]">
                <span>المتبقي يُدفع عند الاستلام والمعاينة:</span>
                <span className="font-mono font-bold text-[#35101F]">500 ج.م</span>
              </div>
            </div>

            {/* SELECTION 1: SIZE */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#35101F]">اختر المقاس:</span>
                <span className="text-[#806B72]">
                  {selectedSize === 'صغير' ? 'صغير (15 × 20 سم)' : 'كبير (20 × 30 سم)'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSize('صغير')}
                  className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer ${
                    selectedSize === 'صغير'
                      ? 'border-[#35101F] bg-[#35101F]/5 text-[#35101F] font-bold shadow-xs'
                      : 'border-[#F1DDE0] bg-white text-[#806B72] hover:border-[#D96A78]'
                  }`}
                >
                  <div className="text-xs font-bold">صغير (15 × 20 سم)</div>
                  <div className="text-[10px] text-[#806B72] mt-0.5">مناسب للمكتب والرفوف</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSize('كبير')}
                  className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer ${
                    selectedSize === 'كبير'
                      ? 'border-[#35101F] bg-[#35101F]/5 text-[#35101F] font-bold shadow-xs'
                      : 'border-[#F1DDE0] bg-white text-[#806B72] hover:border-[#D96A78]'
                  }`}
                >
                  <div className="text-xs font-bold">كبير (20 × 30 سم)</div>
                  <div className="text-[10px] text-[#806B72] mt-0.5">مناسب لغرفة النوم والصالون</div>
                </button>
              </div>
            </div>

            {/* SELECTION 2: COLOR */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#35101F]">اختر لون الفريم:</span>
                <span className="text-[#806B72]">
                  {selectedColor === 'أسود' ? 'فريم أسود فخم' : 'فريم أبيض نقي'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedColor('أسود');
                    setActiveImageIndex(0);
                  }}
                  className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                    selectedColor === 'أسود'
                      ? 'border-[#35101F] bg-[#35101F]/5 text-[#35101F] font-bold shadow-xs'
                      : 'border-[#F1DDE0] bg-white text-[#806B72] hover:border-[#D96A78]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">فريم أسود</div>
                    <div className="text-[10px] text-[#806B72]">فخامة داكنة كلاسيكية</div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-stone-900 border border-stone-700" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedColor('أبيض');
                    setActiveImageIndex(1);
                  }}
                  className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                    selectedColor === 'أبيض'
                      ? 'border-[#35101F] bg-[#35101F]/5 text-[#35101F] font-bold shadow-xs'
                      : 'border-[#F1DDE0] bg-white text-[#806B72] hover:border-[#D96A78]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">فريم أبيض</div>
                    <div className="text-[10px] text-[#806B72]">نقاء وبساطة عصرية</div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-white border border-[#F1DDE0]" />
                </button>
              </div>
            </div>

            {/* CALL TO ACTION: INSTANT BUY BUTTON */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => onInstantBuy(selectedSize, selectedColor)}
                className="w-full py-4 px-8 rounded-2xl bg-[#35101F] hover:bg-[#2B101A] text-white font-bold text-sm sm:text-base shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>اشتري دلوقتي (550 ج.م)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-2xl border border-[#F1DDE0] bg-white hover:bg-[#FFF9F5] text-[#35101F] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>استفسار أو مساعدة في التصميم عبر واتساب</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-[#806B72]">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#F1DDE0]">
                <Truck className="w-4 h-4 text-[#D96A78] flex-shrink-0" />
                <span>شحن 4 - 8 أيام لكافة المحافظات</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#F1DDE0]">
                <ShieldCheck className="w-4 h-4 text-[#D96A78] flex-shrink-0" />
                <span>معاينة قبل الدفع للمندوب</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          VIDEO SECTION EMBED
         ======================================================== */}
      <ProductVideoSection
        onBuyClick={() => onInstantBuy(selectedSize, selectedColor)}
      />

      {/* ========================================================
          SECTION 2: PRODUCT SPECIFICATIONS & DETAILS
         ======================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#F1DDE0] shadow-sm space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-[#D96A78] uppercase tracking-wider">
              المواصفات الفنية
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#35101F]">
              تفاصيل ومميزات برواز الذكريات الذكي
            </h2>
            <p className="text-xs sm:text-sm text-[#806B72]">
              صُنع بعناية فائقة ليكون هدية استثنائية تدوم العمر كله:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
            {product.specifications.map((spec, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F1DDE0] flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-[#EFA0A8]/20 flex items-center justify-center text-[#D96A78] flex-shrink-0">
                  <Check className="w-4 h-4 text-[#D96A78]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#35101F]">{spec}</span>
              </div>
            ))}
          </div>

          {/* Materials highlight note */}
          <div className="p-5 rounded-2xl bg-white border border-[#D96A78]/30 flex items-start gap-3 text-right">
            <div className="w-10 h-10 rounded-xl bg-[#FFF9F5] flex items-center justify-center text-[#D96A78] flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#35101F]">جودة الخامات:</h4>
              <p className="text-xs text-[#806B72] leading-relaxed mt-1">
                {product.materialsText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: HOW IT WORKS (5 DETAILED STEPS)
         ======================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold text-[#D96A78] uppercase tracking-wider">
            طريقة الاستخدام
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#35101F]">
            5 خطوات بسيطة من الطلب حتى عيش الذكرى
          </h2>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {product.steps.map((st) => (
            <div
              key={st.number}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#F1DDE0] shadow-2xs flex items-start gap-4 text-right"
            >
              <div className="w-10 h-10 rounded-xl bg-[#35101F] text-[#EFA0A8] font-mono text-sm font-bold flex items-center justify-center flex-shrink-0">
                {st.number}
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="text-sm sm:text-base font-bold text-[#35101F]">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#806B72] leading-relaxed font-light">
                  {st.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION 4: REVIEWS & TESTIMONIALS
         ======================================================== */}
      <ProductReviewsSection />

      {/* ========================================================
          STICKY MOBILE PURCHASE BAR
         ======================================================== */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F1DDE0] p-3 shadow-2xl md:hidden animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div className="text-right">
              <div className="font-mono text-sm font-extrabold text-[#35101F]">
                550 ج.م
              </div>
              <div className="text-[10px] text-[#806B72]">
                (عربون 50 ج.م فقط)
              </div>
            </div>

            <button
              type="button"
              onClick={() => onInstantBuy(selectedSize, selectedColor)}
              className="py-3 px-6 rounded-xl bg-[#35101F] hover:bg-[#2B101A] text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <span>اشتري دلوقتي</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Lightbox Gallery Modal */}
      <ProductGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={product.images}
        initialIndex={galleryStartIndex}
      />
    </div>
  );
};
