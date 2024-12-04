import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { coupons } from '../data/coupons';

export default function CouponSection() {
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [isMessageError, setIsMessageError] = useState(false);
  const { applyCoupon, removeCoupon, appliedCoupon, getSubtotal } = useCart();

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setMessage('Please enter a coupon code');
      setIsMessageError(true);
      return;
    }

    const result = applyCoupon(couponCode.trim());
    setMessage(result.message);
    setIsMessageError(!result.success);
    if (result.success) {
      setCouponCode('');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponCode('');
    setMessage('');
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Apply Coupon</h3>
      
      {/* Available Coupons */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Available Coupons:</p>
        <div className="space-y-2">
          {coupons.map(coupon => (
            <div 
              key={coupon.code}
              className="text-sm border rounded p-2 cursor-pointer hover:bg-gray-50"
              onClick={() => setCouponCode(coupon.code)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{coupon.code}</span>
                <span className="text-green-600">
                  {coupon.discountType === 'percentage' 
                    ? `${coupon.discountValue}% OFF` 
                    : `₹${coupon.discountValue} OFF`}
                </span>
              </div>
              <p className="text-gray-600 text-xs mt-1">{coupon.description}</p>
              {coupon.minOrderValue && (
                <p className="text-gray-500 text-xs mt-1">
                  Min order: ₹{coupon.minOrderValue}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Coupon Input */}
      {!appliedCoupon ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Apply
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-green-50 p-3 rounded">
          <div>
            <span className="text-green-600 font-medium">{appliedCoupon.code}</span>
            <p className="text-sm text-gray-600 mt-1">{appliedCoupon.description}</p>
          </div>
          <button
            onClick={handleRemoveCoupon}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      )}

      {/* Message */}
      {message && (
        <p className={`mt-2 text-sm ${isMessageError ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
