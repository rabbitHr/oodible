import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Truck, 
  Filter, 
  ArrowDownUp, 
  Search 
} from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { Order } from '../types/order';

const getStatusIcon = (status: Order['status']) => {
  const statusIcons = {
    pending: <Clock className="w-5 h-5 text-yellow-500" />,
    confirmed: <CheckCircle className="w-5 h-5 text-blue-500" />,
    preparing: <Clock className="w-5 h-5 text-orange-500" />,
    out_for_delivery: <Truck className="w-5 h-5 text-green-500" />,
    delivered: <CheckCircle className="w-5 h-5 text-green-600" />,
    cancelled: <XCircle className="w-5 h-5 text-red-500" />
  };
  return statusIcons[status];
};

const getStatusText = (status: Order['status']) => {
  const statusMap = {
    pending: 'Order Placed',
    confirmed: 'Order Confirmed',
    preparing: 'Preparing',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  };
  return statusMap[status];
};

export default function OrderHistory() {
  const { orders } = useOrder();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filteredAndSortedOrders = useMemo(() => {
    return orders
      .filter(order => 
        // Filter by search term (restaurant name or order ID)
        (order.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
        // Filter by status
        (statusFilter === 'all' || order.status === statusFilter)
      )
      .sort((a, b) => {
        // Sort by date
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [orders, searchTerm, statusFilter, sortOrder]);

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No order history yet</p>
        <p className="text-sm mt-2">Start ordering from your favorite restaurants!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex space-x-2 mb-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Search orders" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Status Filter */}
        <div className="relative group">
          <button 
            className="p-2 border rounded-lg hover:bg-gray-100"
            title="Filter by Status"
          >
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg hidden group-hover:block z-10">
            <button 
              onClick={() => setStatusFilter('all')}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${statusFilter === 'all' ? 'bg-green-50 text-green-600' : ''}`}
            >
              All Orders
            </button>
            {(['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'] as Order['status'][]).map(status => (
              <button 
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${statusFilter === status ? 'bg-green-50 text-green-600' : ''}`}
              >
                {getStatusIcon(status)}
                <span>{getStatusText(status)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Order */}
        <button 
          onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
          className="p-2 border rounded-lg hover:bg-gray-100"
          title={`Sort by ${sortOrder === 'newest' ? 'Oldest' : 'Newest'}`}
        >
          <ArrowDownUp className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Orders List */}
      {filteredAndSortedOrders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No orders found</p>
          <p className="text-sm mt-2">Try adjusting your search or filter</p>
        </div>
      ) : (
        filteredAndSortedOrders.map((order) => (
          <div 
            key={order.id} 
            className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{order.restaurantName}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                <span className="text-sm font-medium">
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-600">Total</span>
                <div className="font-medium">₹{order.total}</div>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-600">Payment</span>
                <div className="font-medium capitalize">
                  {order.paymentMethod.title}
                </div>
              </div>
            </div>

            {/* Reorder and Details Buttons */}
            <div className="mt-3 flex space-x-2">
              <button 
                className="flex-1 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-100 transition-colors"
                // Implement reorder functionality
              >
                Reorder
              </button>
              <button 
                className="flex-1 border text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                // Implement order details view
              >
                View Details
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
