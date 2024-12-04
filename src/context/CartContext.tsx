import React, { createContext, useContext, useState, useCallback } from 'react';
import { Coupon, coupons } from '../data/coupons';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

interface CartContextType {
  items: CartItem[];
  restaurantId: string | null;
  restaurantName: string | null;
  appliedCoupon: Coupon | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getFinalTotal: () => number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const clearCart = useCallback(() => {
    setItems([]);
    setRestaurantId(null);
    setRestaurantName(null);
    setAppliedCoupon(null);
  }, []);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      // If adding from a different restaurant, clear the cart first
      if (restaurantId && restaurantId !== item.restaurantId) {
        if (!confirm(`Adding items from ${item.restaurantName} will clear your current cart from ${restaurantName}. Continue?`)) {
          return currentItems;
        }
        setRestaurantId(item.restaurantId);
        setRestaurantName(item.restaurantName);
        setAppliedCoupon(null);
        return [{ ...item, quantity: 1 }];
      }

      // If this is the first item, set the restaurant
      if (!restaurantId) {
        setRestaurantId(item.restaurantId);
        setRestaurantName(item.restaurantName);
      }

      // Check if item already exists
      const existingItem = currentItems.find(i => i.id === item.id);
      if (existingItem) {
        return currentItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      // Add new item
      return [...currentItems, { ...item, quantity: 1 }];
    });
  }, [restaurantId, restaurantName]);

  const removeItem = useCallback((itemId: string) => {
    setItems(currentItems => {
      const newItems = currentItems.filter(item => item.id !== itemId);
      if (newItems.length === 0) {
        setRestaurantId(null);
        setRestaurantName(null);
        setAppliedCoupon(null);
      }
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setItems(currentItems => {
      if (quantity <= 0) {
        return currentItems.filter(item => item.id !== itemId);
      }
      return currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
    });
  }, []);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getSubtotal = useCallback(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  const getDiscount = useCallback(() => {
    if (!appliedCoupon) return 0;

    const subtotal = getSubtotal();
    if (subtotal < (appliedCoupon.minOrderValue || 0)) return 0;

    let discount = 0;
    if (appliedCoupon.discountType === 'percentage') {
      discount = (subtotal * appliedCoupon.discountValue) / 100;
      if (appliedCoupon.maxDiscount) {
        discount = Math.min(discount, appliedCoupon.maxDiscount);
      }
    } else {
      discount = appliedCoupon.discountValue;
    }

    return Math.min(discount, subtotal);
  }, [items, appliedCoupon, getSubtotal]);

  const getFinalTotal = useCallback(() => {
    return getSubtotal() - getDiscount();
  }, [getSubtotal, getDiscount]);

  const applyCoupon = useCallback((code: string) => {
    const coupon = coupons.find(c => c.code === code.toUpperCase());
    
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code' };
    }

    const subtotal = getSubtotal();
    if (subtotal < (coupon.minOrderValue || 0)) {
      return { 
        success: false, 
        message: `Minimum order value of ₹${coupon.minOrderValue} required` 
      };
    }

    setAppliedCoupon(coupon);
    return { 
      success: true, 
      message: `Coupon ${coupon.code} applied successfully!` 
    };
  }, [getSubtotal]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        restaurantId,
        restaurantName,
        appliedCoupon,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getSubtotal,
        getDiscount,
        getFinalTotal,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
