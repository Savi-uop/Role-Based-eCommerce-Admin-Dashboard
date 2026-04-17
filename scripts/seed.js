import 'dotenv/config';
import bcrypt from 'bcrypt';
import sequelize from '../config/database.js';
import { User, Category, Product, Order, OrderItem, Setting } from '../src/models/index.js';

const seed = async () => {
  try {
    console.log('🌱 Seeding database...');
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('✅ Tables created');

    await User.create({ name: 'Admin User', email: 'admin@example.com', password: 'Admin@123', role: 'admin', isActive: true });
    // await User.create({ name: 'Alice Johnson', email: 'alice@example.com', password: await bcrypt.hash('user123', 12), role: 'user', isActive: true });
    // await User.create({ name: 'Bob Smith', email: 'bob@example.com', password: await bcrypt.hash('user123', 12), role: 'user', isActive: true });
    await User.create({ name: 'Alice Johnson', email: 'alice@example.com', password: 'user123', role: 'user', isActive: true });
    await User.create({ name: 'Bob Smith', email: 'bob@example.com', password: 'user123', role: 'user', isActive: true });
    console.log('✅ Users created');

    const cats = await Category.bulkCreate([
      { name: 'Electronics', slug: 'electronics', isActive: true },
      { name: 'Clothing',    slug: 'clothing',    isActive: true },
      { name: 'Books',       slug: 'books',       isActive: true },
    ]);
    console.log('✅ Categories created');

    const prods = await Product.bulkCreate([
      { name: 'Wireless Headphones', slug: 'wireless-headphones', price: 149.99, stock: 45, sku: 'ELEC-001', CategoryId: cats[0].id, isActive: true, isFeatured: true },
      { name: 'Smart Watch',         slug: 'smart-watch',         price: 299.99, stock: 30, sku: 'ELEC-002', CategoryId: cats[0].id, isActive: true },
      { name: 'Classic T-Shirt',     slug: 'classic-t-shirt',     price: 24.99,  stock: 200,sku: 'CLTH-001', CategoryId: cats[1].id, isActive: true },
      { name: 'Clean Code Book',     slug: 'clean-code-book',     price: 34.99,  stock: 60, sku: 'BOOK-001', CategoryId: cats[2].id, isActive: true },
    ]);
    console.log('✅ Products created');

    const users = await User.findAll();
    const ts1 = Date.now().toString(36).toUpperCase();
    const order = await Order.create({
      orderNumber: `ORD-${ts1}-AAA`,
      UserId: users[1].id,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'credit_card',
      subtotal: 174.98,
      tax: 17.50,
      shippingCost: 5.99,
      total: 198.47
    });
    await OrderItem.create({ OrderId: order.id, ProductId: prods[0].id, quantity: 1, unitPrice: 149.99, totalPrice: 149.99 });
    await OrderItem.create({ OrderId: order.id, ProductId: prods[2].id, quantity: 1, unitPrice: 24.99,  totalPrice: 24.99  });

    const ts2 = (Date.now() + 1).toString(36).toUpperCase();
    const order2 = await Order.create({
      orderNumber: `ORD-${ts2}-BBB`,
      UserId: users[2].id,
      status: 'pending',
      paymentStatus: 'unpaid',
      subtotal: 34.99,
      tax: 3.50,
      shippingCost: 5.99,
      total: 44.48
    });
    await OrderItem.create({ OrderId: order2.id, ProductId: prods[3].id, quantity: 1, unitPrice: 34.99, totalPrice: 34.99 });
    console.log('✅ Orders created');

    await Setting.bulkCreate([
      { key: 'store_name',  value: 'My eCommerce Store', type: 'string', group: 'general', label: 'Store Name',  isPublic: true },
      { key: 'currency',    value: 'USD',                type: 'string', group: 'general', label: 'Currency',    isPublic: true },
      { key: 'tax_rate',    value: '0.10',               type: 'number', group: 'billing', label: 'Tax Rate',    isPublic: false },
      { key: 'maintenance', value: 'false',              type: 'boolean',group: 'system',  label: 'Maintenance Mode', isPublic: false },
    ]);
    console.log('✅ Settings created');

    console.log('\n════════════════════════════════════');
    console.log('🎉 Done! Login credentials:');
    console.log('   Admin: admin@example.com / Admin@123');
    console.log('   User:  alice@example.com / user123');
    console.log('════════════════════════════════════\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
};

seed();