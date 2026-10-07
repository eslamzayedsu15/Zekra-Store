import { SmartFrameProduct, DigitalMemory } from '../types';

export const HERO_IMAGE = '/src/assets/images/zekra_hero_gift_lifestyle_1791328496730.jpg';
export const SMART_FRAME_BLACK = '/src/assets/images/smart_frame_black_1791332326913.jpg';
export const SMART_FRAME_WHITE = '/src/assets/images/smart_frame_white_1791332335909.jpg';
export const SMART_FRAME_CLOSEUP = '/src/assets/images/smart_frame_closeup_1791332345415.jpg';

// Payment & WhatsApp configuration (Configurable placeholders)
export const PAYMENT_CONFIG = {
  vodafoneCash: {
    number: '010XXXXXXXX', // ضع رقم فودافون كاش هنا
    label: 'فودافون كاش',
    instructions: 'تحويل 50 ج.م على رقم فودافون كاش، وإرسال سكرين شوت بالتحويل على واتساب لتأكيد الأوردر.',
  },
  instaPay: {
    handle: 'zekra@instapay', // ضع معرف إنستا باي هنا
    label: 'إنستا باي (InstaPay)',
    instructions: 'تحويل 50 ج.م عبر تطبيق إنستا باي إلى الحساب، وإرسال إشعار التحويل على واتساب.',
  },
  whatsapp: {
    phone: '201000000000', // رقم واتساب الرسمي
    displayPhone: '010XXXXXXXX',
    defaultMessage: 'أهلاً ذِكرى، أريد إتمام تصميم برواز الذكريات الذكي الخاص بي 🤍',
  },
};

