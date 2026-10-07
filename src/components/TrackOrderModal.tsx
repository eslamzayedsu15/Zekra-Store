import React, { useState } from 'react';
import { Order } from '../types';
import { Package, Search, X, CheckCircle, Clock, Truck, Sparkles, ExternalLink } from 'lucide-react';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onOpenDigitalMemory: () => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  orders,
  onOpenDigitalMemory,
}) => {
  if (!isOpen) return null;

  const [searchVal, setSearchVal] = useState('');

  // Filter stored orders or match search query
  const matchedOrders = orders.filter((o) => {
    if (!searchVal.trim()) return true;
    const term = searchVal.trim().toLowerCase();
    return (
      o.orderNumber.toLowerCase().includes(term) ||
      o.phone.includes(term) ||
      o.customerName.toLowerCase().includes(term)
    );
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#35101F]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F1DDE0] flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#F1DDE0] flex items-center justify-between bg-[#FFF9F5]">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#D96A78]" />
            <h2 className="text-base font-bold text-[#35101F]">متابعة حالة الطلبات</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#35101F] hover:bg-[#F1DDE0] rounded-full transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="p-4 bg-[#FFF9F5] border-b border-[#F1DDE0]">
          <div className="flex items-center gap-2 bg-white rounded-xl border border-[#F1DDE0] px-3 py-2">
            <Search className="w-4 h-4 text-[#806B72]" />
            <input
              type="text"
              placeholder="ابحث برقم الطلب (ZK-XXXXXX) أو رقم هاتفك..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="flex-1 text-xs text-[#2B101A] placeholder-[#806B72] focus:outline-none"
            />
          </div>
        </div>

        {/* Orders list */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {matchedOrders.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FFF9F5] mx-auto flex items-center justify-center text-[#806B72] border border-[#F1DDE0]">
                <Package className="w-7 h-7 text-[#D96A78]" />
              </div>
              <h3 className="text-sm font-bold text-[#35101F]">لا توجد طلبات مسجلة حالياً</h3>
              <p className="text-xs text-[#806B72] max-w-xs mx-auto leading-relaxed">
                عند إتمام طلب برواز الذكريات الذكي، سيظهر هنا مباشرة لمتابعة خطوات التصنيع والشحن.
              </p>
            </div>
          ) : (
            matchedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-[#FFF9F5] rounded-2xl p-4 border border-[#F1DDE0] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#35101F]">
                      #{order.orderNumber}
                    </span>
                    <span className="text-[10px] text-[#806B72]">· {order.date}</span>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EFA0A8]/20 text-[#35101F] border border-[#F1DDE0]">
                    {order.shippingStatus}
                  </span>
                </div>

                <div className="text-xs text-[#2B101A] space-y-1">
                  <div className="font-semibold text-sm text-[#35101F]">{order.productName}</div>
                  <div className="text-[11px] text-[#806B72]">
                    المواصفات: مقاس {order.selectedSize} · فريم {order.selectedColor}
                  </div>
                  <div className="text-[11px] text-[#806B72]">
                    إجمالي المبلغ: {order.price} ج.م (عربون: {order.depositAmount} ج.م)
                  </div>
                </div>

                {/* Progress track */}
                <div className="pt-2 border-t border-[#F1DDE0]/80 flex items-center justify-between text-[11px] text-[#806B72]">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>تم تسجيل الطلب</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#D96A78] font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>تجهيز التصميم عبر واتساب</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#806B72]">
                    <Truck className="w-3.5 h-3.5" />
                    <span>الشحن</span>
                  </div>
                </div>

                {/* Demo memory link */}
                <div className="pt-1 flex justify-end">
                  <button
                    onClick={onOpenDigitalMemory}
                    className="text-[11px] font-semibold text-[#D96A78] hover:text-[#35101F] flex items-center gap-1 cursor-pointer"
                  >
                    <span>معاينة صفحة الذكرى الافتراضية</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
