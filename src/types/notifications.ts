export type NotificationType = 
  | 'order_status' 
  | 'promotion' 
  | 'account' 
  | 'delivery' 
  | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionLink?: string;
  icon?: string;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearNotifications: () => void;
  getUnreadCount: () => number;
}
