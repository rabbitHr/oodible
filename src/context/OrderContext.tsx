import React, { createContext, useContext, useState, useCallback } from 'react';
import { Order } from '../types/order';
import { useCart } from './CartContext';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  getOrderById: (orderId: string) => Order | undefined;
  cancelOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = useCallback((orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}`, // Generate unique ID
      createdAt: new Date().toISOString(),
      expectedDeliveryTime: new Date(Date.now() + 45 * 60000).toISOString() // 45 minutes from now
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
  }, []);

  const getOrderById = useCallback((orderId: string) => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  const cancelOrder = useCallback((orderId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled' } 
          : order
      )
    );
  }, []);

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      getOrderById, 
      cancelOrder 
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
