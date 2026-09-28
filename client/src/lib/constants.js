export const CATEGORIES = ['All', 'Appetizers', 'Mains', 'Drinks', 'Desserts'];

export const DIETARY_TAGS = ['Vegan', 'Spicy', 'Gluten-Free'];

export const ORDER_STATUSES = ['Pending', 'Preparing', 'Completed'];

export const TAX_RATE = 0.08;
export const DELIVERY_FEE = 4.99;
export const MIN_GUESTS = 1;
export const MAX_GUESTS = 8;

// NOTE: This gates the demo staff UI on the client only. Anything shipped to the
// browser is inspectable, so this is NOT real security — it just keeps casual
// visitors out of the demo dashboard. Real protection lives on the server
// (server/middleware/adminAuth.js verifies `x-admin-key` against process.env.ADMIN_KEY).
// Set VITE_ADMIN_KEY in client/.env to override the demo value per deployment.
export const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || 'bitespeed-staff-2024';

export const SAMPLE_MENU = [
  {
    _id: '1',
    name: 'Truffle Burrata',
    description: 'Creamy burrata drizzled with black truffle oil, served on toasted sourdough with heirloom tomatoes.',
    price: 16.99,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600&h=400&fit=crop',
    tags: ['Gluten-Free'],
    available: true,
  },
  {
    _id: '2',
    name: 'Spicy Tuna Tartare',
    description: 'Sushi-grade tuna with sriracha aioli, sesame crisps, and microgreens on a bed of avocado mousse.',
    price: 18.99,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600&h=400&fit=crop',
    tags: ['Spicy'],
    available: true,
  },
  {
    _id: '3',
    name: 'Charred Edamame',
    description: 'Fire-roasted edamame tossed in smoked chili flakes with a squeeze of yuzu.',
    price: 9.99,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=600&h=400&fit=crop',
    tags: ['Vegan', 'Spicy'],
    available: true,
  },
  {
    _id: '4',
    name: 'Wagyu Smash Burger',
    description: 'Double-stacked wagyu patties, aged cheddar, caramelized onions, and house-made pickles on a brioche bun.',
    price: 24.99,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
    tags: [],
    available: true,
  },
  {
    _id: '5',
    name: 'Miso-Glazed Salmon',
    description: 'Atlantic salmon with white miso glaze, jasmine rice, pickled ginger, and bok choy.',
    price: 28.99,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop',
    tags: ['Gluten-Free'],
    available: true,
  },
  {
    _id: '6',
    name: 'Thai Basil Stir-Fry',
    description: 'Wok-fired tofu with Thai basil, bell peppers, snap peas, and chili garlic sauce over coconut rice.',
    price: 19.99,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop',
    tags: ['Vegan', 'Spicy'],
    available: true,
  },
  {
    _id: '7',
    name: 'Lamb Kofta Plate',
    description: 'Herb-spiced lamb kofta with saffron rice, tzatziki, grilled flatbread, and pickled turnips.',
    price: 26.99,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=400&fit=crop',
    tags: ['Spicy'],
    available: true,
  },
  {
    _id: '8',
    name: 'Passion Fruit Mojito',
    description: 'Fresh muddled mint, passion fruit purée, lime, and sparkling water over crushed ice.',
    price: 8.99,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&h=400&fit=crop',
    tags: ['Vegan'],
    available: true,
  },
  {
    _id: '9',
    name: 'Smoky Old Fashioned',
    description: 'Bourbon, smoked maple syrup, Angostura bitters, and a torched orange peel.',
    price: 14.99,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop',
    tags: [],
    available: true,
  },
  {
    _id: '10',
    name: 'Matcha Oat Latte',
    description: 'Ceremonial-grade matcha whisked with steamed oat milk and a hint of vanilla.',
    price: 6.99,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&h=400&fit=crop',
    tags: ['Vegan'],
    available: true,
  },
  {
    _id: '11',
    name: 'Burnt Basque Cheesecake',
    description: 'Caramelized Basque-style cheesecake with berry compote and edible flowers.',
    price: 12.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&h=400&fit=crop',
    tags: [],
    available: true,
  },
  {
    _id: '12',
    name: 'Dark Chocolate Fondant',
    description: 'Warm-centered 70% dark chocolate cake with vanilla bean gelato and salted caramel.',
    price: 14.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop',
    tags: [],
    available: true,
  },
];

export const SAMPLE_ORDERS = [
  {
    _id: 'ord1',
    items: [
      { menuItem: { name: 'Wagyu Smash Burger', price: 24.99 }, quantity: 2 },
      { menuItem: { name: 'Passion Fruit Mojito', price: 8.99 }, quantity: 2 },
    ],
    status: 'Pending',
    total: 67.96,
    customerName: 'James Wilson',
    customerPhone: '555-0142',
    deliveryAddress: '42 Oak Street, Apt 7B',
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    _id: 'ord2',
    items: [
      { menuItem: { name: 'Miso-Glazed Salmon', price: 28.99 }, quantity: 1 },
      { menuItem: { name: 'Matcha Oat Latte', price: 6.99 }, quantity: 1 },
    ],
    status: 'Preparing',
    total: 35.98,
    customerName: 'Sarah Chen',
    customerPhone: '555-0198',
    deliveryAddress: '118 Maple Ave',
    createdAt: new Date(Date.now() - 18 * 60000).toISOString(),
  },
  {
    _id: 'ord3',
    items: [
      { menuItem: { name: 'Thai Basil Stir-Fry', price: 19.99 }, quantity: 3 },
      { menuItem: { name: 'Charred Edamame', price: 9.99 }, quantity: 2 },
    ],
    status: 'Pending',
    total: 79.95,
    customerName: 'Michael Torres',
    customerPhone: '555-0267',
    deliveryAddress: '305 Pine Blvd, Suite 4',
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
  },
];
