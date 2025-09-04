import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

const run = async () => {
  await connectDB();
  await User.deleteMany({});
  await Product.deleteMany({});

  const admin = await User.create({
    name: 'Admin',
    email: 'admin@myntra.demo',
    password: 'admin123',
    role: 'admin'
  });

  const sample = [
    {
      title: 'Cricket Shoes',
      brand: 'adidas',
      category: 'mens',
      description: 'Lightweight spikes for turf.',
      images: [],
      price: 5000,
      oldPrice: 5500,
      variants: [
        { size: '8', color: 'white', stock: 8, price: 5000, sku: 'AD-CRK-8W' },
        { size: '9', color: 'white', stock: 6, price: 5000, sku: 'AD-CRK-9W' }
      ]
    },
    {
      title: 'Football',
      brand: 'nivia',
      category: 'kids',
      description: 'Match quality ball.',
      images: [],
      price: 1500,
      variants: [{ size: '5', color: 'white', stock: 20, price: 1500, sku: 'NV-FB-5W' }]
    },
    {
      title: 'Treadmill',
      brand: 'nike',
      category: 'all',
      description: 'Durable home treadmill.',
      images: [],
      price: 215000,
      variants: [{ size: 'std', color: 'black', stock: 2, price: 215000, sku: 'NK-TM-STD' }]
    }
  ];

  await Product.insertMany(sample);

  console.log('✅ Seed complete. Admin:', admin.email, '/ admin123');
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
