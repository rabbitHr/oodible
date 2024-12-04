import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Notification, NotificationContextType, NotificationType } from '../types/notifications';

const NavbarNotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NavbarNotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((
    notification: Omit<Notification, 'id' | 'timestamp'>
  ): void => {
    const newNotification: Notification = {
      ...notification,
      id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markNotificationAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const getUnreadCount = useMemo(() => 
    () => notifications.filter(n => !n.isRead).length
  , [notifications]);

  const showNotification = useCallback((message: string) => {
    addNotification({ message, type: 'info' });
  }, [addNotification]);

  // Predefined notification generators
  const generateOrderStatusNotification = useCallback((
    orderId: string, 
    status: string, 
    restaurantName: string
  ) => {
    addNotification({
      type: 'order_status',
      title: `Order Status Update`,
      message: `Your order from ${restaurantName} is now ${status}`,
      actionLink: `/orders/${orderId}`,
      icon: 'truck'
    });
  }, [addNotification]);

  const generatePromotionNotification = useCallback((
    promotionTitle: string, 
    description: string
  ) => {
    addNotification({
      type: 'promotion',
      title: 'New Promotion!',
      message: description,
      actionLink: '/promotions',
      icon: 'gift'
    });
  }, [addNotification]);

  const generateDeliveryNotification = useCallback((
    orderId: string, 
    estimatedTime: string
  ) => {
    addNotification({
      type: 'delivery',
      title: 'Delivery Update',
      message: `Your order will arrive in approximately ${estimatedTime}`,
      actionLink: `/orders/${orderId}`,
      icon: 'map-pin'
    });
  }, [addNotification]);

  return (
    <NavbarNotificationContext.Provider value={{ 
      notifications, 
      addNotification, 
      markNotificationAsRead, 
      clearNotifications,
      getUnreadCount,
      showNotification,
      // Expose additional generators
      generateOrderStatusNotification,
      generatePromotionNotification,
      generateDeliveryNotification
    }}>
      {children}
    </NavbarNotificationContext.Provider>
  );
}

export function useNavbarNotification() {
  const context = useContext(NavbarNotificationContext);
  if (context === undefined) {
    throw new Error('useNavbarNotification must be used within a NavbarNotificationProvider');
  }
  return context;
}
