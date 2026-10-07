import React from 'react';
import { Home, Sparkles, Package, ArrowLeft } from 'lucide-react';

interface MobileBottomBarProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
  onOpenTrackOrders: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  activeRoute,
  onNavigate,
  onOpenTrackOrders,
}) => {
  const isHome = activeRoute === '/';
  const isProduct = activeRoute.startsWith('/product');

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF9F5]/95 backdrop-blur-md border-t border-[#F1DDE0] px-3 py-2 pb-safe shadow-[0_-4px_20px_rgba(53,16,31,0.06)]"
      aria-label="شريط التنقل السفلي"
    >
      <div className="flex items-center justify-between max-w-md mx-auto gap-1">
        {/* Home */}
        <button
          onClick={() => onNavigate('/')}
          className={`flex flex-col items-center justify-center min-w-[54px] py-1 rounded-xl transition-colors cursor-pointer ${
            isHome ? 'text-[#35101F] font-bold' : 'text-[#806B72] hover:text-[#35101F]'
          }`}
        >
          <Home className={`w-5 h-5 ${isHome ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] mt-0.5">الرئيسية</span>
        </button>

        {/* The Hero Product */}
        <button
          onClick={() => onNavigate('/products/smart-memory-frame')}
          className={`flex flex-col items-center justify-center min-w-[64px] py-1 rounded-xl transition-colors cursor-pointer ${
            isProduct ? 'text-[#35101F] font-bold' : 'text-[#806B72] hover:text-[#35101F]'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${isProduct ? 'stroke-[2.5] text-[#D96A78]' : 'stroke-2 text-[#D96A78]'}`} />
          <span className="text-[11px] mt-0.5">البراوز الذكي</span>
        </button>

        {/* Order tracking */}
        <button
          onClick={onOpenTrackOrders}
          className="flex flex-col items-center justify-center min-w-[54px] py-1 rounded-xl text-[#806B72] hover:text-[#35101F] transition-colors cursor-pointer"
        >
          <Package className="w-5 h-5 stroke-2" />
          <span className="text-[11px] mt-0.5">تتبع طلبك</span>
        </button>

        {/* Quick Instant Buy - Emphasized Primary CTA */}
        <button
          onClick={() => onNavigate('/products/smart-memory-frame')}
          className="py-2.5 px-4 rounded-xl bg-[#35101F] hover:bg-[#2B101A] text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <span>اطلب هديتك</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </nav>
  );
};
