import React, { useState, useEffect } from 'react';
import { MapPin, Bell, ShoppingCart, X } from 'lucide-react';
import Cart from './Cart';
import GoogleMapLocation from './GoogleMapLocation';
import { useCart } from '../context/CartContext';
import { useNavbarNotification } from '../context/NavbarNotificationContext';

interface NavigationButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  icon,
  label,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center space-y-1"
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
};

export default function Navigation() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name?: string;
  } | null>(null);

  const { getTotalItems } = useCart();
  const { getUnreadCount, showNotification } = useNavbarNotification();

  useEffect(() => {
    if (isMapOpen) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setSelectedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: 'Current Location'
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          showNotification('Unable to retrieve location.');
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isMapOpen]);

  const handleLocationSelect = (location: {
    lat: number;
    lng: number;
    name?: string;
  }) => {
    setSelectedLocation(location);
    setIsMapOpen(false);
    showNotification('Location updated successfully!');
  };

  return (
    <>
      {isMapOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Select Location</h2>
              <button 
                onClick={() => setIsMapOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <GoogleMapLocation 
              apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              onLocationSelect={handleLocationSelect}
              center={selectedLocation}
            />
          </div>
        </div>
      )}

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40">
        <div className="flex justify-around items-center py-3">
          <NavigationButton 
            icon={
              <MapPin 
                className={`w-6 h-6 ${selectedLocation ? 'text-green-600' : 'text-gray-600'}`} 
              />
            } 
            label={selectedLocation?.name || 'Near Me'}
            onClick={() => setIsMapOpen(true)}
          />
          <NavigationButton 
            icon={<Bell className="w-6 h-6" />} 
            label="Notifications" 
          />
          <NavigationButton 
            icon={
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </div>
            } 
            label="Cart"
            onClick={() => setIsCartOpen(true)}
          />
        </div>
      </div>
    </>
  );
}