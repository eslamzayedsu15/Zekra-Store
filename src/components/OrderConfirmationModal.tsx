import React, { useState } from 'react';
import { Order } from '../types';
import { PAYMENT_CONFIG } from '../data/mockData';
import {
  Check,
  Heart,
  MessageCircle,
  Copy,
  ExternalLink,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onNavigateHome: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onNavigateHome,
}) => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  if (!order) return null;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(type);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `أهلاً ذِكرى 🤍\nلقد قمت بطلب برواز الذكريات الذكي!\n\nرقم الأوردر: #${order.orderNumber}\nالاسم: ${order.customerName}\nالمقاس: ${order.selectedSize}\nلون الفريم: ${order.selectedColor}\nطريقة دفع العربون: ${
      order.depositMethod === 'vodafone_cash' ? 'فودافون كاش' : 'إنستا باي'
    }\n\nأود إرسال صورة البرواز والتفاصيل للبدء في التصميم ✨`
  );

  const whatsappUrl = `https://wa.me/${PAYMENT_CONFIG.whatsapp.phone}?text=${whatsappMessage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#35101F]/80 backdrop-blur-sm overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-lg my-8 rounded-3xl bg-white border border-[#F1DDE0] shadow-2xl p-6 sm:p-8 text-[#2B101A] text-right overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-[#D96A78] via-[#EFA0A8] to-[#C9827F]" />

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#EFA0A8]/20 text-[#35101F] flex items-center justify-center mx-auto mb-4 shadow-inner">
          <CheckCircle2 className="w-9 h-9 text-[#D96A78]" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-center text-[#35101F] mb-1">
          تم استلام طلبك بنجاح!
        </h2>
        <p className="text-xs sm:text-sm text-center text-[#806B72] mb-6">
          رقم الطلب الخاص بك:{' '}
          <span className="font-mono font-bold text-[#35101F]">#{order.orderNumber}</span>
        </p>

        {/* PRIMARY NEXT STEP: WHATSAPP */}
        <div className="p-5 rounded-2xl bg-[#FFF9F5] border border-[#F1DDE0] mb-6 space-y-3">
          <div className="flex items-center gap-2 text-[#35101F] font-bold text-sm">
            <MessageCircle className="w-5 h-5 text-[#D96A78]" />
            <span>الخطوة القادمة والأهم:</span>
          </div>
          <p className="text-xs text-[#2B101A] leading-relaxed font-medium">
            “كمل تفاصيل تصميم هديتك على واتساب” — أرسل لنا الصورة، الأسماء، والمناسبة ليتفق فريقنا معك على التصميم النهائي قبل التنفيذ.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-[#35101F] hover:bg-[#2B101A] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#EFA0A8]" />
            <span>فتح محادثة واتساب الآن لإرسال الصور</span>
          </a>
        </div>

        {/* ORDER DETAILS SUMMARY */}
        <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F1DDE0] text-xs space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-[#806B72]">المنتج:</span>
            <span className="font-bold text-[#35101F]">{order.productName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#806B72]">المواصفات:</span>
            <span className="font-bold text-[#35101F]">
              مقاس {order.selectedSize} · فريم {order.selectedColor}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#806B72]">الكمية:</span>
            <span className="font-mono font-bold text-[#35101F]">{order.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#806B72]">إجمالي السعر:</span>
            <span className="font-mono font-bold text-[#35101F]">{order.price} ج.م</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#F1DDE0] text-[#D96A78] font-bold">
            <span>عربون التأكيد (50 ج.م):</span>
            <span className="font-mono">{order.depositAmount} ج.م</span>
          </div>
          <div className="flex justify-between text-[#806B72]">
            <span>المتبقي عند الاستلام:</span>
            <span className="font-mono font-bold text-[#35101F]">
              {order.remainingAmount} ج.م
            </span>
          </div>
        </div>

        {/* DEPOSIT REMINDER & COPY */}
        <div className="p-4 rounded-2xl bg-white border border-[#F1DDE0] space-y-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#35101F]">
            <Clock className="w-4 h-4 text-[#D96A78]" />
            <span>بيانات تحويل العربون ({order.depositMethod === 'vodafone_cash' ? 'فودافون كاش' : 'إنستا باي'}):</span>
          </div>

          {order.depositMethod === 'vodafone_cash' ? (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF9F5] border border-[#F1DDE0]">
              <span className="font-mono text-xs font-bold text-[#35101F]">
                {PAYMENT_CONFIG.vodafoneCash.number}
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(PAYMENT_CONFIG.vodafoneCash.number, 'vodafone')
                }
                className="px-2.5 py-1 rounded-lg bg-white border border-[#F1DDE0] text-[11px] font-bold text-[#35101F] hover:bg-[#FFF9F5] flex items-center gap-1"
              >
                {copiedAccount === 'vodafone' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[#D96A78]" />
                    <span>نسخ الرقم</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF9F5] border border-[#F1DDE0]">
              <span className="font-mono text-xs font-bold text-[#35101F]">
                {PAYMENT_CONFIG.instaPay.handle}
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(PAYMENT_CONFIG.instaPay.handle, 'instapay')
                }
                className="px-2.5 py-1 rounded-lg bg-white border border-[#F1DDE0] text-[11px] font-bold text-[#35101F] hover:bg-[#FFF9F5] flex items-center gap-1"
              >
                {copiedAccount === 'instapay' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[#D96A78]" />
                    <span>نسخ المعرف</span>
                  </>
                )}
              </button>
            </div>
          )}

          <p className="text-[11px] text-[#806B72] leading-relaxed">
            يرجى إرسال إشعار تحويل العربون على محادثة واتساب لبدء التصميم فوراً.
          </p>
        </div>

        {/* MODAL BOTTOM BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigateHome();
            }}
            className="w-full py-3 rounded-xl bg-white border border-[#F1DDE0] text-[#35101F] font-semibold text-xs hover:bg-[#FFF9F5] transition-colors"
          >
            الرجوع إلى الصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};