// THE ONE AND ONLY PURCHASABLE PRODUCT
export const SMART_FRAME_PRODUCT: SmartFrameProduct = {
  id: 'smart-memory-frame',
  slug: 'smart-memory-frame',
  name: 'برواز الذكريات الذكي',
  nameEn: 'Smart Memory Frame',
  price: 550,
  originalPrice: 800,
  depositAmount: 50,
  rating: 5.0,
  reviewCount: 148,
  badge: 'المنتج الأكثر طلباً',
  deliveryTime: 'من 4 إلى 8 أيام عمل',
  materialsText:
    'البرواز مصنوع من أكريليك خفيف وآمن، يعطي شكل أنيق وواضح للصورة، وفي نفس الوقت مناسب للاستخدام في البيت أو المكتب أو كهدية مميزة.',
  description:
    'برواز الذكريات الذكي مش مجرد برواز لصورة، لكنه هدية مختلفة بتجمع بين الشكل الأنيق والتكنولوجيا البسيطة، عشان تخلي كل صورة وراها قصة كاملة تقدر تفتحها في أي وقت.\n\nالبرواز بييجي بتصميم مخصص حسب اختيارك، وبيكون مزود بشريحة NFC وQR Code، تقدر من خلالهم تفتح الذكريات المرتبطة بالصورة مباشرة على الموبايل.\n\nتقدر تضيف:\n📸 صور\n🎥 فيديوهات\n🎙️ تسجيلات صوتية\n📝 رسائل وذكريات مكتوبة\n\nبمجرد ما تقرّب الموبايل من البرواز، أو تمسح الـ QR Code، كل الذكريات المرتبطة بالبرواز بتفتح قدامك فورًا.\n\nالعملية كلها سهلة ومش بتاخد أكتر من 5 دقايق.',
  images: [
    {
      url: SMART_FRAME_BLACK,
      alt: 'برواز الذكريات الذكي - فريم أسود فاخر',
      caption: 'الفريم الأسود الفاخر مع كود الذاكرة الذكي وشريحة NFC',
      tag: 'فريم أسود',
    },
    {
      url: SMART_FRAME_WHITE,
      alt: 'برواز الذكريات الذكي - فريم أبيض عصري',
      caption: 'الفريم الأبيض العصري يمنح مساحتك لمسة هدوء ونقاء',
      tag: 'فريم أبيض',
    },
    {
      url: SMART_FRAME_CLOSEUP,
      alt: 'تفاصيل دقيقة وخامة الأكريليك الآمنة والرمز المدمج',
      caption: 'أكريليك نقي آمن وخفيف الوزن مع دمج تقني فائق الدقة',
      tag: 'تفاصيل الخامة',
    },
    {
      url: HERO_IMAGE,
      alt: 'برواز الذكريات الذكي على طاولة المعيشة بجانب الهاتف',
      caption: 'تفتح ذكرياتك الرقمية فور اقتراب الموبايل من البرواز',
      tag: 'في مساحتك',
    },
  ],
  sizes: ['صغير', 'كبير'],
  colors: [
    {
      name: 'أسود',
      hex: '#18181B',
      borderClass: 'border-zinc-900',
    },
    {
      name: 'أبيض',
      hex: '#FAFAFA',
      borderClass: 'border-zinc-300',
    },
  ],
  specifications: [
    'شريحة NFC لفتح الذكريات بلمسة واحدة',
    'QR Code للموبايلات اللي لا تدعم NFC',
    'مساحة تخزين 100 ميجا قابلة للزيادة',
    'إمكانية إضافة وتعديل وحذف الذكريات في أي وقت',
    'حماية بكلمة سر للحفاظ على خصوصيتك',
    'متوفر بفريم أسود أو أبيض',
    'مصنوع من الأكريليك الخفيف والآمن بدل الزجاج',
    'تصميم مخصص حسب المناسبة والصورة',
    'هدية مختلفة وشخصية وليست تقليدية',
  ],
  benefits: [
    {
      title: 'مولود جديد',
      subtitle: 'توثيق أول صرخة وأول نظرة ولحظات الطفولة الأولى في هدية تعيش للأبد.',
      icon: 'Baby',
    },
    {
      title: 'خطوبة',
      subtitle: 'حفظ مشاعر يوم الخطوبة، الفيديوهات السرية والرسائل الأولى بين العروسين.',
      icon: 'HeartHandshake',
    },
    {
      title: 'جواز وذكرى سنوية',
      subtitle: 'هدية راقية لذكرى الزواج تحتفظ بأغنية الرقصة الأولى وصور الفرح.',
      icon: 'Heart',
    },
    {
      title: 'تخرج',
      subtitle: 'تخليد لحظة قبعة التخرج وكلمات الفخر من الأهل والأصدقاء.',
      icon: 'GraduationCap',
    },
    {
      title: 'عيد ميلاد',
      subtitle: 'هدية مفاجئة تخبئ وراء صورتها معايدات صوتية وفيديوهات من كل الأحباب.',
      icon: 'Sparkles',
    },
    {
      title: 'ذكرى شخص غالي',
      subtitle: 'إبقاء صوت وابتسامة وذكريات من نحبهم قريبة من القلب دومًا.',
      icon: 'Smile',
    },
    {
      title: 'هدية عائلية تحمل معنى خاص',
      subtitle: 'توثيق شمل العائلة وسنوات المحبة في تذكار خالد على طاولة المنزل.',
      icon: 'Home',
    },
  ],
  steps: [
    {
      number: '01',
      title: 'اختيار التصميم والصورة والمناسبة',
      description: 'بتختار حجم ولون الفريم المناسب لمساحتك وتطلب البرواز.',
    },
    {
      number: '02',
      title: 'التنفيذ المخصص بدقة متناهية',
      description: 'بننفذ البرواز مخصوص ليك ولصورتك حسب طلبك بأعلى جودة طباعة وأكريليك آمن.',
    },
    {
      number: '03',
      title: 'استلام البرواز وإرشادات الرفع',
      description: 'بعد الاستلام، بنبعتلك خطوات رفع الذكريات بنفسك بسهولة وسرعة.',
    },
    {
      number: '04',
      title: 'رفع الصور والفيديوهات والرسائل',
      description: 'ترفع الصور أو الفيديوهات أو التسجيلات الصوتية أو الرسائل بخصوصية تامة.',
    },
    {
      number: '05',
      title: 'تقريب الموبايل وعيش اللحظة',
      description: 'تقرّب موبايلك من البرواز أو تمسح الـ QR، والذكريات تفتح فورًا!',
    },
  ],
};

// Aliases for compatibility
export const PRODUCTS: SmartFrameProduct[] = [SMART_FRAME_PRODUCT];

// Egyptian Governorates for accurate checkout delivery
export const GOVERNORATES = [
  { id: 'cairo', name: 'القاهرة' },
  { id: 'giza', name: 'الجيزة' },
  { id: 'alex', name: 'الإسكندرية' },
  { id: 'qalyubia', name: 'القليوبية' },
  { id: 'sharqia', name: 'الشرقية' },
  { id: 'dakahlia', name: 'الدقهلية' },
  { id: 'gharbia', name: 'الغربية' },
  { id: 'monufia', name: 'المنوفية' },
  { id: 'beheira', name: 'البحيرة' },
  { id: 'kafr_el_sheikh', name: 'كفر الشيخ' },
  { id: 'damietta', name: 'دمياط' },
  { id: 'port_said', name: 'بورسعيد' },
  { id: 'ismailia', name: 'الإسماعيلية' },
  { id: 'suez', name: 'السويس' },
  { id: 'fayoum', name: 'الفيوم' },
  { id: 'beni_suef', name: 'بني سويف' },
  { id: 'minya', name: 'المنيا' },
  { id: 'assiut', name: 'أسيوط' },
  { id: 'sohag', name: 'سوهاج' },
  { id: 'qena', name: 'قنا' },
  { id: 'luxor', name: 'الأقصر' },
  { id: 'aswan', name: 'أسوان' },
  { id: 'red_sea', name: 'البحر الأحمر' },
  { id: 'south_sinai', name: 'جنوب سيناء' },
  { id: 'north_sinai', name: 'شمال سيناء' },
  { id: 'matrouh', name: 'مطروح' },
  { id: 'new_valley', name: 'الوادي الجديد' },
];

