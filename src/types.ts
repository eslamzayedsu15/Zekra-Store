export interface ProductOption {
  name: string;
  value: string;
  hex?: string;
  description?: string;
}

export interface SmartFrameProduct {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  price: number;
  originalPrice: number;
  depositAmount: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  description: string;
  materialsText: string;
  deliveryTime: string;
  images: {
    url: string;
    alt: string;
    caption: string;
    tag?: string;
  }[];
  sizes: string[];
  colors: {
    name: 'أسود' | 'أبيض';
    hex: string;
    borderClass: string;
  }[];
  specifications: string[];
  benefits: {
    title: string;
    subtitle: string;
    icon: string;
  }[];
  steps: {
    number: string;
    title: string;
    description: string;
  }[];
}

// Retain Product interface compatible with existing code where needed
export type Product = SmartFrameProduct;

export interface PersonalizationData {
  recipientNames?: string;
  specialDate?: string;
  customMessage?: string;
  selectedSize: 'صغير' | 'كبير';
  selectedColor: 'أسود' | 'أبيض';
  uploadedPhotoUrl?: string;
  uploadedPhotoName?: string;
  notes?: string;
}

export interface CartItem {
  id: string;
  product: SmartFrameProduct;
  quantity: number;
  selectedSize: 'صغير' | 'كبير';
  selectedColor: 'أسود' | 'أبيض';
  unitPrice: number;
  depositPerItem: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  productName: string;
  selectedSize: 'صغير' | 'كبير';
  selectedColor: 'أسود' | 'أبيض';
  quantity: number;
  price: number;
  depositAmount: number;
  remainingAmount: number;
  customerName: string;
  phone: string;
  whatsapp?: string;
  governorate: string;
  city: string;
  address: string;
  notes?: string;
  depositMethod: 'vodafone_cash' | 'instapay';
  status: 'pending_deposit' | 'confirmed' | 'in_crafting' | 'shipped' | 'delivered';
  depositStatus?: string;
  shippingStatus?: string;
}

export interface MemoryTimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface DigitalMemory {
  id: string;
  title: string;
  coupleNames: string;
  specialDate: string;
  coverImage: string;
  loveMessage: string;
  voiceNoteTitle: string;
  voiceNoteDuration: string;
  songTitle?: string;
  song?: {
    title: string;
    artist: string;
    url?: string;
  };
  galleryImages: string[];
  gallery?: string[];
  videoUrl?: string;
  personalMessage?: string;
  senderName?: string;
  date?: string;
  recipients?: string;
  timeline: MemoryTimelineItem[];
  isLocked?: boolean;
  pinCode?: string;
}
