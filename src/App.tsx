import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import Navigation from './components/Navigation';
import RestaurantDetails from './components/RestaurantDetails';
import MenuList from './components/MenuList';
import SplashScreen from './components/SplashScreen';
import { restaurants } from './data/restaurants';
import { RestaurantDetails as RestaurantDetailsType, Restaurant } from './types';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { NotificationProvider } from './context/NotificationContext';
import { NavbarNotificationProvider } from './context/NavbarNotificationContext';
import { Crown } from 'lucide-react';

export default function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantDetailsType | null>(null);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const handleSplashScreenComplete = () => {
    setIsSplashVisible(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Explicitly define featured restaurants (first 6 non-premium restaurants)
  const featuredRestaurants = restaurants
    .filter(restaurant => !restaurant.isPremium)
    .slice(0, 6);

  const filteredRestaurants = showPremiumOnly 
    ? restaurants.filter(restaurant => restaurant.isPremium) 
    : restaurants;

  return (
    <CartProvider>
      <OrderProvider>
        <NotificationProvider>
          <NavbarNotificationProvider>
            <div className="min-h-screen bg-gray-50">
              {isSplashVisible ? (
                <SplashScreen onAnimationComplete={handleSplashScreenComplete} />
              ) : selectedRestaurant ? (
                <RestaurantDetails 
                  restaurant={selectedRestaurant} 
                  onBack={() => setSelectedRestaurant(null)} 
                />
              ) : (
                <>
                  <Header />
                  <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 mb-16">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <h2 className="text-xl sm:text-2xl font-semibold">
                        {showPremiumOnly ? 'Premium Restaurants' : 'Featured Restaurants'}
                      </h2>
                      <button 
                        onClick={() => setShowPremiumOnly(!showPremiumOnly)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
                          showPremiumOnly 
                            ? 'bg-amber-500 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        <Crown className="w-4 h-4" />
                        Premium
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {(showPremiumOnly ? filteredRestaurants : featuredRestaurants).map((restaurant) => (
                        <div 
                          key={restaurant.id} 
                          onClick={() => setSelectedRestaurant(restaurant)}
                          className="cursor-pointer"
                        >
                          <RestaurantCard restaurant={restaurant} />
                        </div>
                      ))}
                    </div>
                  </main>
                  <Navigation />
                </>
              )}
            </div>
          </NavbarNotificationProvider>
        </NotificationProvider>
      </OrderProvider>
    </CartProvider>
  );
}