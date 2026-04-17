import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Setting = sequelize.define('Setting', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  key:         { type: DataTypes.STRING(100), allowNull: false, unique: true },
  value:       { type: DataTypes.TEXT, allowNull: true },
  type:        { type: DataTypes.ENUM('string','number','boolean','json'), defaultValue: 'string' },
  group:       { type: DataTypes.STRING(50), defaultValue: 'general' },
  label:       { type: DataTypes.STRING(150), allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  isPublic:    { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: 'settings',
  timestamps: true,
});

export default Setting;