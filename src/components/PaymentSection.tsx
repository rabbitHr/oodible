import React, { useState } from 'react';
import { CreditCard, Wallet, AlertCircle } from 'lucide-react';
import { processPayment, createRazorpayOrder } from '../utils/razorpay';

interface PaymentSectionProps {
  total: number;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentFailure: (error: any) => void;
}

export default function PaymentSection({ 
  total, 
  onPaymentSuccess, 
  onPaymentFailure 
}: PaymentSectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    // Cash on Delivery
    if (selectedMethod === 'cod') {
      onPaymentSuccess('COD_ORDER');
      return;
    }

    setIsProcessing(true);

    try {
      // Create a Razorpay order
      const order = await createRazorpayOrder(total);

      // Process payment
      await processPayment({
        amount: order.amount,
        order_id: order.id,
        handler: (response) => {
          setIsProcessing(false);
          onPaymentSuccess(response.razorpay_payment_id);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        }
      });
    } catch (error) {
      setIsProcessing(false);
      onPaymentFailure(error);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Payment Method</h3>

      {/* Payment Methods */}
      <div className="space-y-3">
        {/* Credit/Debit Card */}
        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedMethod === 'card' ? 'border-green-600 bg-green-50' : ''
          }`}
          onClick={() => setSelectedMethod('card')}
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium">Credit/Debit Card</div>
              <div className="text-sm text-gray-500">Pay securely with your card</div>
            </div>
          </div>
        </div>

        {/* UPI */}
        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedMethod === 'upi' ? 'border-green-600 bg-green-50' : ''
          }`}
          onClick={() => setSelectedMethod('upi')}
        >
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium">UPI</div>
              <div className="text-sm text-gray-500">Pay using UPI apps</div>
            </div>
          </div>
        </div>

        {/* Cash on Delivery */}
        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedMethod === 'cod' ? 'border-green-600 bg-green-50' : ''
          }`}
          onClick={() => setSelectedMethod('cod')}
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium">Cash on Delivery</div>
              <div className="text-sm text-gray-500">Pay when your order arrives</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          'Processing Payment...'
        ) : selectedMethod === 'cod' ? (
          'Place Order'
        ) : (
          `Pay ₹${total}`
        )}
      </button>

      {/* Secure Payment Note */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <CreditCard className="w-4 h-4" />
        <span>Secure payment powered by Razorpay</span>
      </div>
    </div>
  );
}
