import React, { useState } from 'react';
import { User, List, MapPin, CreditCard, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import OrderHistory from './OrderHistory';

type ProfileSection = 'profile' | 'orders' | 'addresses' | 'payments' | 'settings';

export default function Profile() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<ProfileSection>('profile');

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user?.name || 'Guest User'}</h2>
                <p className="text-gray-600">{user?.email || 'Not logged in'}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p>Phone: {user?.phone || 'Not provided'}</p>
              <p>Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</p>
            </div>
          </div>
        );
      case 'orders':
        return <OrderHistory />;
      case 'addresses':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Saved Addresses</h3>
            <p className="text-gray-500">No saved addresses yet</p>
          </div>
        );
      case 'payments':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Methods</h3>
            <p className="text-gray-500">No payment methods saved</p>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">App Settings</h3>
            <div className="flex justify-between items-center">
              <span>Notifications</span>
              <input 
                type="checkbox" 
                className="toggle" 
                // Add notification toggle logic
              />
            </div>
          </div>
        );
    }
  };

  const menuItems = [
    { 
      section: 'profile' as ProfileSection, 
      icon: <User className="w-5 h-5" />, 
      label: 'Profile' 
    },
    { 
      section: 'orders' as ProfileSection, 
      icon: <List className="w-5 h-5" />, 
      label: 'Orders' 
    },
    { 
      section: 'addresses' as ProfileSection, 
      icon: <MapPin className="w-5 h-5" />, 
      label: 'Addresses' 
    },
    { 
      section: 'payments' as ProfileSection, 
      icon: <CreditCard className="w-5 h-5" />, 
      label: 'Payments' 
    },
    { 
      section: 'settings' as ProfileSection, 
      icon: <Settings className="w-5 h-5" />, 
      label: 'Settings' 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex">
          {/* Sidebar Menu */}
          <div className="w-64 border-r p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => setActiveSection(item.section)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                    activeSection === item.section 
                      ? 'bg-green-100 text-green-600' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                onClick={logout}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-6 capitalize">
              {activeSection} Section
            </h1>
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}
