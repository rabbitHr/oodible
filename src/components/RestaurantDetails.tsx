import { ArrowLeft, Info, Star, Crown } from 'lucide-react';
import { RestaurantDetails as RestaurantDetailsType } from '../types';
import MenuList from './MenuList';
import Navigation from './Navigation';
import './SplashScreen.css';
import { useState } from 'react';

interface Props {
  restaurant: RestaurantDetailsType;
  onBack: () => void;
}

export default function RestaurantDetails({ restaurant, onBack }: Props) {
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const filteredItems = showPremiumOnly 
    ? restaurant.items.filter(item => item.isPremium) 
    : restaurant.items;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="sticky top-0 bg-white z-50 shadow-sm">
        <div className="flex items-center p-4">
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{restaurant.name}</h1>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span className="flex items-center">
                <span className="flex items-center gap-1 px-2 py-0.5 bg-green-600 text-white rounded text-xs">
                  {restaurant.rating} <Star className="w-3 h-3 fill-current" />
                </span>
                <span className="mx-2">{restaurant.totalRatings} ratings</span>
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {restaurant.location} • {restaurant.distance}
            </div>
          </div>
          <button className="p-2">
            <Info className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 px-4 border-b overflow-x-auto scrollbar-hide">
         
          
        </div>
      </div>

      {/* Menu */}
      <div className="p-4">
        <MenuList 
          items={filteredItems} 
          restaurantId={restaurant.id} 
          restaurantName={restaurant.name}
        />
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}

interface FilterTabProps {
  label: string;
  active?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

function FilterTab({ label, active, icon, onClick }: FilterTabProps) {
  return (
    <button
      onClick={onClick}
      className={`py-3 px-1 border-b-2 whitespace-nowrap text-sm flex items-center gap-1 ${
        active
          ? 'border-green-600 text-green-600 font-medium'
          : 'border-transparent text-gray-600'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}