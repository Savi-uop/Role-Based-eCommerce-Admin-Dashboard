import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Order = sequelize.define('Order', {
  id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  orderNumber:   { type: DataTypes.STRING(50), allowNull: false, unique: true },
  status:        { type: DataTypes.ENUM('pending','confirmed','processing','shipped','delivered','cancelled','refunded'), defaultValue: 'pending' },
  paymentStatus: { type: DataTypes.ENUM('unpaid','paid','refunded','failed'), defaultValue: 'unpaid' },
  paymentMethod: { type: DataTypes.STRING(50), allowNull: true },
  subtotal:      { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  tax:           { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  shippingCost:  { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  total:         { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  notes:         { type: DataTypes.TEXT, allowNull: true },
  trackingNumber:{ type: DataTypes.STRING(100), allowNull: true },
  UserId:        { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'orders',
  timestamps: true,
  hooks: {
    beforeCreate: (order) => {
      if (!order.orderNumber) {
        const t = Date.now().toString(36).toUpperCase();
        const r = Math.random().toString(36).substr(2, 5).toUpperCase();
        order.orderNumber = `ORD-${t}-${r}`;
      }
    },
  },
});

export default Order;