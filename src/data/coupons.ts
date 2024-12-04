export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
}

export const coupons: Coupon[] = [
  {
    code: 'WELCOME50',
    description: '50% off on your first order',
    discountType: 'percentage',
    discountValue: 50,
    maxDiscount: 150,
    minOrderValue: 300
  },
  {
    code: 'FLAT100',
    description: '₹100 off on orders above ₹500',
    discountType: 'fixed',
    discountValue: 100,
    minOrderValue: 500
  },
  {
    code: 'SPECIAL25',
    description: '25% off up to ₹200',
    discountType: 'percentage',
    discountValue: 25,
    maxDiscount: 200,
    minOrderValue: 400
  }
];
