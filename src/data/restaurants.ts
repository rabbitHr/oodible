import { RestaurantDetails } from '../types';

export const restaurants: RestaurantDetails[] = [
  {
    id: '1',
    name: 'The Belgian Waffle Co.',
    rating: 4.1,
    deliveryTime: '52 mins',
    distance: '7 km',
    image: 'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?auto=format&fit=crop&q=80&w=1000',
    offers: ['20% OFF up to ₹50'],
    tags: ['Desserts', 'Waffles'],
    veg: true,
    totalRatings: 298,
    location: 'Phagwara Locality',
    isPremium: true,
    items: [
      {
        id: 'w1',
        name: 'Death by Chocolate Waffle Cake',
        price: 360.48,
        description: 'Signature dark chocolate single layer waffle cake layered with creamy White, Milk and Dark melted Belgian chocolate.',
        image: 'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.5,
        numRatings: 7,
        bestseller: true,
        isPremium: true
      },
      {
        id: 'w2',
        name: 'Mini Waffle Box of 4 - Chocolate',
        price: 299,
        description: 'Four mini waffles topped with premium Belgian chocolate.',
        image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.3,
        numRatings: 33
      },
      {
        id: 'w3',
        name: 'Red Velvet Waffle',
        price: 280,
        description: 'Classic red velvet waffle topped with cream cheese and white chocolate.',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.4,
        numRatings: 42,
        bestseller: true
      },
      {
        id: 'w4',
        name: 'Nutella Banana Waffle',
        price: 320,
        description: 'Fresh banana slices with generous Nutella spread on a crispy waffle.',
        image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.6,
        numRatings: 28
      },
      {
        id: 'w5',
        name: 'Blueberry Cream Waffle',
        price: 290,
        description: 'Fresh blueberry compote with whipped cream on a golden waffle.',
        image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.2,
        numRatings: 19
      },
      {
        id: 'w6',
        name: 'Classic Belgian Waffle',
        price: 250,
        description: 'Traditional Belgian waffle with maple syrup and butter.',
        image: 'https://images.unsplash.com/photo-1562376552-f95f1f37b3d8?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.3,
        numRatings: 56
      }
    ]
  },
  {
    id: '2',
    name: 'Downtown Pizza',
    rating: 4.0,
    deliveryTime: '35 mins',
    distance: '1.5 km',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000',
    offers: ['15% OFF on all orders'],
    tags: ['Pizza', 'Italian'],
    veg: false,
    location: 'Downtown',
    totalRatings: 456,
    items: [
      {
        id: 'p1',
        name: 'Margherita Pizza',
        price: 299,
        description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.5,
        numRatings: 120,
        bestseller: true
      },
      {
        id: 'p2',
        name: 'Pepperoni Supreme',
        price: 399,
        description: 'Loaded with pepperoni, extra cheese, and Italian herbs',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.6,
        numRatings: 85,
        bestseller: true,
        isPremium: true
      },
      {
        id: 'p3',
        name: 'BBQ Chicken Pizza',
        price: 449,
        description: 'Grilled chicken, BBQ sauce, red onions, and bell peppers',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.3,
        numRatings: 64
      },
      {
        id: 'p4',
        name: 'Veggie Paradise',
        price: 349,
        description: 'Mushrooms, olives, onions, bell peppers, and corn',
        image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.2,
        numRatings: 45
      },
      {
        id: 'p5',
        name: 'Meat Lovers',
        price: 499,
        description: 'Pepperoni, sausage, bacon, and ground beef',
        image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.7,
        numRatings: 92
      },
      {
        id: 'p6',
        name: 'Garlic Bread Supreme',
        price: 199,
        description: 'Freshly baked garlic bread with mozzarella and herbs',
        image: 'https://images.unsplash.com/photo-1573140247632-f45040f367be?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.4,
        numRatings: 78
      }
    ]
  },
  {
    id: '3',
    name: 'Burger King',
    rating: 4.2,
    deliveryTime: '25 mins',
    distance: '2.3 km',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000',
    offers: ['Buy 1 Get 1 Free'],
    tags: ['Burgers', 'American'],
    veg: false,
    location: 'Central Mall',
    totalRatings: 678,
    items: [
      {
        id: 'b1',
        name: 'Whopper',
        price: 249,
        description: 'Flame-grilled beef patty with fresh lettuce, tomatoes, mayo, pickles, and onions',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.5,
        numRatings: 234,
        bestseller: true
      },
      {
        id: 'b2',
        name: 'Crispy Chicken Burger',
        price: 199,
        description: 'Crispy chicken patty with lettuce and signature sauce',
        image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.3,
        numRatings: 156
      },
      {
        id: 'b3',
        name: 'Veggie Burger',
        price: 169,
        description: 'Plant-based patty with fresh vegetables',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.1,
        numRatings: 89
      },
      {
        id: 'b4',
        name: 'Cheese Fries',
        price: 129,
        description: 'Crispy fries topped with melted cheese',
        image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.4,
        numRatings: 167,
        bestseller: true
      },
      {
        id: 'b5',
        name: 'Chicken Wings (8 pcs)',
        price: 299,
        description: 'Spicy chicken wings with special sauce',
        image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.6,
        numRatings: 145
      },
      {
        id: 'b6',
        name: 'Chocolate Shake',
        price: 149,
        description: 'Rich and creamy chocolate milkshake',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.2,
        numRatings: 98
      }
    ]
  },
  {
    id: '4',
    name: 'Asian Wok',
    rating: 4.3,
    deliveryTime: '40 mins',
    distance: '3.1 km',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=1000',
    offers: ['30% OFF on orders above ₹300'],
    tags: ['Chinese', 'Thai', 'Asian'],
    veg: false,
    location: 'East Street',
    totalRatings: 345,
    items: [
      {
        id: 'aw1',
        name: 'Hakka Noodles',
        price: 199,
        description: 'Stir-fried noodles with vegetables in signature sauce',
        image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.4,
        numRatings: 89,
        bestseller: true
      },
      {
        id: 'aw2',
        name: 'Kung Pao Chicken',
        price: 299,
        description: 'Spicy diced chicken with peanuts and vegetables',
        image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.5,
        numRatings: 76,
        bestseller: true
      },
      {
        id: 'aw3',
        name: 'Veg Spring Rolls',
        price: 149,
        description: 'Crispy rolls filled with mixed vegetables',
        image: 'https://images.unsplash.com/photo-1544601284-28e0891b00c3?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.2,
        numRatings: 54
      },
      {
        id: 'aw4',
        name: 'Pad Thai',
        price: 249,
        description: 'Thai style rice noodles with tofu and vegetables',
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.3,
        numRatings: 67
      },
      {
        id: 'aw5',
        name: 'Schezwan Fried Rice',
        price: 219,
        description: 'Spicy fried rice with vegetables and Schezwan sauce',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.1,
        numRatings: 45
      },
      {
        id: 'aw6',
        name: 'Sweet and Sour Prawns',
        price: 349,
        description: 'Crispy prawns tossed in sweet and sour sauce',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.6,
        numRatings: 34
      }
    ]
  },
  {
    id: '5',
    name: 'Sweet Tooth Bakery',
    rating: 4.4,
    deliveryTime: '30 mins',
    distance: '1.8 km',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000',
    offers: ['Free delivery'],
    tags: ['Bakery', 'Desserts'],
    veg: true,
    location: 'West Avenue',
    totalRatings: 234,
    items: [
      {
        id: 'stb1',
        name: 'Red Velvet Cupcake',
        price: 129,
        description: 'Classic red velvet cupcake with cream cheese frosting',
        image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.5,
        numRatings: 67,
        bestseller: true
      },
      {
        id: 'stb2',
        name: 'Chocolate Truffle Cake',
        price: 599,
        description: 'Rich chocolate cake with truffle ganache',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.7,
        numRatings: 89,
        bestseller: true
      },
      {
        id: 'stb3',
        name: 'Blueberry Muffins',
        price: 149,
        description: 'Fresh blueberry muffins with streusel topping',
        image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.3,
        numRatings: 45
      },
      {
        id: 'stb4',
        name: 'Butter Croissant',
        price: 89,
        description: 'Flaky butter croissant, freshly baked',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.4,
        numRatings: 56
      },
      {
        id: 'stb5',
        name: 'Chocolate Chip Cookies',
        price: 199,
        description: 'Pack of 6 soft chocolate chip cookies',
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.6,
        numRatings: 78
      },
      {
        id: 'stb6',
        name: 'Tiramisu Cup',
        price: 249,
        description: 'Classic Italian tiramisu in a cup',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.5,
        numRatings: 34
      }
    ]
  },
  {
    id: '6',
    name: 'Biryani House',
    rating: 4.1,
    deliveryTime: '45 mins',
    distance: '4.2 km',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1000',
    offers: ['10% OFF on first order'],
    tags: ['Indian', 'Biryani'],
    veg: false,
    location: 'North Square',
    totalRatings: 567,
    items: [
      {
        id: 'bh1',
        name: 'Chicken Biryani',
        price: 299,
        description: 'Aromatic basmati rice cooked with tender chicken and spices',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.6,
        numRatings: 234,
        bestseller: true
      },
      {
        id: 'bh2',
        name: 'Mutton Biryani',
        price: 349,
        description: 'Traditional biryani with tender mutton pieces',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.7,
        numRatings: 156,
        bestseller: true
      },
      {
        id: 'bh3',
        name: 'Veg Biryani',
        price: 249,
        description: 'Fragrant rice with mixed vegetables and spices',
        image: 'https://images.unsplash.com/photo-1501154983273-71815fa01c80?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.3,
        numRatings: 89
      },
      {
        id: 'bh4',
        name: 'Chicken 65',
        price: 249,
        description: 'Spicy deep-fried chicken appetizer',
        image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.4,
        numRatings: 123
      },
      {
        id: 'bh5',
        name: 'Butter Naan',
        price: 49,
        description: 'Soft and buttery Indian bread',
        image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.2,
        numRatings: 78
      },
      {
        id: 'bh6',
        name: 'Raita',
        price: 79,
        description: 'Yogurt with mixed vegetables',
        image: 'https://images.unsplash.com/photo-1539755530862-00f623c00f52?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.1,
        numRatings: 45
      }
    ]
  },
  {
    id: '7',
    name: 'Healthy Bowls',
    rating: 4.5,
    deliveryTime: '28 mins',
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000',
    offers: ['Healthy Monday - 20% OFF'],
    tags: ['Salads', 'Healthy Food'],
    veg: true,
    location: 'Fitness Street',
    totalRatings: 234,
    items: [
      {
        id: 'hb1',
        name: 'Buddha Bowl',
        price: 299,
        description: 'Quinoa, roasted vegetables, avocado, and tahini dressing',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.6,
        numRatings: 89,
        bestseller: true
      },
      {
        id: 'hb2',
        name: 'Greek Salad',
        price: 249,
        description: 'Fresh vegetables, olives, and feta cheese',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.4,
        numRatings: 67
      },
      {
        id: 'hb3',
        name: 'Protein Power Bowl',
        price: 329,
        description: 'Grilled chicken, brown rice, and mixed vegetables',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.5,
        numRatings: 78,
        bestseller: true
      },
      {
        id: 'hb4',
        name: 'Acai Bowl',
        price: 279,
        description: 'Acai blend topped with fruits and granola',
        image: 'https://images.unsplash.com/photo-1490323914169-4751b5e16384?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.3,
        numRatings: 45
      },
      {
        id: 'hb5',
        name: 'Green Smoothie',
        price: 199,
        description: 'Spinach, banana, and almond milk blend',
        image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.2,
        numRatings: 34
      },
      {
        id: 'hb6',
        name: 'Detox Water',
        price: 99,
        description: 'Infused water with cucumber, lemon, and mint',
        image: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.1,
        numRatings: 23
      }
    ]
  },
  {
    id: '8',
    name: 'Taco Bells',
    rating: 4.0,
    deliveryTime: '35 mins',
    distance: '3.7 km',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=1000',
    offers: ['Combo deals'],
    tags: ['Mexican', 'Fast Food'],
    veg: false,
    location: 'South Market',
    totalRatings: 345,
    items: [
      {
        id: 'tb1',
        name: 'Crunchy Taco Supreme',
        price: 179,
        description: 'Crispy taco shell with seasoned beef and toppings',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.4,
        numRatings: 123,
        bestseller: true
      },
      {
        id: 'tb2',
        name: 'Bean Burrito',
        price: 159,
        description: 'Refried beans, cheese, and sauce in a soft tortilla',
        image: 'https://images.unsplash.com/photo-1584208632869-05fa2b2a5934?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.2,
        numRatings: 89
      },
      {
        id: 'tb3',
        name: 'Chicken Quesadilla',
        price: 249,
        description: 'Grilled chicken and melted cheese in a tortilla',
        image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.5,
        numRatings: 156,
        bestseller: true
      },
      {
        id: 'tb4',
        name: 'Nachos Supreme',
        price: 299,
        description: 'Tortilla chips loaded with toppings and cheese',
        image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.3,
        numRatings: 78
      },
      {
        id: 'tb5',
        name: 'Mexican Pizza',
        price: 219,
        description: 'Crispy tortillas layered with beans and toppings',
        image: 'https://images.unsplash.com/photo-1628824851008-ec3ab4b45edf?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.1,
        numRatings: 67
      },
      {
        id: 'tb6',
        name: 'Churros',
        price: 149,
        description: 'Cinnamon sugar dusted Mexican dessert',
        image: 'https://images.unsplash.com/photo-1624371414361-e670edf4698d?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.6,
        numRatings: 45
      }
    ]
  },
  {
    id: '9',
    name: 'Sushi Master',
    rating: 4.6,
    deliveryTime: '50 mins',
    distance: '5.1 km',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1000',
    offers: ['Premium Wednesday - 25% OFF'],
    tags: ['Japanese', 'Sushi'],
    veg: false,
    location: 'Asian Square',
    totalRatings: 456,
    items: [
      {
        id: 'sm1',
        name: 'California Roll',
        price: 299,
        description: 'Crab meat, avocado, and cucumber roll',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.7,
        numRatings: 234,
        bestseller: true
      },
      {
        id: 'sm2',
        name: 'Salmon Nigiri',
        price: 349,
        description: 'Fresh salmon on vinegared rice',
        image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.8,
        numRatings: 167,
        bestseller: true
      },
      {
        id: 'sm3',
        name: 'Vegetable Tempura',
        price: 249,
        description: 'Assorted vegetables in crispy tempura batter',
        image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.4,
        numRatings: 89
      },
      {
        id: 'sm4',
        name: 'Dragon Roll',
        price: 399,
        description: 'Eel and cucumber topped with avocado',
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.6,
        numRatings: 145
      },
      {
        id: 'sm5',
        name: 'Miso Soup',
        price: 149,
        description: 'Traditional Japanese soup with tofu and seaweed',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.3,
        numRatings: 78
      },
      {
        id: 'sm6',
        name: 'Green Tea Ice Cream',
        price: 199,
        description: 'Authentic Japanese matcha ice cream',
        image: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.5,
        numRatings: 56
      }
    ]
  },
  {
    id: '10',
    name: 'Coffee House',
    rating: 4.3,
    deliveryTime: '22 mins',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000',
    offers: ['Happy Hours 4-7 PM'],
    tags: ['Cafe', 'Beverages'],
    veg: true,
    location: 'Main Street',
    totalRatings: 234,
    items: [
      {
        id: 'ch1',
        name: 'Cappuccino',
        price: 179,
        description: 'Espresso topped with foamy milk and cocoa powder',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.6,
        numRatings: 167,
        bestseller: true
      },
      {
        id: 'ch2',
        name: 'Blueberry Cheesecake',
        price: 249,
        description: 'Classic cheesecake with blueberry compote',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.7,
        numRatings: 89,
        bestseller: true
      },
      {
        id: 'ch3',
        name: 'Iced Caramel Latte',
        price: 199,
        description: 'Espresso with caramel syrup and cold milk',
        image: 'https://images.unsplash.com/photo-1461023058943-71785318a17b?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.4,
        numRatings: 78
      },
      {
        id: 'ch4',
        name: 'Chocolate Croissant',
        price: 149,
        description: 'Buttery croissant filled with chocolate',
        image: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.5,
        numRatings: 56
      },
      {
        id: 'ch5',
        name: 'Green Tea',
        price: 129,
        description: 'Premium Japanese green tea',
        image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.2,
        numRatings: 45
      },
      {
        id: 'ch6',
        name: 'Club Sandwich',
        price: 229,
        description: 'Triple-decker sandwich with vegetables and cheese',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.3,
        numRatings: 67
      }
    ]
  },
  {
    id: '11',
    name: 'Gourmet Fusion',
    rating: 4.7,
    deliveryTime: '40 mins',
    distance: '5 km',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000',
    offers: ['30% OFF on first order'],
    tags: ['Fine Dining', 'International'],
    veg: false,
    location: 'Luxury District',
    totalRatings: 512,
    isPremium: true,
    items: [
      {
        id: 'gf1',
        name: 'Truffle Risotto',
        price: 599,
        description: 'Creamy Arborio rice with black truffle, parmesan, and edible gold leaf',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.8,
        numRatings: 45,
        bestseller: true,
        isPremium: true
      },
      {
        id: 'gf2',
        name: 'Wagyu Beef Carpaccio',
        price: 799,
        description: 'Thinly sliced premium Wagyu beef with aged balsamic and micro herbs',
        image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.9,
        numRatings: 32,
        isPremium: true
      }
    ]
  },
  {
    id: '12',
    name: 'Sushi Royale',
    rating: 4.8,
    deliveryTime: '45 mins',
    distance: '6 km',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1000',
    offers: ['Complimentary sake with every order'],
    tags: ['Japanese', 'Sushi'],
    veg: false,
    location: 'Waterfront',
    totalRatings: 387,
    isPremium: true,
    items: [
      {
        id: 'sr1',
        name: 'Omakase Platter',
        price: 1299,
        description: 'Chef\'s special selection of premium sashimi and nigiri, featuring bluefin tuna and A5 Wagyu',
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b757fb?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.9,
        numRatings: 56,
        bestseller: true,
        isPremium: true
      },
      {
        id: 'sr2',
        name: 'Golden Dragon Roll',
        price: 899,
        description: 'Luxurious roll with king crab, gold leaf, caviar, and truffle aioli',
        image: 'https://images.unsplash.com/photo-1611143669419-b6c7d1c7f387?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.7,
        numRatings: 42,
        isPremium: true
      }
    ]
  },
  {
    id: '13',
    name: 'Le Petit Bistro',
    rating: 4.6,
    deliveryTime: '50 mins',
    distance: '4.5 km',
    image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&q=80&w=1000',
    offers: ['Wine pairing with every course'],
    tags: ['French', 'Fine Dining'],
    veg: false,
    location: 'Arts District',
    totalRatings: 276,
    isPremium: true,
    items: [
      {
        id: 'lpb1',
        name: 'Foie Gras Terrine',
        price: 749,
        description: 'Delicate foie gras terrine served with brioche toast and fig compote',
        image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.8,
        numRatings: 38,
        bestseller: true,
        isPremium: true
      },
      {
        id: 'lpb2',
        name: 'Beef Bourguignon',
        price: 899,
        description: 'Classic French beef stew with red wine, pearl onions, and mushrooms, slow-cooked to perfection',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.7,
        numRatings: 45,
        isPremium: true
      }
    ]
  },
  {
    id: '14',
    name: 'Spice Bazaar',
    rating: 4.5,
    deliveryTime: '55 mins',
    distance: '7.2 km',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72440a1c?auto=format&fit=crop&q=80&w=1000',
    offers: ['Complimentary chef\'s special appetizer'],
    tags: ['Indian', 'Fine Dining'],
    veg: false,
    location: 'Heritage Quarter',
    totalRatings: 312,
    isPremium: true,
    items: [
      {
        id: 'sb1',
        name: 'Royal Thali',
        price: 699,
        description: 'Exquisite multi-course meal featuring rare regional specialties and premium ingredients',
        image: 'https://images.unsplash.com/photo-1565895405138-6c3e5e3c2366?auto=format&fit=crop&q=80&w=1000',
        veg: true,
        rating: 4.9,
        numRatings: 52,
        bestseller: true,
        isPremium: true
      },
      {
        id: 'sb2',
        name: 'Tandoori Lamb Chops',
        price: 849,
        description: 'Premium New Zealand lamb marinated in secret spices and slow-roasted in a traditional tandoor',
        image: 'https://images.unsplash.com/photo-1504674900247-9811cf80d66c?auto=format&fit=crop&q=80&w=1000',
        veg: false,
        rating: 4.7,
        numRatings: 41,
        isPremium: true
      }
    ]
  }
];