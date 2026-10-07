import React, { useState } from 'react';
import { ZekraLogo } from './ZekraLogo';
import { Menu, X, Package, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTrackOrders: () => void;
  activeRoute: string;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenTrackOrders,
  activeRoute,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const isProductActive = activeRoute.startsWith('/product');

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFF9F5]/95 backdrop-blur-md border-b border-[#F1DDE0] transition-all">
        {/* Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Brand Logo (Right side in RTL) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center text-start group cursor-pointer focus-visible:outline-none rounded-lg p-1"
              aria-label="الرئيسية - متجر ذِكرى"
            >
              <ZekraLogo size="sm" />
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#806B72]">
            <button
              onClick={() => handleNavClick('/')}
              className={`transition-colors hover:text-[#35101F] cursor-pointer pb-1 ${
                activeRoute === '/' ? 'text-[#35101F] font-bold border-b-2 border-[#35101F]' : ''
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => handleNavClick('/products/smart-memory-frame')}
              className={`transition-colors hover:text-[#35101F] cursor-pointer flex items-center gap-1.5 pb-1 ${
                isProductActive ? 'text-[#35101F] font-bold border-b-2 border-[#35101F]' : ''
              }`}
            >
              <span>برواز الذكريات الذكي</span>
              <span className="px-2 py-0.5 rounded-full bg-[#D96A78]/15 text-[#35101F] text-[10px] font-bold border border-[#F1DDE0]">
                550 ج.م
              </span>
            </button>
            <button
              onClick={() => handleNavClick('/how-it-works')}
              className={`transition-colors hover:text-[#35101F] cursor-pointer pb-1 ${
                activeRoute === '/how-it-works' ? 'text-[#35101F] font-bold border-b-2 border-[#35101F]' : ''
              }`}
            >
              طريقة الاستخدام
            </button>
            <button
              onClick={() => handleNavClick('/about')}
              className={`transition-colors hover:text-[#35101F] cursor-pointer pb-1 ${
                activeRoute === '/about' ? 'text-[#35101F] font-bold border-b-2 border-[#35101F]' : ''
              }`}
            >
              عن ذِكرى
            </button>
            <button
              onClick={() => handleNavClick('/contact')}
              className={`transition-colors hover:text-[#35101F] cursor-pointer pb-1 ${
                activeRoute === '/contact' ? 'text-[#35101F] font-bold border-b-2 border-[#35101F]' : ''
              }`}
            >
              تواصل معنا
            </button>
          </nav>

          {/* Desktop Right Action: Quick Track Order */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenTrackOrders}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#806B72] hover:text-[#35101F] px-3 py-2 rounded-xl border border-transparent hover:border-[#F1DDE0] transition-colors cursor-pointer"
            >
              <Package className="w-4 h-4 text-[#D96A78]" />
              <span>تتبع طلبك</span>
            </button>
            <button
              onClick={() => handleNavClick('/products/smart-memory-frame')}
              className="py-2.5 px-5 rounded-xl bg-[#35101F] hover:bg-[#2B101A] text-white font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              طلب البرواز
            </button>
          </div>

          {/* Mobile: Hamburger on the left (RTL end) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-1 rounded-xl text-[#35101F] hover:bg-[#F1DDE0]/60 active:scale-95 transition-all cursor-pointer"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#35101F]/40 backdrop-blur-sm animate-fadeIn">
          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#FFF9F5] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-s border-[#F1DDE0]">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-6 border-b border-[#F1DDE0]">
                <ZekraLogo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-[#806B72] hover:text-[#35101F] hover:bg-[#F1DDE0]/60"
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="py-6 space-y-3">
                <button
                  onClick={() => handleNavClick('/')}
                  className="w-full text-right p-3 rounded-2xl hover:bg-[#F1DDE0]/40 text-[#2B101A] font-semibold text-sm"
                >
                  الرئيسية
                </button>

                <button
                  onClick={() => handleNavClick('/products/smart-memory-frame')}
                  className="w-full text-right p-3.5 rounded-2xl bg-white border border-[#F1DDE0] text-[#35101F] font-bold text-sm flex items-center justify-between shadow-2xs"
                >
                  <span>برواز الذكريات الذكي</span>
                  <span className="text-xs text-[#D96A78] bg-[#EFA0A8]/20 px-2 py-0.5 rounded-full font-mono font-bold">
                    550 ج.م
                  </span>
                </button>

                <button
                  onClick={() => handleNavClick('/how-it-works')}
                  className="w-full text-right p-3 rounded-2xl hover:bg-[#F1DDE0]/40 text-[#806B72] hover:text-[#2B101A] text-sm"
                >
                  طريقة الاستخدام
                </button>

                <button
                  onClick={() => handleNavClick('/about')}
                  className="w-full text-right p-3 rounded-2xl hover:bg-[#F1DDE0]/40 text-[#806B72] hover:text-[#2B101A] text-sm"
                >
                  عن ذِكرى
                </button>

                <button
                  onClick={() => handleNavClick('/contact')}
                  className="w-full text-right p-3 rounded-2xl hover:bg-[#F1DDE0]/40 text-[#806B72] hover:text-[#2B101A] text-sm"
                >
                  تواصل معنا
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTrackOrders();
                  }}
                  className="w-full text-right p-3 rounded-2xl hover:bg-[#F1DDE0]/40 text-[#806B72] hover:text-[#2B101A] text-sm flex items-center gap-2"
                >
                  <Package className="w-4 h-4 text-[#D96A78]" />
                  <span>تتبع طلبك</span>
                </button>
              </div>
            </div>

            {/* Bottom Drawer CTA */}
            <div className="pt-6 border-t border-[#F1DDE0]">
              <button
                onClick={() => handleNavClick('/products/smart-memory-frame')}
                className="w-full py-3.5 rounded-2xl bg-[#35101F] hover:bg-[#2B101A] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>طلب برواز الذكريات الذكي</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
