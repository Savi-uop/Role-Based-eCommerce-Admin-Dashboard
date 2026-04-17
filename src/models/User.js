import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../../config/database.js';

const User = sequelize.define('User', {
  id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:     { type: DataTypes.STRING(100), allowNull: false },
  email:    { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role:     { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  lastLogin:{ type: DataTypes.DATE, allowNull: true },
  phone:    { type: DataTypes.STRING(20), allowNull: true },
  address:  { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) user.password = await bcrypt.hash(user.password, 12);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) user.password = await bcrypt.hash(user.password, 12);
    },
  },
});

User.prototype.validatePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

User.prototype.toSafeJSON = function() {
  const v = { ...this.get() };
  delete v.password;
  return v;
};

export default User;