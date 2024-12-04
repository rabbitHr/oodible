import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Truck, 
  Gift, 
  User, 
  AlertCircle, 
  CheckCircle,
  X,
  ArrowLeft
} from 'lucide-react';
import { useNavbarNotification } from '../context/NavbarNotificationContext';
import { Notification, NotificationType } from '../types/notifications';
import Navigation from './Navigation';

const getNotificationIcon = (type: NotificationType) => {
  const iconMap = {
    'order_status': <Truck className="w-5 h-5 text-blue-500" />,
    'promotion': <Gift className="w-5 h-5 text-green-500" />,
    'account': <User className="w-5 h-5 text-purple-500" />,
    'delivery': <Truck className="w-5 h-5 text-orange-500" />,
    'system': <AlertCircle className="w-5 h-5 text-gray-500" />
  };
  return iconMap[type];
};

export default function NavbarNotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { 
    notifications, 
    markNotificationAsRead, 
    clearNotifications,
    getUnreadCount 
  } = useNavbarNotification();

  const unreadCount = getUnreadCount();

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Handle clicks outside the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    markNotificationAsRead(notification.id);
    
    // Navigate to action link if exists
    if (notification.actionLink) {
      window.location.href = notification.actionLink;
    }

    // Close dropdown on mobile after selection
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const renderNotificationContent = () => (
    <>
      {notifications.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
          <p>No new notifications</p>
          <p className="text-sm">You're all caught up!</p>
        </div>
      ) : (
        <div className={`${isMobile ? 'max-h-[calc(100vh-200px)]' : 'max-h-96'} overflow-y-auto`}>
          {notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`
                w-full text-left p-4 border-b flex items-start space-x-3 
                hover:bg-gray-50 transition-colors
                ${!notification.isRead ? 'bg-blue-50' : ''}
              `}
            >
              <div className="mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div>
                <h4 className="font-semibold">{notification.title}</h4>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );

  // Mobile Modal Rendering
  if (isMobile && isOpen) {
    return (
      <div className="fixed inset-0 bg-white z-[100] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          <div className="flex items-center space-x-2">
            {notifications.length > 0 && (
              <button 
                onClick={clearNotifications}
                className="text-sm text-red-500 hover:underline"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {renderNotificationContent()}
        </div>
        
        {/* Persistent Navigation */}
        <div className="border-t">
          <Navigation />
        </div>
      </div>
    );
  }

  // Desktop Dropdown Rendering
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notifications</h3>
            {notifications.length > 0 && (
              <button 
                onClick={clearNotifications}
                className="text-sm text-red-500 hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          {renderNotificationContent()}
        </div>
      )}
    </div>
  );
}
