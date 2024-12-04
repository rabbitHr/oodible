interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

export const initializeRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const processPayment = async (options: Partial<RazorpayOptions>) => {
  // Ensure Razorpay is loaded
  const isLoaded = await initializeRazorpay();
  if (!isLoaded) {
    throw new Error('Razorpay SDK could not be loaded');
  }

  // Default Razorpay options
  const defaultOptions: RazorpayOptions = {
    key: 'rzp_test_your_key_here', // Replace with your actual Razorpay test key
    amount: 0,
    currency: 'INR',
    name: 'Foodible',
    description: 'Food Order Payment',
    handler: (response) => {
      console.log('Payment successful', response);
    },
    theme: {
      color: '#16a34a' // Tailwind green-600
    }
  };

  // Merge provided options with defaults
  const paymentOptions = { ...defaultOptions, ...options };

  // Create Razorpay instance
  return new Promise((resolve, reject) => {
    try {
      const razorpayInstance = new window.Razorpay({
        ...paymentOptions,
        modal: {
          ondismiss: () => {
            reject(new Error('Payment cancelled'));
          }
        }
      });
      razorpayInstance.open();
    } catch (error) {
      reject(error);
    }
  });
};

// Helper function to create a Razorpay order (would typically be done on your backend)
export const createRazorpayOrder = async (amount: number) => {
  // In a real application, this would be an API call to your backend
  // The backend would create an order with Razorpay and return the order ID
  return {
    id: `order_${Date.now()}`, // Simulated order ID
    amount: amount * 100, // Convert to paise
    currency: 'INR'
  };
};
