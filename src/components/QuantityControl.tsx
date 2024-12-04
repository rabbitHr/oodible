import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md';
}

export default function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  size = 'md'
}: QuantityControlProps) {
  const buttonClass = size === 'sm'
    ? 'w-6 h-6'
    : 'w-8 h-8';
  
  const iconClass = size === 'sm'
    ? 'w-3 h-3'
    : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onDecrease}
        className={`${buttonClass} flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ${quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={quantity === 0}
      >
        <Minus className={iconClass} />
      </button>
      
      <span className={`font-medium ${size === 'sm' ? 'w-5 text-sm' : 'w-6'} text-center`}>
        {quantity}
      </span>
      
      <button
        onClick={onIncrease}
        className={`${buttonClass} flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors`}
      >
        <Plus className={iconClass} />
      </button>
    </div>
  );
}
