import React from 'react';
import { Sparkles, MessageCircle, ArrowLeft, Smartphone, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { PAYMENT_CONFIG, SMART_FRAME_PRODUCT } from '../data/mockData';

interface HowItWorksViewProps {
  onBrowseShop: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onBrowseShop }) => {
  const whatsappUrl = `https://wa.me/${PAYMENT_CONFIG.whatsapp.phone}?text=${encodeURIComponent(
    'أهلاً ذِكرى، أود معرفة المزيد عن طريقة طلب وتصميم برواز الذكريات الذكي 🤍'
  )}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16 animate-page-enter">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D96A78] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>بساطة التجربة</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#35101F] tracking-tight">
          طريقة استخدام وطلب برواز الذكريات الذكي
        </h1>
        <p className="text-xs sm:text-sm text-[#806B72] leading-relaxed">
          العملية كلها سهلة ومش بتاخد أكتر من 5 دقايق، وفريقنا بينسق معاك كل التفاصيل على واتساب خطوة بخطوة.
        </p>
      </div>

      {/* 5 Steps Grid */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {SMART_FRAME_PRODUCT.steps.map((step) => (
          <div
            key={step.number}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F1DDE0] shadow-xs flex items-start gap-5 hover:border-[#D96A78] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#35101F] text-[#EFA0A8] font-mono text-base font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
              {step.number}
            </div>

            <div className="space-y-1.5 flex-1 text-right">
              <h3 className="text-base sm:text-lg font-bold text-[#35101F]">{step.title}</h3>
              <p className="text-xs sm:text-sm text-[#806B72] leading-relaxed font-light">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp Customization Guarantee */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#F1DDE0] max-w-3xl mx-auto text-center space-y-4 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#FFF9F5] text-[#35101F] border border-[#F1DDE0] flex items-center justify-center mx-auto shadow-sm">
          <MessageCircle className="w-7 h-7 text-[#D96A78]" />
        </div>
        <h3 className="text-xl font-bold text-[#35101F]">
          مش هتعمل التصميم لوحدك
        </h3>
        <p className="text-xs sm:text-sm text-[#806B72] max-w-xl mx-auto leading-relaxed">
          بعد تأكيد الطلب، بنتواصل معاك على واتساب، تبعتلنا الصور والأفكار والمناسبة، ونتفق معاك على شكل التصميم والمحتوى النهائي قبل بدء التنفيذ.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-6 rounded-2xl bg-[#35101F] hover:bg-[#2B101A] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-[#EFA0A8]" />
            <span>تواصل مباشرة عبر واتساب</span>
          </a>
          <button
            type="button"
            onClick={onBrowseShop}
            className="py-3 px-6 rounded-2xl border border-[#F1DDE0] text-[#35101F] text-xs sm:text-sm font-semibold hover:bg-[#FFF9F5] transition-all cursor-pointer"
          >
            طلب برواز الذكريات (550 ج.م)
          </button>
        </div>
      </div>
    </div>
  );
};