export const FAQS = [
  {
    question: 'ما هي فكرة برواز الذكريات الذكي؟',
    answer:
      'برواز الذكريات الذكي هو برواز لصورتك المفضلة مصنوع من الأكريليك الآمن عالي الجودة، مدمج بشريحة NFC وكود QR. بمجرد تقريب أي هاتف منه، تفتح فوراً صفحة ذكريات خاصة تحتوي على صور، فيديوهات، تسجيلات صوتية، ورسائل مكتوبة.',
  },
  {
    question: 'هل يحتاج الشخص تطبيق معين لفتح الذكريات؟',
    answer:
      'لا على الإطلاق! البرواز يعمل تلقائياً مع جميع هواتف آيفون وأندرويد الحديثة عبر NFC دون أي تطبيق، ولأي هاتف آخر يمكن استخدام كاميرا الموبايل لمسح كود الـ QR بكل سهولة.',
  },
  {
    question: 'ما هي مدة التنفيذ والشحن؟',
    answer:
      'مدة التنفيذ والشحن تستغرق من 4 إلى 8 أيام عمل، نظراً لأن كل برواز يتم تصنيعه وطباعته وبرمجته خصيصاً لكل عميل ومناسبته.',
  },
  {
    question: 'كيف يتم دفع العربون وباقي المبلغ؟',
    answer:
      'نظراً لأن كل برواز يتم تنفيذه بتصميم مخصص، يتم دفع عربون 50 جنيه فقط لتأكيد الأوردر عبر فودافون كاش أو إنستا باي. والمبلغ المتبقي (500 جنيه) يتم دفعه عند الاستلام بعد معاينة المنتج.',
  },
  {
    question: 'هل يمكنني تعديل أو إضافة ذكريات بعد استلام البرواز؟',
    answer:
      'نعم بالتأكيد! يمكنك إضافة، تعديل، أو حذف الذكريات في أي وقت ومن أي مكان مع مساحة تخزين 100 ميجابايت قابلة للزيادة، مع إمكانية قفل الصفحة بكلمة سر للخصوصية التامة.',
  },
  {
    question: 'كيف يتم الاتفاق على تصميم البرواز والصورة؟',
    answer:
      'بعد تأكيد الطلب، تتواصل معنا مباشرة عبر واتساب وترسل لنا الصورة والأسماء وتفاصيل المناسبة، ويتفق فريقنا معك خطوة بخطوة على التصميم النهائي قبل بدء الطباعة.',
  },
];

// Sample digital memory for the memory preview route (/memory/demo)
export const DEMO_DIGITAL_MEMORY: DigitalMemory = {
  id: 'memory-nour-ahmed',
  title: 'حكايتنا التي لا تنتهي 🤍',
  coupleNames: 'نور & أحمد',
  specialDate: '14 فبراير 2024',
  coverImage: HERO_IMAGE,
  loveMessage:
    'إلى الإنسان الذي جعل للحياة طعماً وسكينة، كل عام وأنت أثمن ذكرياتي وأجمل أيامي. كل صورة هنا وراءها ضحكة شاركناها ولحظة تمنينا أن يتوقف عندها الزمن.',
  voiceNoteTitle: 'رسالة صوتية من القلب ✨',
  voiceNoteDuration: '01:42',
  galleryImages: [HERO_IMAGE, SMART_FRAME_BLACK, SMART_FRAME_WHITE, SMART_FRAME_CLOSEUP],
  timeline: [
    {
      year: '2021',
      title: 'أول لقاء',
      description: 'اليوم الذي التقت فيه عيوننا لأول مرة وعرفت أن في حياتي شيئاً استثنائياً بدأ.',
    },
    {
      year: '2022',
      title: 'يوم الخطوبة',
      description: 'وعد أبدي بالمحبة والدعم تحت أضواء دافئة وقلوب مليئة بالفرح.',
    },
    {
      year: '2024',
      title: 'بيتنا الأول',
      description: 'بداية مشوارنا معاً تحت سقف واحد مليء بالحب والسكينة والذكريات الجميلة.',
    },
  ],
  isLocked: false,
};
