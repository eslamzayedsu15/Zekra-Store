import React from 'react';
import { X, Shield } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#35101F]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F1DDE0] flex flex-col max-h-[85vh]">
        <div className="p-5 border-b border-[#F1DDE0] flex items-center justify-between bg-[#FFF9F5]">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#D96A78]" />
            <h2 className="text-base font-bold text-[#35101F]">
              {type === 'privacy' ? 'سياسة الخصوصية وأمان الذكريات' : 'الشروط والأحكام'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#35101F] hover:bg-[#F1DDE0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#2B101A] leading-relaxed flex-1">
          {type === 'privacy' ? (
            <>
              <h3 className="text-sm font-bold text-[#35101F]">خصوصية صورك وذكرياتك مقدسة</h3>
              <p className="text-[#806B72]">
                في ذِكرى، ندرك تماماً أن الصور والرسائل الصوتية والتسجيلات المرفوعة تمثل أثمن لحظاتك الشخصية. نتعهد بالالتزام التام بالقواعد التالية:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pr-2 text-[#806B72]">
                <li>لا يتم استخدام صوركم أو مشاركتها على وسائل التواصل الاجتماعي إطلاقاً إلا بموافقة كتابية صريحة منكم.</li>
                <li>يتم حذف ملفات الطباعة الخام من أجهزتنا بعد إتمام الشحنة والتأكد من استلام العميل للهدية.</li>
                <li>صفحة الذكرى الرقمية مشفرة برابط سري لا يمكن الوصول إليه إلا عبر مسح الهدية أو مشاركة الرابط من طرفكم.</li>
                <li>يمكنكم طلب قفل صفحة الذكرى بكلمة مرور PIN رقمية لمنع فتحها من قبل أي شخص غير مخول.</li>
              </ul>
            </>
          ) : (
            <>
              <h3 className="text-sm font-bold text-[#35101F]">شروط الطلب والتنفيذ المخصص</h3>
              <p className="text-[#806B72]">
                نظراً لأن جميع منتجات ذِكرى تُصنع وتُنحت يدوياً خصيصاً لكل عميل:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pr-2 text-[#806B72]">
                <li>يتم إرسال بروفة رقمية لكافة التصميمات عبر تطبيق واتساب لمراجعتها قبل بدء عملية الحفر والتنفيذ.</li>
                <li>يحق للعميل معاينة الهدية المادية عند الاستلام للتأكد من مطابقتها التامة للمواصفات المطلوبة قبل دفع المبلغ لمندوب الشحن.</li>
                <li>في حال وجود أي خطأ مصنعي أو كسر أثناء الشحن، نتكفل باستبدال القطعة بالكامل فوراً وبدون أي مصاريف إضافية.</li>
              </ul>
            </>
          )}
        </div>

        <div className="p-4 border-t border-[#F1DDE0] bg-[#FFF9F5] text-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#35101F] text-white text-xs font-semibold hover:bg-[#2B101A] transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
