import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  showNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((
    notification: Omit<Notification, 'id'>
  ): string => {
    const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newNotification: Notification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove notification after duration (default 5 seconds)
    const duration = notification.duration || 5000;
    setTimeout(() => {
      removeNotification(id);
    }, duration);

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const showNotification = useCallback((message: string) => {
    addNotification({ message, type: 'info' });
  }, [addNotification]);

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      addNotification, 
      removeNotification,
      showNotification
    }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success': 
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error': 
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      case 'warning': 
        return <AlertTriangle className="w-6 h-6 text-orange-500" />;
      case 'info': 
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      {notifications.map((notification) => (
        <div 
          key={notification.id}
          className={`
            flex items-center space-x-3 p-4 rounded-lg shadow-lg 
            transition-all duration-300 ease-in-out
            ${
              notification.type === 'success' 
                ? 'bg-green-50 text-green-800' 
                : notification.type === 'error'
                ? 'bg-red-50 text-red-800'
                : notification.type === 'warning'
                ? 'bg-orange-50 text-orange-800'
                : 'bg-blue-50 text-blue-800'
            }
          `}
        >
          {getIcon(notification.type)}
          <div className="flex-1">{notification.message}</div>
          <button 
            onClick={() => removeNotification(notification.id)}
            className="hover:bg-gray-100 rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
