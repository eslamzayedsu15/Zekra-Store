import React from 'react';
import { ZekraLogo } from './ZekraLogo';
import { Heart, Instagram, Facebook, ShieldCheck, Truck, Sparkles, MessageCircle } from 'lucide-react';
import { PAYMENT_CONFIG } from '../data/mockData';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  return (
    <footer className="bg-[#35101F] text-[#FFF9F5] pt-14 pb-24 md:pb-12 border-t border-[#35101F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Brand Wordmark & Identity */}
          <div className="space-y-4 md:col-span-1">
            <ZekraLogo size="md" theme="light" />
            <p className="text-xs text-[#FFF9F5]/80 leading-relaxed font-light">
              ذِكرى — هديتك مش مجرد حاجة، دي ذكرى بتفضل.
              علامة تجارية متخصصة في ابتكار برواز الذكريات الذكي بتصميم مخصص للمخطوبين والمناسبات السعيدة، يجمع بين أناقة الأكريليك وتقنية استرجاع اللحظات بلمسة واحدة.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${PAYMENT_CONFIG.whatsapp.phone}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D96A78] flex items-center justify-center transition-colors text-white"
                aria-label="واتساب"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D96A78] flex items-center justify-center transition-colors text-white"
                aria-label="إنستجرام"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D96A78] flex items-center justify-center transition-colors text-white"
                aria-label="فيسبوك"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: المنتج الرئيسي */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9827F]">
              المنتج الحصري
            </h4>
            <ul className="space-y-2 text-xs text-[#FFF9F5]/80">
              <li>
                <button
                  onClick={() => onNavigate('/products/smart-memory-frame')}
                  className="hover:text-white transition-colors text-start font-semibold text-[#EFA0A8]"
                >
                  برواز الذكريات الذكي (550 ج.م)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/products/smart-memory-frame')}
                  className="hover:text-white transition-colors text-start"
                >
                  فريم أسود وفريم أبيض
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/products/smart-memory-frame')}
                  className="hover:text-white transition-colors text-start"
                >
                  المقاس الصغير والكبير
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/products/smart-memory-frame')}
                  className="hover:text-white transition-colors text-start"
                >
                  شاهد الفيديو وتفاصيل المنتج
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: عن ذِكرى وكيف نعمل */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9827F]">
              عن ذِكرى
            </h4>
            <ul className="space-y-2 text-xs text-[#FFF9F5]/80">
              <li>
                <button
                  onClick={() => onNavigate('/how-it-works')}
                  className="hover:text-white transition-colors text-start"
                >
                  طريقة الاستخدام
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors text-start"
                >
                  قصة العلامة التجارية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors text-start"
                >
                  تواصل معنا
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: ضمان ومصداقية */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9827F]">
              الضمان والشحن
            </h4>
            <div className="space-y-2.5 text-xs text-[#FFF9F5]/80">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C9827F] flex-shrink-0" />
                <span>شحن لكافة محافظات مصر (4 - 8 أيام)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9827F] flex-shrink-0" />
                <span>عربون 50 ج.م والمتبقي عند الاستلام</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C9827F] flex-shrink-0" />
                <span>أكريليك آمن وخفيف بديل للزجاج</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF9F5]/60">
          <p>© {new Date().getFullYear()} ذِكرى — ZEKRA. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors"
            >
              سياسة الخصوصية
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors"
            >
              الشروط والأحكام
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
