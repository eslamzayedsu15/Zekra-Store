import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FaqView: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D96A78] uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>كل ما يهمك معرفته</span>
        </div>
        <h1 className="text-3xl font-bold text-[#35101F]">الأسئلة الشائعة</h1>
        <p className="text-xs sm:text-sm text-[#806B72] max-w-md mx-auto leading-relaxed">
          إجابات وافية ومفصلة عن طريقة طلب هدايا ذِكرى، وتقنية التمرير الذكي والشحن في مصر.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#F1DDE0] overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-5 text-start flex items-center justify-between gap-4 font-semibold text-sm text-[#35101F] hover:text-[#D96A78] transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#806B72] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#D96A78]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-[#806B72] leading-relaxed border-t border-[#FFF9F5] animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#F1DDE0] text-center space-y-2 shadow-xs">
        <h3 className="text-sm font-bold text-[#35101F]">هل لديك استفسار آخر؟</h3>
        <p className="text-xs text-[#806B72]">
          فريقنا متاح عبر واتساب للرد الفوري على مدار الساعة ومساعدتك في تجهيز الهدية.
        </p>
        <div className="pt-2">
          <a
            href="https://wa.me/201000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2.5 px-5 bg-[#35101F] hover:bg-[#2B101A] text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
          >
            تحدث معنا على واتساب الآن
          </a>
        </div>
      </div>
    </div>
  );
};
