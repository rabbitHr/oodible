import { MenuItem } from '../types';
import { Leaf, Star, Crown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuantityControl from './QuantityControl';
import React, { useState } from 'react';

interface Props {
  items: MenuItem[];
  restaurantId: string;
  restaurantName: string;
}

export default function MenuList({ items, restaurantId, restaurantName }: Props) {
  const { items: cartItems, addItem, updateQuantity } = useCart();

  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
  const [showSelector, setShowSelector] = useState(false);

  const getItemQuantity = (itemId: string) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem?.quantity || 0;
  };

  const handleAddItem = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId,
      restaurantName
    });
  };

  const handleUpdateQuantity = (itemId: string, currentQuantity: number, change: number) => {
    updateQuantity(itemId, currentQuantity + change);
  };

  const handleDeliveryOptionChange = (option: 'delivery' | 'pickup') => {
    setDeliveryOption(option);
    setShowSelector(false);
  };

  return (
    <div className="space-y-6">
     
      <p className="text-sm">This store provides both Delivery and Self-Pickup options.</p>
      <p className="text-sm">You have selected: {deliveryOption === 'delivery' ? 'Delivery' : 'Self Pickup'} (<button onClick={() => setShowSelector(true)} className="text-blue-500 underline">Change</button>)</p>
      {showSelector && (
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-6">Choose Delivery Type</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleDeliveryOptionChange('delivery')}
              className={`flex flex-col items-center p-4 border rounded-md hover:bg-gray-100 focus:outline-none ${deliveryOption === 'delivery' ? 'bg-blue-100' : ''}`}
            >
              <img src="/icons/delivery-icon.svg" alt="Delivery" className="w-12 h-12 mb-2" />
              <span className="text-sm font-medium">Delivery</span>
            </button>
            <button
              onClick={() => handleDeliveryOptionChange('pickup')}
              className={`flex flex-col items-center p-4 border rounded-md hover:bg-gray-100 focus:outline-none ${deliveryOption === 'pickup' ? 'bg-blue-100' : ''}`}
            >
              <img src="/icons/pickup-icon.svg" alt="Self Pickup" className="w-12 h-12 mb-2" />
              <span className="text-sm font-medium">Self Pickup</span>
            </button>
          </div>
        </div>
      )}
      {items.map((item) => {
        const quantity = getItemQuantity(item.id);
        return (
          <div key={item.id} className="flex items-start space-x-4 py-4">
            <div className="flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-medium">${item.price.toFixed(2)}</span>
                {quantity === 0 ? (
                  <button
                    onClick={() => handleAddItem(item)}
                    className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                  >
                    Add
                  </button>
                ) : (
                  <QuantityControl
                    quantity={quantity}
                    onIncrease={() => handleUpdateQuantity(item.id, quantity, 1)}
                    onDecrease={() => handleUpdateQuantity(item.id, quantity, -1)}
                    size="sm"
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}