import { Crown } from 'lucide-react';
import { Restaurant } from '../types';
import RestaurantBadge from './RestaurantBadge';
import RestaurantInfo from './RestaurantInfo';

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-40 sm:h-48 object-cover"
          loading="lazy"
        />
        {restaurant.featured && <RestaurantBadge />}
        {restaurant.isPremium && (
          <div className="absolute top-4 left-4 bg-amber-400 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Crown className="w-3 h-3 fill-current" /> Premium
          </div>
        )}
      </div>
      <RestaurantInfo restaurant={restaurant} />
    </div>
  );
}