import React from 'react';
import { ZekraLogo } from './ZekraLogo';
import { Sparkles, Heart, Award, ArrowLeft, ShieldCheck, Smartphone, Layers } from 'lucide-react';
import { SMART_FRAME_BLACK } from '../data/mockData';

interface AboutViewProps {
  onBrowseShop: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBrowseShop }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16 animate-page-enter">
      {/* Brand Hero Narrative */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D96A78] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>قصة علامة ذِكرى</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-[#35101F] tracking-tight leading-tight">
          هديتك مش مجرد حاجة، دي ذكرى بتفضل.
        </h1>
        <p className="text-base sm:text-lg text-[#806B72] leading-relaxed">
          انطلقت ذِكرى من فكرة واحدة ملهمة: أن الصور الورقية جميلة، لكن وراء كل صورة حكاية أكبر وأصوات وضحكات ورسائل تستحق أن تعيش ولا تُنسى.
        </p>
      </div>

      {/* Visual Showcase */}
      <div className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-xl border border-[#F1DDE0]">
        <img
          src={SMART_FRAME_BLACK}
          alt="برواز الذكريات الذكي من ذِكرى"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B101A]/90 via-[#2B101A]/30 to-transparent flex flex-col justify-end p-6 sm:p-12 text-white">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-semibold text-[#EFA0A8]">الفكرة الجوهرية</span>
            <h2 className="text-xl sm:text-3xl font-bold">
              برواز الذكريات الذكي
            </h2>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-light">
              صممنا بروازاً من الأكريليك الآمن والخفيف يدمج تقنية الذاكرة الرقمية (NFC وQR)، لتفتح كل المشاعر بلمسة هاتف واحدة في أي وقت وبخصوصية تامة.
            </p>
          </div>
        </div>
      </div>

      {/* The 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-7 rounded-3xl border border-[#F1DDE0] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F5] border border-[#F1DDE0] flex items-center justify-center text-[#D96A78]">
            <Heart className="w-6 h-6 fill-[#D96A78]" />
          </div>
          <h3 className="text-base font-bold text-[#35101F]">قيمة عاطفية حقيقية</h3>
          <p className="text-xs text-[#806B72] leading-relaxed">
            البرواز يحفظ الصوت والفيديو والرسالة الخاصة وراء صورتك لتكون أغلى هدية يتلقاها شريكك أو عائلتك.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-[#F1DDE0] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F5] border border-[#F1DDE0] flex items-center justify-center text-[#35101F]">
            <Layers className="w-6 h-6 text-[#35101F]" />
          </div>
          <h3 className="text-base font-bold text-[#35101F]">أكريليك نقي بديل للزجاج</h3>
          <p className="text-xs text-[#806B72] leading-relaxed">
            خفيف الوزن وغير قابل للكسر، مع ثبات ألوان فائق وتشطيب يدوي فخم يمنحه مظهراً متحفياً.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-[#F1DDE0] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F5] border border-[#F1DDE0] flex items-center justify-center text-[#C9827F]">
            <Smartphone className="w-6 h-6 text-[#C9827F]" />
          </div>
          <h3 className="text-base font-bold text-[#35101F]">لمسة هاتف واحدة</h3>
          <p className="text-xs text-[#806B72] leading-relaxed">
            لا حاجة لتحميل أي تطبيق؛ فقط قرّب الهاتف من البرواز أو امسح الكود واستمتع باللحظة فوراً.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#F1DDE0] text-center space-y-6 shadow-sm">
        <ZekraLogo size="md" className="mx-auto" />
        <h2 className="text-xl sm:text-2xl font-bold text-[#35101F]">
          جاهز تصنع ذكراك الخاصة؟
        </h2>
        <p className="text-xs sm:text-sm text-[#806B72] max-w-lg mx-auto leading-relaxed">
          اطلب برواز الذكريات الذكي الآن، ونسّق تصميمك وصورك مع فريقنا عبر واتساب خطوة بخطوة.
        </p>
        <button
          onClick={onBrowseShop}
          className="py-3.5 px-8 rounded-2xl bg-[#35101F] hover:bg-[#2B101A] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
        >
          <span>طلب برواز الذكريات الذكي</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
