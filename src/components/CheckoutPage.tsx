import React, { useState } from 'react';
import { SmartFrameProduct, Order } from '../types';
import { GOVERNORATES, PAYMENT_CONFIG } from '../data/mockData';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Truck,
  Copy,
  Check,
  Smartphone,
  Wallet,
  AlertCircle,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

interface CheckoutPageProps {
  product: SmartFrameProduct;
  initialSize?: 'صغير' | 'كبير';
  initialColor?: 'أسود' | 'أبيض';
  onBackToProduct: () => void;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  product,
  initialSize = 'صغير',
  initialColor = 'أسود',
  onBackToProduct,
  onOrderComplete,
}) => {
  // Option selection
  const [selectedSize, setSelectedSize] = useState<'صغير' | 'كبير'>(initialSize);
  const [selectedColor, setSelectedColor] = useState<'أسود' | 'أبيض'>(initialColor);
  const [quantity, setQuantity] = useState<number>(1);

  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [governorate, setGovernorate] = useState(GOVERNORATES[0].name);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [depositMethod, setDepositMethod] = useState<'vodafone_cash' | 'instapay'>('vodafone_cash');

  // Copy state
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Calculations
  const unitPrice = product.price; // 550
  const totalProductPrice = unitPrice * quantity; // 550 * quantity
  const depositAmount = product.depositAmount * quantity; // 50 * quantity
  const remainingAmount = totalProductPrice - depositAmount; // 500 * quantity

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('يرجى إدخال الاسم بالكامل');
      return;
    }

    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('يرجى إدخال رقم هاتف صحيح للتواصل والتأكيد');
      return;
    }

    if (!address.trim()) {
      setErrorMsg('يرجى كتابة العنوان بالتفصيل لضمان دقة الشحن');
      return;
    }

    setIsSubmitting(true);

    const orderNumber = `ZK-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      productName: product.name,
      selectedSize,
      selectedColor,
      quantity,
      price: totalProductPrice,
      depositAmount,
      remainingAmount,
      customerName,
      phone,
      governorate,
      city,
      address,
      notes,
      depositMethod,
      status: 'pending_deposit',
      depositStatus: 'قيد المراجعة',
      shippingStatus: 'تم استلام الطلب',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderComplete(newOrder);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#2B101A] py-8 sm:py-14 animate-page-enter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          type="button"
          onClick={onBackToProduct}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#806B72] hover:text-[#35101F] mb-6 transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع إلى صفحة تفاصيل البرواز</span>
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#F1DDE0] text-xs font-semibold text-[#35101F]">
            <Sparkles className="w-3.5 h-3.5 text-[#D96A78]" />
            <span>طلب فوري ومباشر</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#35101F]">
            إتمام طلب برواز الذكريات الذكي
          </h1>
          <p className="text-xs sm:text-sm text-[#806B72]">
            خطوات بسيطة لإتمام طلبك ودفع العربون الرمزي (50 ج.م فقط)، وتنسيق التصميم عبر واتساب.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* RIGHT COLUMN (DESKTOP): CUSTOMER DETAILS & DELIVERY */}
            <div className="lg:col-span-7 space-y-6">
              {/* Card 1: Frame Customization Options */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F1DDE0] shadow-xs space-y-5">
                <h2 className="text-sm font-bold text-[#35101F] border-b border-[#F1DDE0] pb-3">
                  1. تخصيص مواصفات البرواز
                </h2>

                {/* Size Selection */}
                <div className="space-y-2 text-right">
                  <label className="text-xs font-bold text-[#35101F] block">
                    المقاس المطلوب:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedSize('صغير')}
                      className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer ${
                        selectedSize === 'صغير'
                          ? 'border-[#35101F] bg-[#35101F]/5 text-[#35101F] font-bold shadow-xs'
                          : 'border-[#F1DDE0] bg-[#FFF9F5]/40 text-[#806B72] hover:border-[#D96A78]'
                      }`}
                    >
                      <div className="text-xs font-bold">صغير (15 × 20 سم)</div>
                      <div className="text-[11px] text-[#806B72] mt-0.5">مناسب للمكتب والكومودينو</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedSize('كبير')}
                      className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer ${
                        selectedSize === 'كبير'
                          ? 'border-[#35101F] bg-[#35101F]/5 text-[#35101F] font-bold shadow-xs'
                          : 'border-[#F1DDE0] bg-[#FFF9F5]/40 text-[#806B72] hover:border-[#D96A78]'
                      }`}
                    >
                      <div className="text-xs font-bold">كبير (20 × 30 سم)</div>
                      <div className="text-[11px] text-[#806B72] mt-0.5">مناسب للحائط والغرف الرئيسية</div>
                    </button>
                  </div>
                </div>

                {/* Color Selection */}
                <div className="space-y-2 text-right">
                  <label className="text-xs font-bold text-[#35101F] block">
                    لون الفريم الخارجي:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedColor('أسود')}
                      className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                        selectedColor === 'أسود'
                          ? 'border-[#35101F] bg-[#35101F]/5 text-[#35101F] font-bold shadow-xs'
                          : 'border-[#F1DDE0] bg-[#FFF9F5]/40 text-[#806B72] hover:border-[#D96A78]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">فريم أسود</div>
                        <div className="text-[10px] text-[#806B72]">فخامة كلاسيكية داكنة</div>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-stone-900 border border-stone-700" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedColor('أبيض')}
                      className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                        selectedColor === 'أبيض'
                          ? 'border-[#35101F] bg-[#35101F]/5 text-[#35101F] font-bold shadow-xs'
                          : 'border-[#F1DDE0] bg-[#FFF9F5]/40 text-[#806B72] hover:border-[#D96A78]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">فريم أبيض</div>
                        <div className="text-[10px] text-[#806B72]">نقاء وبساطة مينيمال</div>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-white border border-[#F1DDE0]" />
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold text-[#35101F]">الكمية المطلوبة:</span>
                  <div className="flex items-center gap-3 bg-[#FFF9F5] border border-[#F1DDE0] rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-[#F1DDE0] font-bold text-sm text-[#35101F] hover:bg-[#FFF9F5]"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-sm text-[#35101F]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-[#F1DDE0] font-bold text-sm text-[#35101F] hover:bg-[#FFF9F5]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Customer Shipping Details */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F1DDE0] shadow-xs space-y-4 text-right">
                <h2 className="text-sm font-bold text-[#35101F] border-b border-[#F1DDE0] pb-3">
                  2. بيانات الشحن والتوصيل
                </h2>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#35101F] block">
                    الاسم بالكامل *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: ياسمين أحمد محمود"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#F1DDE0] bg-[#FFF9F5]/40 text-xs text-[#2B101A] focus:outline-none focus:border-[#D96A78] focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#35101F] block">
                    رقم الهاتف (للتواصل والتأكيد) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010XXXXXXXX أو 011XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#F1DDE0] bg-[#FFF9F5]/40 text-xs text-[#2B101A] focus:outline-none focus:border-[#D96A78] focus:bg-white transition-all font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#35101F] block">
                      المحافظة *
                    </label>
                    <select
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#F1DDE0] bg-[#FFF9F5]/40 text-xs text-[#2B101A] focus:outline-none focus:border-[#D96A78] focus:bg-white transition-all"
                    >
                      {GOVERNORATES.map((g) => (
                        <option key={g.name} value={g.name}>
                          {g.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#35101F] block">
                      المدينة / الحي
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: مدينة نصر / التجمع / سموحة"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#F1DDE0] bg-[#FFF9F5]/40 text-xs text-[#2B101A] focus:outline-none focus:border-[#D96A78] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#35101F] block">
                    العنوان بالتفصيل *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="اسم الشارع، رقم العمارة، رقم الشقة، علامة مميزة..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#F1DDE0] bg-[#FFF9F5]/40 text-xs text-[#2B101A] focus:outline-none focus:border-[#D96A78] focus:bg-white transition-all resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#806B72] block">
                    ملاحظات إضافية أو موعد مفضل للتسليم (اختياري)
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: يرجى الاتصال قبل الوصول بساعة"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#F1DDE0] bg-[#FFF9F5]/40 text-xs text-[#2B101A] focus:outline-none focus:border-[#D96A78] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* LEFT COLUMN (DESKTOP): PRICE BREAKDOWN & DEPOSIT INSTRUCTIONS */}
            <div className="lg:col-span-5 space-y-6">
              {/* Order Summary Box */}
              <div className="bg-white rounded-3xl p-6 border border-[#F1DDE0] shadow-xs space-y-5 text-right">
                <h2 className="text-sm font-bold text-[#35101F] border-b border-[#F1DDE0] pb-3">
                  تفاصيل الحساب والعربون
                </h2>

                <div className="space-y-2.5 text-xs text-[#806B72]">
                  <div className="flex justify-between">
                    <span className="text-[#35101F] font-semibold">{product.name}</span>
                    <span className="font-mono text-[#35101F] font-bold">550 ج.م</span>
                  </div>

                  <div className="flex justify-between text-[11px]">
                    <span>المواصفات:</span>
                    <span>
                      مقاس {selectedSize} · فريم {selectedColor}
                    </span>
                  </div>

                  <div className="flex justify-between text-[11px]">
                    <span>الكمية:</span>
                    <span className="font-mono font-bold">{quantity}</span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-[#F1DDE0] text-sm font-bold text-[#35101F]">
                    <span>إجمالي ثمن الهدية:</span>
                    <span className="font-mono">{totalProductPrice} ج.م</span>
                  </div>
                </div>

                {/* Important Deposit Split Highlight */}
                <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F1DDE0] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#35101F]">العربون المطلوب لتأكيد الطلب:</span>
                    <span className="font-mono font-extrabold text-sm text-[#D96A78]">
                      {depositAmount} ج.م
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#806B72]">المتبقي يُدفع عند الاستلام:</span>
                    <span className="font-mono font-bold text-[#35101F]">
                      {remainingAmount} ج.م
                    </span>
                  </div>
                </div>

                {/* Deposit Method Selector */}
                <div className="space-y-2 text-right">
                  <label className="text-xs font-bold text-[#35101F] block">
                    طريقة دفع العربون الرمزي (50 ج.م):
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDepositMethod('vodafone_cash')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        depositMethod === 'vodafone_cash'
                          ? 'border-[#35101F] bg-[#35101F]/5 text-[#35101F] font-bold shadow-xs'
                          : 'border-[#F1DDE0] bg-[#FFF9F5]/40 text-[#806B72] hover:border-[#D96A78]'
                      }`}
                    >
                      <div className="text-xs font-bold">فودافون كاش</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDepositMethod('instapay')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        depositMethod === 'instapay'
                          ? 'border-[#35101F] bg-[#35101F]/5 text-[#35101F] font-bold shadow-xs'
                          : 'border-[#F1DDE0] bg-[#FFF9F5]/40 text-[#806B72] hover:border-[#D96A78]'
                      }`}
                    >
                      <div className="text-xs font-bold">إنستا باي (InstaPay)</div>
                    </button>
                  </div>
                </div>

                {/* Copyable Details Box */}
                <div className="p-4 rounded-2xl bg-white border border-[#F1DDE0] space-y-3">
                  {depositMethod === 'vodafone_cash' ? (
                    <div>
                      <span className="text-[11px] font-bold text-[#35101F] block mb-1">
                        رقم تحويل فودافون كاش:
                      </span>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF9F5] border border-[#F1DDE0]">
                        <span className="font-mono text-sm font-bold text-[#35101F]">
                          {PAYMENT_CONFIG.vodafoneCash.number}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            copyToClipboard(
                              PAYMENT_CONFIG.vodafoneCash.number,
                              'vodafone'
                            )
                          }
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#F1DDE0] text-[11px] font-bold text-[#35101F] hover:bg-[#FFF9F5] flex items-center gap-1"
                        >
                          {copiedField === 'vodafone' ? (
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
                      <p className="text-[10px] text-[#806B72] mt-2 leading-relaxed">
                        {PAYMENT_CONFIG.vodafoneCash.instructions}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[11px] font-bold text-[#35101F] block mb-1">
                        معرف حساب إنستا باي:
                      </span>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF9F5] border border-[#F1DDE0]">
                        <span className="font-mono text-sm font-bold text-[#35101F]">
                          {PAYMENT_CONFIG.instaPay.handle}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            copyToClipboard(
                              PAYMENT_CONFIG.instaPay.handle,
                              'instapay'
                            )
                          }
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#F1DDE0] text-[11px] font-bold text-[#35101F] hover:bg-[#FFF9F5] flex items-center gap-1"
                        >
                          {copiedField === 'instapay' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>تم النسخ</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-[#D96A78]" />
                              <span>نسخ الحساب</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[10px] text-[#806B72] mt-2 leading-relaxed">
                        {PAYMENT_CONFIG.instaPay.instructions}
                      </p>
                    </div>
                  )}
                </div>

                {/* CRITICAL NOTE: Execution starts upon deposit */}
                <div className="p-3.5 rounded-2xl bg-[#EFA0A8]/20 border border-[#F1DDE0] flex items-start gap-2 text-right">
                  <AlertCircle className="w-4 h-4 text-[#D96A78] flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#35101F] leading-relaxed font-semibold">
                    ملاحظة هامة: يبدأ تنفيذ وتخصيص البرواز فور تحويل العربون وتأكيده عبر واتساب، والباقي ({remainingAmount} ج.م) يُدفع عند الاستلام والمعاينة.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold text-center border border-rose-200">
                    {errorMsg}
                  </div>
                )}

                {/* Final Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-[#35101F] hover:bg-[#2B101A] text-white font-bold text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>جاري حفظ طلبك...</span>
                  ) : (
                    <>
                      <span>تأكيد الطلب والتواصل لتنسيق التصميم</span>
                      <ArrowLeft className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees Box */}
              <div className="p-4 rounded-2xl bg-white border border-[#F1DDE0] space-y-2 text-xs text-[#806B72] text-right">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D96A78]" />
                  <span>حق معاينة المنتج والتأكد من سلامته قبل الدفع للمندوب</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#D96A78]" />
                  <span>توصيل سريع وآمن خلال 4 - 8 أيام عمل لجميع المحافظات</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#D96A78]" />
                  <span>تواصل وتعديل للتصميم على واتساب حتى ترضى تماماً 🤍</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
