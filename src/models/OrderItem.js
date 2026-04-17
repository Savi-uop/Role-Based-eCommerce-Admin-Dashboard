import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const OrderItem = sequelize.define('OrderItem', {
  id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity:   { type: DataTypes.INTEGER, allowNull: false },
  unitPrice:  { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  OrderId:    { type: DataTypes.INTEGER, allowNull: false },
  ProductId:  { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: 'order_items',
  timestamps: true,
  hooks: {
    beforeCreate: (item) => { item.totalPrice = item.quantity * item.unitPrice; },
  },
});

export default OrderItem;