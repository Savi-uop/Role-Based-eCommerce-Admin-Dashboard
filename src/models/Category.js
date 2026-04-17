import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Category = sequelize.define('Category', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:        { type: DataTypes.STRING(100), allowNull: false, unique: true },
  slug:        { type: DataTypes.STRING(120), allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  isActive:    { type: DataTypes.BOOLEAN, defaultValue: true },
  sortOrder:   { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'categories',
  timestamps: true,
  hooks: {
    beforeValidate: (cat) => {
      if (cat.name && !cat.slug) {
        cat.slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
    },
  },
});

export default Category;  