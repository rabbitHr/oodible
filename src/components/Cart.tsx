import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { useNotification } from '../context/NotificationContext';
import QuantityControl from './QuantityControl';
import CouponSection from './CouponSection';
import PaymentSection from './PaymentSection';

interface CartProps {
  onClose: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const { 
    items, 
    restaurantId,
    restaurantName, 
    updateQuantity, 
    removeItem,
    getSubtotal,
    getDiscount,
    getFinalTotal,
    clearCart
  } = useCart();
  const { addOrder } = useOrder();
  const { addNotification } = useNotification();
  const [isCheckout, setIsCheckout] = useState(false);

  const deliveryFee = 40; // You can make this dynamic based on distance
  const totalAmount = getFinalTotal() + deliveryFee;

  const handlePaymentSuccess = (paymentId: string) => {
    // Create order with payment details
    const newOrder = {
      restaurantId: restaurantId || '',
      restaurantName: restaurantName || 'Unknown Restaurant',
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal: getSubtotal(),
      deliveryFee: deliveryFee,
      discount: getDiscount(),
      total: totalAmount,
      deliveryAddress: {
        id: 'default_address',
        type: 'home',
        address: 'Default Address',
        landmark: ''
      },
      paymentMethod: {
        id: paymentId,
        type: paymentId === 'COD_ORDER' ? 'cod' : 'card',
        title: paymentId === 'COD_ORDER' ? 'Cash on Delivery' : 'Card Payment'
      },
      status: 'confirmed'
    };

    // Add order to history
    addOrder(newOrder);

    // Show success notification
    addNotification({
      type: 'success',
      message: `Order placed successfully from ${newOrder.restaurantName}! Total: ₹${newOrder.total}`,
      duration: 5000
    });

    // Clear cart and close
    clearCart();
    onClose();
  };

  const handlePaymentFailure = (error: any) => {
    // Show error notification
    addNotification({
      type: 'error',
      message: 'Payment failed. Please try again.',
      duration: 5000
    });
    console.error('Payment failed', error);
  };

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-gray-500 text-center">Your cart is empty</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <p className="text-sm text-gray-600">{restaurantName}</p>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isCheckout ? (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <QuantityControl
                        quantity={item.quantity}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                        onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                        size="small"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4">
                <CouponSection />
              </div>
            </div>

            <div className="border-t p-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{getSubtotal()}</span>
              </div>
              
              {getDiscount() > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{getDiscount()}</span>
                </div>
              )}
              
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>

              <button 
                onClick={() => setIsCheckout(true)}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto p-4">
            <PaymentSection 
              total={totalAmount}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentFailure={handlePaymentFailure}
            />
          </div>
        )}
      </div>
    </div>
  );
}
