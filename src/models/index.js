import sequelize from '../../config/database.js';
import User from './User.js';
import Category from './Category.js';
import Product from './Product.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Setting from './Setting.js';

// Associations (relationships between tables)
Category.hasMany(Product,   { foreignKey: 'CategoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'CategoryId', as: 'category' });

User.hasMany(Order,   { foreignKey: 'UserId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'UserId', as: 'user' });

Order.hasMany(OrderItem,    { foreignKey: 'OrderId', as: 'items' });
OrderItem.belongsTo(Order,  { foreignKey: 'OrderId', as: 'order' });

Product.hasMany(OrderItem,     { foreignKey: 'ProductId', as: 'orderItems' });
OrderItem.belongsTo(Product,   { foreignKey: 'ProductId', as: 'product' });

export { sequelize, User, Category, Product, Order, OrderItem, Setting };
export default sequelize;