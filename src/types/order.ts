export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface DeliveryAddress {
  id: string;
  type: 'home' | 'work' | 'other';
  address: string;
  landmark?: string;
  instructions?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'cod';
  title: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  createdAt: string;
  expectedDeliveryTime?: string;
}
