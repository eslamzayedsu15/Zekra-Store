/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { SmartFrameProduct, Order } from './types';
import {
  SMART_FRAME_PRODUCT,
  HERO_IMAGE,
  SMART_FRAME_BLACK,
  SMART_FRAME_WHITE,
  SMART_FRAME_CLOSEUP,
  DEMO_DIGITAL_MEMORY,
  PAYMENT_CONFIG,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { ProductVideoSection } from './components/ProductVideoSection';
import { ProductReviewsSection } from './components/ProductReviewsSection';
import { HeroSlider } from './components/HeroSlider';
import { TrustBenefitsSection } from './components/TrustBenefitsSection';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { DigitalMemoryView } from './components/DigitalMemoryView';
import { TrackOrderModal } from './components/TrackOrderModal';
import { AboutView } from './components/AboutView';
import { HowItWorksView } from './components/HowItWorksView';
import { FaqView } from './components/FaqView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { PageTransitionLoader } from './components/PageTransitionLoader';
import {
  Sparkles,
  ArrowLeft,
  Heart,
  ShieldCheck,
  Truck,
  MessageCircle,
  CheckCircle2,
  Layers,
  Smartphone,
  Star,
  Paintbrush,
  Gift,
  ArrowRight,
} from 'lucide-react';

export default function App() {
  // Navigation & Real URL Routing State
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Modals & States
  const [isTrackOrdersOpen, setIsTrackOrdersOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);

  // Selected options for instant checkout transition
  const [checkoutOptions, setCheckoutOptions] = useState<{
    size: 'صغير' | 'كبير';
    color: 'أسود' | 'أبيض';
  }>({
    size: 'صغير',
    color: 'أسود',
  });

  // Saved Orders in LocalStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('zekra_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zekra_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Handle browser back and forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global Navigation with real URLs and ZEKRA loading animation
  const navigate = useCallback((path: string, options: { instant?: boolean } = {}) => {
    if (path === window.location.pathname && !options.instant) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (options.instant) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsPageLoading(true);
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setIsPageLoading(false);
    }, 280);
  }, []);

  const handleStartInstantBuy = (size: 'صغير' | 'كبير', color: 'أسود' | 'أبيض') => {
    setCheckoutOptions({ size, color });
    navigate('/checkout');
  };

  const handleOrderComplete = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setConfirmedOrder(order);
  };

  // ROUTE RESOLUTION
  const renderRouteView = () => {
    // 1. Dedicated Product Page: /products/smart-memory-frame or /products/:slug
    if (currentPath.startsWith('/products/') || currentPath.startsWith('/product/')) {
      return (
        <ProductDetailPage
          product={SMART_FRAME_PRODUCT}
          onInstantBuy={handleStartInstantBuy}
          onNavigateHome={() => navigate('/')}
        />
      );
    }

    // 2. Dedicated Single-Product Checkout Page: /checkout
    if (currentPath === '/checkout') {
      return (
        <CheckoutPage
          product={SMART_FRAME_PRODUCT}
          initialSize={checkoutOptions.size}
          initialColor={checkoutOptions.color}
          onBackToProduct={() => navigate('/products/smart-memory-frame')}
          onOrderComplete={handleOrderComplete}
        />
      );
    }

    // 3. How It Works: /how-it-works
    if (currentPath === '/how-it-works') {
      return (
        <HowItWorksView
          onBrowseShop={() => navigate('/products/smart-memory-frame')}
        />
      );
    }

    // 4. About: /about
    if (currentPath === '/about') {
      return (
        <AboutView
          onBrowseShop={() => navigate('/products/smart-memory-frame')}
        />
      );
    }

    // 5. FAQ: /faq
    if (currentPath === '/faq') {
      return <FaqView />;
    }

    // 6. Contact: /contact
    if (currentPath === '/contact') {
      return <ContactView />;
    }

    // 7. Digital Memory Demo: /memory
    if (currentPath === '/memory' || currentPath.startsWith('/memory/')) {
      return (
        <DigitalMemoryView
          memory={DEMO_DIGITAL_MEMORY}
          onBackToStore={() => navigate('/')}
        />
      );
    }

    // ========================================================
    // 8. NEW HOMEPAGE HIERARCHY:
    // 1. HEADER (in main return)
    // 2. HERO & PRODUCT SHOWCASE
    // 3. TRUST / SERVICE BENEFITS
    // 4. CATEGORIES (اختار هديتك)
    // 5. BEST SELLERS / FEATURED PRODUCTS (الأكثر طلباً)
    // 6. PERSONALIZED / SPECIAL GIFT SECTION (خلي هديتك شبه صاحبها)
    // 7. SOCIAL PROOF / CUSTOMER REVIEWS (ذكرياتهم بتتكلم عنّا)
    // 8. FINAL CTA (جاهز تعمل ذكرى؟)
    // 9. FOOTER (in main return)
    // 10. MOBILE BOTTOM NAVIGATION (in main return)
    // ========================================================
    return (
      <div className="space-y-14 sm:space-y-20 animate-page-enter">
        {/* ================= 2. HERO SECTION & HERO PRODUCT SHOWCASE ================= */}
        <HeroSlider onDiscover={() => navigate('/products/smart-memory-frame')} />

        {/* ================= 3. TRUST / SERVICE BENEFITS ================= */}
        <TrustBenefitsSection />

        {/* ================= 4. CATEGORIES: اختار هديتك ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#35101F]">
              اختار هديتك ❤️
            </h2>
            <p className="text-xs sm:text-sm text-[#806B72] font-light">
              خلّي اختيارك أسهل حسب المناسبة
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
            {SMART_FRAME_PRODUCT.benefits.slice(0, 4).map((cat, idx) => (
              <div
                key={idx}
                onClick={() => navigate('/products/smart-memory-frame')}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F1DDE0] shadow-2xs hover:border-[#D96A78] hover:shadow-sm transition-all cursor-pointer group text-right flex flex-col justify-between min-h-[130px]"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#FFF9F5] border border-[#F1DDE0] flex items-center justify-center text-[#35101F] group-hover:bg-[#EFA0A8]/20 transition-colors mb-3">
                    <Heart className="w-4 h-4 text-[#D96A78] fill-[#D96A78]/30" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#35101F] group-hover:text-[#D96A78] transition-colors">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-[11px] text-[#806B72] font-light leading-relaxed line-clamp-2 mt-1">
                  {cat.subtitle}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 5. BEST SELLERS / FEATURED PRODUCTS ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#35101F]">
              الأكثر طلبًا ❤️
            </h2>
            <p className="text-xs sm:text-sm text-[#806B72] font-light">
              هدايا اختارها ناس كتير لذكرياتهم
            </p>
          </div>

          {/* Grid of the 2 variations (Black & White editions) with dynamic data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 1: Black Frame Edition */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F1DDE0] shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-right">
              <div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#2B101A] mb-4">
                  <img
                    src={SMART_FRAME_BLACK}
                    alt="برواز الذكريات الذكي فريم أسود"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#35101F]/85 backdrop-blur-md text-white text-[11px] font-bold">
                    الإصدار الأكثر طلباً
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 text-[#35101F] text-[10px] font-bold border border-[#F1DDE0]">
                    فريم أسود
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-base font-bold text-[#35101F]">
                    {SMART_FRAME_PRODUCT.name} · فريم أسود
                  </h3>
                  <div className="flex items-center text-[#D96A78] text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#D96A78]" />
                    <span className="font-mono font-bold ms-1 text-[#35101F]">5.0</span>
                  </div>
                </div>

                <p className="text-xs text-[#806B72] font-light leading-relaxed line-clamp-2 mb-3">
                  أكريليك نقي مقاوم للصدمات، مع شريحة NFC وكود QR يفتح صفحة ذكرياتكم الخاصة بلمسة هاتف.
                </p>
              </div>

              <div className="pt-3 border-t border-[#F1DDE0] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-[#35101F] font-mono">
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
                  onClick={() => navigate('/products/smart-memory-frame')}
                  className="py-2.5 px-5 rounded-xl bg-[#35101F] hover:bg-[#2B101A] text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  اطلب الآن
                </button>
              </div>
            </div>

            {/* Card 2: White Frame Edition */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F1DDE0] shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-right">
              <div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#2B101A] mb-4">
                  <img
                    src={SMART_FRAME_WHITE}
                    alt="برواز الذكريات الذكي فريم أبيض"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#35101F] text-[11px] font-bold border border-[#F1DDE0]">
                    أناقة ونقاء هادئ
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 text-[#35101F] text-[10px] font-bold border border-[#F1DDE0]">
                    فريم أبيض
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-base font-bold text-[#35101F]">
                    {SMART_FRAME_PRODUCT.name} · فريم أبيض
                  </h3>
                  <div className="flex items-center text-[#D96A78] text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#D96A78]" />
                    <span className="font-mono font-bold ms-1 text-[#35101F]">5.0</span>
                  </div>
                </div>

                <p className="text-xs text-[#806B72] font-light leading-relaxed line-clamp-2 mb-3">
                  تصميم مينيمال عصري يمنح مساحتك لمسة نور وسكينة، مناسب لغرف النوم والمكاتب الأنيقة.
                </p>
              </div>

              <div className="pt-3 border-t border-[#F1DDE0] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-[#35101F] font-mono">
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
                  onClick={() => navigate('/products/smart-memory-frame')}
                  className="py-2.5 px-5 rounded-xl bg-[#35101F] hover:bg-[#2B101A] text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  اطلب الآن
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 6. PERSONALIZED / SPECIAL GIFT SECTION ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#F1DDE0] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Product Visual */}
              <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#2B101A] border border-[#F1DDE0]">
                <img
                  src={SMART_FRAME_CLOSEUP}
                  alt="تفاصيل تخصيص الهدية في ذِكرى"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 text-white text-right">
                  <span className="text-xs text-[#EFA0A8] font-semibold">حفر ليزري وتقنية ذكية</span>
                  <p className="text-sm font-bold">كل برواز بيتصنع مخصوص ليك</p>
                </div>
              </div>

              {/* Text & CTA */}
              <div className="lg:col-span-6 space-y-5 text-right">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D96A78] bg-[#EFA0A8]/20 px-3.5 py-1.5 rounded-full border border-[#F1DDE0]">
                  <Paintbrush className="w-3.5 h-3.5" />
                  <span>تخصيص كامل حسب طلبك</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#35101F] tracking-tight leading-snug">
                  خلي هديتك شبه صاحبها ❤️
                </h2>

                <p className="text-sm sm:text-base text-[#806B72] font-light leading-relaxed">
                  اختار التفاصيل، نسّق التصميم، وخلي الهدية تحكي حكايتكم. بعد تأكيد الطلب، بنتواصل معاك على واتساب خطوة بخطوة عشان نتفق على الصورة، التسجيل الصوتي، والفيديوهات قبل ما نبدأ التنفيذ.
                </p>

                <div className="space-y-2 text-xs text-[#2B101A] font-medium pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D96A78]" />
                    <span>رفع صور وفيديوهات ورسائل وتسجيلات صوتية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D96A78]" />
                    <span>معاينة البروفة الرقمية على واتساب قبل الطباعة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D96A78]" />
                    <span>حماية بكلمة سر اختيارية لخصوصية الذكرى</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/products/smart-memory-frame')}
                    className="py-3.5 px-8 rounded-2xl bg-[#35101F] hover:bg-[#2B101A] text-white font-bold text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>صمّم هديتك</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 7. SOCIAL PROOF / CUSTOMER REVIEWS ================= */}
        <section className="border-t border-[#F1DDE0] pt-12">
          <div className="text-center max-w-xl mx-auto mb-4 space-y-1.5 px-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#35101F]">
              ذكرياتهم بتتكلم عنّا ❤️
            </h2>
            <p className="text-xs sm:text-sm text-[#806B72] font-light">
              تجارب حقيقية شاركها عملاؤنا بعد استلام برواز الذكريات الذكي
            </p>
          </div>
          <ProductReviewsSection />
        </section>

        {/* ================= 8. FINAL EMOTIONAL CTA ================= */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="bg-[#35101F] text-[#FFF9F5] rounded-3xl p-8 sm:p-14 text-center space-y-5 shadow-xl relative overflow-hidden">
            {/* Subtle romantic corner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D96A78]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EFA0A8]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#EFA0A8] text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>لحظات تدوم للأبد</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              جاهز تعمل ذكرى؟ ❤️
            </h2>

            <p className="text-xs sm:text-base text-[#FFF9F5]/80 max-w-lg mx-auto font-light leading-relaxed">
              اختار هديتك وخلي اللحظة تعيش أكتر.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/products/smart-memory-frame')}
                className="py-4 px-10 bg-white hover:bg-[#FFF9F5] text-[#35101F] rounded-2xl font-bold text-sm sm:text-base shadow-lg transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>اكتشف الهدايا ←</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#2B101A] flex flex-col font-sans">
      {/* Global Page Transition Loader with official ZEKRA logo */}
      <PageTransitionLoader isLoading={isPageLoading} />

      {/* 1. Primary Header Navigation */}
      <Navbar
        cartCount={0}
        onOpenCart={() => navigate('/products/smart-memory-frame')}
        onOpenTrackOrders={() => setIsTrackOrdersOpen(true)}
        activeRoute={currentPath}
        onNavigate={navigate}
      />

      {/* Active Page View */}
      <main className="flex-1 pb-20 md:pb-0">{renderRouteView()}</main>

      {/* 11. Floating WhatsApp Quick Action Button - Balanced, accessible, with subtle shadow */}
      <a
        href={`https://wa.me/${PAYMENT_CONFIG.whatsapp.phone}?text=${encodeURIComponent(
          PAYMENT_CONFIG.whatsapp.defaultMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-22 md:bottom-6 left-5 z-40 w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:bg-[#20BA5A] transition-all flex items-center justify-center hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="تواصل فوري عبر واتساب"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="sr-only">تواصل عبر واتساب</span>
      </a>

      {/* 12. Mobile Bottom Navigation Bar */}
      <MobileBottomBar
        activeRoute={currentPath}
        onNavigate={navigate}
        onOpenTrackOrders={() => setIsTrackOrdersOpen(true)}
      />

      {/* 10. Footer */}
      <Footer
        onNavigate={navigate}
        onOpenPrivacy={() => setLegalType('privacy')}
        onOpenTerms={() => setLegalType('terms')}
      />

      {/* Order Confirmation Screen */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onNavigateHome={() => navigate('/')}
      />

      {/* Track Orders Modal */}
      <TrackOrderModal
        isOpen={isTrackOrdersOpen}
        onClose={() => setIsTrackOrdersOpen(false)}
        orders={orders}
        onOpenDigitalMemory={() => {
          setIsTrackOrdersOpen(false);
          navigate('/memory');
        }}
      />

      {/* Legal & Privacy Policy Modal */}
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />
    </div>
  );
}
