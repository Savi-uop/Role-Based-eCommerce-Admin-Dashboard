import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Product = sequelize.define('Product', {
  id:           { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:         { type: DataTypes.STRING(200), allowNull: false },
  slug:         { type: DataTypes.STRING(220), allowNull: false, unique: true },
  description:  { type: DataTypes.TEXT, allowNull: true },
  price:        { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  comparePrice: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  stock:        { type: DataTypes.INTEGER, defaultValue: 0 },
  sku:          { type: DataTypes.STRING(100), allowNull: true, unique: true },
  imageUrl:     { type: DataTypes.STRING(500), allowNull: true },
  isActive:     { type: DataTypes.BOOLEAN, defaultValue: true },
  isFeatured:   { type: DataTypes.BOOLEAN, defaultValue: false },
  CategoryId:   { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: 'products',
  timestamps: true,
  hooks: {
    beforeValidate: (p) => {
      if (p.name && !p.slug) {
        p.slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
    },
  },
});

export default Product;