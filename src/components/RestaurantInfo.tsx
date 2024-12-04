import { Restaurant } from '../types';
import { Star } from 'lucide-react';

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantInfo({ restaurant }: Props) {
  return (
    <div className="p-3 sm:p-4">
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold text-base sm:text-lg line-clamp-1">{restaurant.name}</h3>
        <span className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white text-xs sm:text-sm rounded whitespace-nowrap">
          {restaurant.rating} <Star className="w-3 h-3 fill-current" />
        </span>
      </div>
      
      <div className="mt-1 sm:mt-2 text-gray-600 text-xs sm:text-sm flex flex-wrap items-center gap-2">
        <span>🕒 {restaurant.deliveryTime}</span>
        <span className="hidden sm:inline">•</span>
        <span>{restaurant.distance}</span>
        {restaurant.tags && (
          <>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-gray-500">{restaurant.tags.join(', ')}</span>
          </>
        )}
      </div>
      
      {restaurant.offers && restaurant.offers.length > 0 && (
        <div className="mt-2 sm:mt-3 text-blue-600 text-xs sm:text-sm font-medium">
          {restaurant.offers[0]}
        </div>
      )}
    </div>
  );
}